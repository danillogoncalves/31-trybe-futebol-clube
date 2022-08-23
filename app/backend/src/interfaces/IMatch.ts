export type MatchFinish = {
  message: 'Finished',
};

export interface IMatchGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
}
export interface IMatchReq extends IMatchGoals {
  homeTeam: number,
  awayTeam: number,
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
