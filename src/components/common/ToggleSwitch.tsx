import { styled, css } from 'styled-components';

interface ToggleSwitchProps {
  onOff: boolean;
  onClick: () => void;
  width?: number;
  label?: string;
}

const WholeWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Wrapper = styled.div<{ on: boolean; width: number }>`
  width: ${({ width }) => `${width}px`};
  height: 18px;
  position: relative;

  background-color: ${({ theme, on }) => (on ? theme.colors.red800 : theme.colors.gray300)};
  border-radius: 20px;
  cursor: pointer;
`;

const Circle = styled.div<{ on: boolean; width: number }>`
  width: 14px;
  aspect-ratio: 1;
  position: absolute;
  top: 2px;
  left: 2px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  transition: all 0.3s ease-in-out;

  ${({ on }) =>
    on &&
    css`
      transform: translateX(calc(100% - 2px));
    `}
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.fonts.t2.fontSize};
  font-weight: ${({ theme }) => theme.fonts.t2.fontWeight};
  line-height: ${({ theme }) => theme.fonts.t2.lineHeight};
  color: ${({ theme }) => theme.colors.gray800};
  display: flex;
  align-items: center;
`;

function ToggleSwitch({ onOff, onClick, width = 32, label }: ToggleSwitchProps) {
  return (
    <WholeWrapper>
      <Wrapper on={onOff} onClick={onClick} width={width}>
        <Circle on={onOff} width={width} />
      </Wrapper>
      {label && <Label>{label}</Label>}
    </WholeWrapper>
  );
}

export default ToggleSwitch;
