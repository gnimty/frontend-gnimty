import { queryOptions } from '@tanstack/react-query';

import dataDragonVersion from '../constants/dataDragonVersion';
import request from '../httpRequest';

interface ChampionSkillsResponse {
  data: Record<
    string,
    {
      spells: {
        id: string;
      }[];
    }
  >;
}

interface Options {
  championEnName: string;
}

const championSkillsQuery = ({ championEnName }: Options) =>
  queryOptions({
    queryKey: ['championSkills', championEnName],
    async queryFn() {
      const res = await request.get<ChampionSkillsResponse>(
        `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/data/ko_KR/champion/${championEnName}.json`,
      );
      return res.data;
    },
  });

export default championSkillsQuery;
