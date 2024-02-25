import { getChampions } from '../queries/championQuery';

const championsInformation = await getChampions();

const champions = championsInformation.data.champions;

export default champions;
