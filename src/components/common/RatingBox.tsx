import styled from '@emotion/styled';

interface RatingBoxProps {
  children: string;
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
  font-size: ${(props) => props.theme.fonts.body.fontSize};
  font-weight: ${(props) => props.theme.fonts.t2.fontWeight};
  line-height: ${(props) => props.theme.fonts.body.lineHeight};
`;

export default function RatingBox({ children, ...props }: RatingBoxProps) {
  return <RatingBoxStyled {...props}>{children}</RatingBoxStyled>;
}
