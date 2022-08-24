import { ILeaderboard } from '../interfaces/ILeaderboard';
import { IMatch } from '../interfaces/IMatch';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import MatchService from './MatchService';
import TeamService from './TeamService';

const initialLeaderboard = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '0.00',
};

export default class LeaderboardsService {
  private teams = new TeamService();
  private matches = new MatchService();

  private allTeams = async (): Promise<TeamModel[]> => this.teams.findAll();
  private finishedMatches = async (): Promise<MatchModel[]> => this.matches.findAllInProcess(false);
  private matchPoints = (goals: number, opponentsGoals: number) => {
    if (goals === opponentsGoals) return 1;
    if (goals > opponentsGoals) return 3;
    return 0;
  };

  private victoryLoseDraw = (
    acc: ILeaderboard,
    match: IMatch,
    matchPoints: (arg0: number, arg1: number) => 0 | 1 | 3,
  ) => {
    const result = matchPoints(match.homeTeamGoals, match.awayTeamGoals);
    if (result === 0) acc.totalLosses += 1;
    if (result === 1) acc.totalDraws += 1;
    if (result === 3) acc.totalVictories += 1;
  };

  private leaderboardsHomeTeams = async () => {
    const allTeams = await this.allTeams();
    const finishedMatches = await this.finishedMatches();
    return allTeams.map(({ teamName }) => finishedMatches
      .reduce((acc, curr) => {
        const lb = { ...acc };
        const match = curr as unknown as IMatch;
        if (teamName === match.teamHome.teamName) {
          lb.name = teamName;
          lb.totalPoints += this.matchPoints(match.homeTeamGoals, match.awayTeamGoals);
          lb.totalGames += 1;
          this.victoryLoseDraw(lb, match, this.matchPoints);
          lb.goalsFavor += match.homeTeamGoals;
          lb.goalsOwn += match.awayTeamGoals;
          lb.goalsBalance = lb.goalsFavor - lb.goalsOwn;
          lb.efficiency = ((lb.totalPoints / (lb.totalGames * 3)) * 100).toFixed(2);
        }
        return lb;
      }, initialLeaderboard as ILeaderboard));
  };

  public getLeaderboard = async (filter: string) => {
    let result: ILeaderboard[] = [];
    if (filter === '/home') {
      result = await this.leaderboardsHomeTeams();
    }
    result.sort((teamPrev: ILeaderboard, teamCurr: ILeaderboard) => {
      let confrontation = teamCurr.totalPoints - teamPrev.totalPoints;
      if (!confrontation) confrontation = teamCurr.totalVictories - teamPrev.totalVictories;
      if (!confrontation) confrontation = teamCurr.goalsBalance - teamPrev.goalsBalance;
      if (!confrontation) confrontation = teamCurr.goalsFavor - teamPrev.goalsFavor;
      if (!confrontation) confrontation = teamCurr.goalsOwn - teamPrev.goalsOwn;
      return confrontation;
    });
    return result;
  };
}
