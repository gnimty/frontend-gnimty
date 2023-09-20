import Image, { type StaticImageData } from 'next/image';
import { styled } from 'styled-components';

interface IconImageWrapperProps {
  width: number;
  height: number;
  radius?: number;
}

const IconImageWrapper = styled.div<IconImageWrapperProps>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  border-radius: ${(props) => (props.radius ? `${props.radius}%` : '0')};
  overflow: hidden;
`;

interface IconImageProps {
  width: number;
  height: number;
  radius?: number;
  src: StaticImageData | string;
  alt: string;
}

export default function IconImage({ width, height, radius = 50, src, alt }: IconImageProps) {
  return (
    <IconImageWrapper width={width} height={height} radius={radius}>
      <Image alt={alt} width={width} height={height} src={src} />
    </IconImageWrapper>
  );
}
