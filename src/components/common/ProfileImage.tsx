import Image from 'next/image';

import profileIconUrl from '@/apis/utils/profileIconUrl';

import type { ImageProps } from 'next/image';

interface ProfileImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  iconId: number;
}

const ProfileImage = (props: ProfileImageProps) => {
  const { iconId, ...restProps } = props;

  return (
    <Image
      src={profileIconUrl(iconId)}
      css={{
        borderRadius: '100%',
      }}
      alt=""
      {...restProps}
    />
  );
};

export default ProfileImage;
