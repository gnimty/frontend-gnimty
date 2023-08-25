import { styled } from 'styled-components';

interface RatingBoxProps {
  children: string | boolean;
  background: string;
}

const RatingBoxStyled = styled.button<RatingBoxProps>`
  background: ${(props) => props.background};
  color: ${(props) => props.theme.colors.white};
  width: 28px;
  height: 20px;
  padding: 2px;
  border-radius: 4px;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
`;

export default function RatingBox({ children, ...props }: RatingBoxProps) {
  return <RatingBoxStyled {...props}>{children}</RatingBoxStyled>;
}
