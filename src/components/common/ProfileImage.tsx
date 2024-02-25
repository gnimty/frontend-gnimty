import Image from 'next/image';

import profileIconUrl from '@/apis/utils/profileIconUrl';

import type { ImageProps } from 'next/image';

interface ProfileImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  iconId: number;
}

const ProfileImage = ({ iconId, ...props }: ProfileImageProps) => {
  return (
    <Image
      src={profileIconUrl(iconId)}
      width={40}
      height={40}
      css={{
        borderRadius: '100%',
      }}
      alt=""
      {...props}
    />
  );
};

export default ProfileImage;
