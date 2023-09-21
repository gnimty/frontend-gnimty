import { type ReactNode } from 'react';
import styled from 'styled-components';

const SpeechBubbleContainer = styled.div<{ $width: string; $height: string; $show: boolean }>`
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  position: relative;
  background-color: ${({ theme }) => theme.colors.gray800};
  border-radius: 4px;
  padding: 8px;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  color: ${({ theme }) => theme.colors.white};
  font-family: Pretendard;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 7px solid transparent;
    border-top-color: ${({ theme }) => theme.colors.gray800};
    border-bottom: 0;
    margin-left: -7px;
    margin-bottom: -7px;
  }
`;

interface SpeechBubbleProps {
  width: string;
  height: string;
  show: boolean;
  children: ReactNode;
}

const SpeechBubble = ({ width, height, show, children }: SpeechBubbleProps) => {
  return (
    <SpeechBubbleContainer $width={width} $height={height} $show={show} className="speech-bubble">
      {children}
    </SpeechBubbleContainer>
  );
};

export default SpeechBubble;
