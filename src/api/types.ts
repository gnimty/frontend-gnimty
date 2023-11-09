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

export interface ChampionDto {
  championId: number;
  krName: string;
  enName: string;
}

export interface SkinSaleRes {
  skinName: string;
  originRp: number;
  discountedRp: number;
  skinImgUrl: string;
  discountedRate: number;
}

export interface PatchVersion {
  version: string;
  releaseNoteUrl: string;
  releaseNoteImgUrl: string;
}

export interface ChampionSaleRes {
  championId: number;
  enName: string;
  krName: string;
  originRp: number;
  discountedRp: number;
  discountedRate: number;
  originIp: number;
}
