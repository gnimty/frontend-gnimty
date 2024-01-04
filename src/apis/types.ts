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

export type PositionFilter = Position | 'ALL';

export type GameMode = 'RANK_SOLO' | 'RANK_FLEX' | 'BLIND';

export interface SoloTierDto {
  tier: Tier;
  division: number;
  lp: number;
}

export interface RecommendedSummonersEntry {
  id: number;
  summonerName: string;
  status: Status;
  isMain: boolean;
  puuid: string;
  queue: Tier;
  lp: number;
  division: number;
  mmr: number;
  frequentLane1: Position;
  frequentLane2: Position;
  frequentChampionId1: number;
  frequentChampionId2: number;
  frequentChampionId3: number;
  introduction: string;
  upCount: number;
  iconId: number;
}

export interface SummonerDto {
  summonerName: string;
  internalName: string;
  summonerId: string;
  puuid: string;
  profileIconId: number;
  summonerLevel: number;
  soloTierInfo: SoloTierDto;
  totalWin: number;
  totalDefeat: number;
  totalPlays: number;
}

export interface SummonerRankDto {
  summoner: SummonerDto;
  mostPlayedChampionIds: number[];
  mostLanes: Position[];
  winRate: number;
  totalWin: number;
  totalDefeat: number;
  rank: number;
}

export type ChampionTier = 'OP' | '1' | '2' | '3' | '4' | '5' | 'RIP';

export interface ChampionDto {
  championId: number;
  krName: string;
  enName: string;
}

export interface ChampionTierDto {
  championId: number;
  winRate: number;
  pickRate: number;
  banRate: number;
  plays: number;
  tier: ChampionTier;
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

export interface RiotDependentInfo {
  isLinked: boolean;
  status: Status;
  introductions: IntroductionEntry[];
  schedules: ScheduleEntry[];
  preferGameModes: PreferGameModeEntry[];
  riotAccounts: RiotAccountEntry[];
}

interface IntroductionEntry {
  id: number;
  content: string;
  isMain: boolean;
}
interface ScheduleEntry {
  dayOfWeek: DayOfWeek;
  startTime: number;
  endTime: number;
}

type DayOfWeek = 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';

interface PreferGameModeEntry {
  gameMode: GameMode;
}

interface RiotAccountEntry {
  id: number;
  name: string;
  tagLine: string;
  isMain: boolean;
  puuid: number;
  queue: Tier;
  lp: number;
  division: number;
  mmr: number;
  frequentLane1: Position;
  frequentLane2: Position;
  frequentChampionId1: number;
  frequentChampionId2: number;
  frequentChampionId3: number;
  queueFlex: Tier;
  lpFlex: number;
  divisionFlex: number;
  mmrFlex: number;
  frequentLane1Flex: Position;
  frequentLane2Flex: Position;
  frequentChampionId1Flex: number;
  frequentChampionId2Flex: number;
  frequentChampionId3Flex: number;
  iconId: number;
}

export interface OauthInfoEntry {
  email: string;
  provider: 'Google' | 'Kakao';
}

export interface ProfileEntry {
  id: number;
  email: string;
  nickname: string;
  favoriteChampionId?: number;
  upCount: number;
  riotDependentInfo: RiotDependentInfo;
  oauthInfos: OauthInfoEntry[];
}
