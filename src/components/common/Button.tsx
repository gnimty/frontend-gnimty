import { styled } from 'styled-components';

interface ButtonProps {
  children: string | boolean;
  color: string;
  background: string;
  size: 'large' | 'medium';
}

const ButtonStyled = styled.button<ButtonProps>`
  width: ${(props) => (props.size === 'medium' ? '80px' : '160px')};
  height: ${(props) => (props.size === 'medium' ? '40px' : '48px')};
  padding: ${(props) => (props.size === 'medium' ? '10px 12px' : '14px 12px')};
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  border-radius: 4px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`;

export default function Button({ children, ...props }: ButtonProps) {
  return <ButtonStyled {...props}>{children}</ButtonStyled>;
}
