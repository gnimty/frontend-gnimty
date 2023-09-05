import Image from 'next/image';
import { styled } from 'styled-components';

interface IconImageWrapperProps {
  width: string;
  height: string;
  radius?: string;
}

const IconImageWrapper = styled.div<IconImageWrapperProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => (props.radius ? props.radius : '0')};
`;

interface IconImageProps {
  width: string;
  height: string;
  radius?: string;
  src: string;
  alt: string;
}

export default function IconImage({ width, height, radius, src, alt }: IconImageProps) {
  return (
    <IconImageWrapper width={width} height={height} radius={radius}>
      <Image src={src} alt={alt} width={width} height={height} />
    </IconImageWrapper>
  );
}
