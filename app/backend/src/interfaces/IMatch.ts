export type MatchFinish = {
  message: 'Finished',
};

export interface IMatchReq {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
}

export interface IMatchRes extends IMatchReq{
  id: number
  inProgress: boolean,
}

export interface IMatch extends IMatchRes{
  teamHome: {
    teamName: string,
  },
  teamAway: {
    teamName: string,
  }
}
