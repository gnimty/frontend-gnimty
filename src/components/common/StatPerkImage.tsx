import Image from 'next/image';

import type { ImageProps } from 'next/image';

const imgNameMap: Record<number, string> = {
  5001: 'StatModsHealthScalingIcon',
  5002: 'StatModsArmorIcon',
  5003: 'StatModsMagicResIcon.MagicResist_Fix',
  5005: 'StatModsAttackSpeedIcon',
  5007: 'StatModsCDRScalingIcon',
  5008: 'StatModsAdaptiveForceIcon',
};

const krNameMap: Record<number, string> = {
  5001: '체력',
  5002: '방어력',
  5003: '마법 저항력',
  5005: '공격속도',
  5007: '스킬 가속',
  5008: '적응형 능력치',
};

interface StatPerkImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  statPerkId: number;
}

export default function StatPerkImage(props: StatPerkImageProps) {
  const { statPerkId, ...restProps } = props;

  return (
    <Image
      src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/${imgNameMap[statPerkId]}.png`}
      alt={krNameMap[statPerkId]}
      {...restProps}
    />
  );
}
