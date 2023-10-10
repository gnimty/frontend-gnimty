export type Status = 'ONLINE' | 'OFFLINE' | 'AWAY';

export type Tier =
  | 'UNRANKED'
  | 'iron'
  | 'bronze'
  | 'silver'
  | 'gold'
  | 'platinum'
  | 'emerald'
  | 'diamond'
  | 'master'
  | 'grandmaster'
  | 'challenger';

export type Position = 'TOP' | 'JUNGLE' | 'MIDDLE' | 'BOTTOM' | 'UTILITY';

export interface SummonerEntry {
  id: number;
  profileImage?: string;
  name: string;
  status: Status;
  tier: Tier;
  leaguePoints: number;
  positions: [Position] | [Position, Position];
  champions: string[];
  introduction: string;
}

export type ChampionTier = 'OP' | '1' | '2' | '3' | '4' | '5' | 'RIP';
