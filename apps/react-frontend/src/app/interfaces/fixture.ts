export interface Fixture {
  id: number;
  away_id: number;
  home_id: number;
  away: any;
  home: any;
  away_score: string;
  home_score: string;
}



export interface LeagueTeam {
  id: number;
  league_id: number;
  team_id: number;
  team: Team;
  season_id: number;
}


export interface Team {
  id: number;
  name: string
}
