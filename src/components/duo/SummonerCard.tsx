import { styled } from 'styled-components';

import IconImage from '../common/IconImage';

const CardWrapper = styled.div`
  width: 352px;
  min-height: 144px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  border: 1px solid tomato;
`;

interface CardColumnProps {
  open?: boolean;
  flexColumn?: boolean;
  width?: number;
  justify?: string;
  align?: string;
  gap?: number;
}

const CardColumn = styled.div<CardColumnProps>`
  display: flex;
  flex-direction: ${({ flexColumn }) => (flexColumn ? 'column' : 'row')};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'center'};
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  gap: ${({ gap }) => (gap ? `${gap}px` : '0')};
`;

const CardHeader = styled(CardColumn)<CardColumnProps>`
  width: 100%;
  padding: 16px 20px;
`;

const CardBody = styled(CardColumn)<CardColumnProps>`
  overflow: hidden;
  padding: 0 20px 16px 20px;
  max-height: ${({ open }) => (open ? '500px' : '0')};
  transform: scaleY(${({ open }) => (open ? '1' : '0')});
  transform-origin: top;
  transition:
    transform 0.3s ease-out,
    max-height 0.3s ease-out;
`;

const SummonerBasicInfo = styled.div`
  min-width: 187px;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SummonerId = styled.span`
  font-size: ${({ theme }) => theme.fonts.t1.fontSize};
  font-weight: ${({ theme }) => theme.fonts.t1.fontWeight};
  line-height: ${({ theme }) => theme.fonts.t1.lineHeight};
  color: ${({ theme }) => theme.colors.gray800};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SummonerTier = styled.span`
  font-size: ${({ theme }) => theme.fonts.t2.fontSize};
  font-weight: ${({ theme }) => theme.fonts.t2.fontWeight};
  line-height: ${({ theme }) => theme.fonts.t2.lineHeight};
  color: ${({ theme }) => theme.colors.gray800};
`;

const SummonerLP = styled(SummonerTier)`
  color: ${({ theme }) => theme.colors.gray500};
`;

const SummonerDetail = styled.p`
  font-size: ${({ theme }) => theme.fonts.t2.fontSize};
  font-weight: regular;
  line-height: ${({ theme }) => theme.fonts.t2.lineHeight};
  color: ${({ theme }) => theme.colors.gray700};
`;

const SummonerLiked = styled.div`
  width: 81px;
  height: 28px;
  border-radius: 20px;
  padding: 4px 12px 4px 10px;
  gap: 4px;
  display: flex;
  background-color: ${({ theme }) => theme.colors.gray100};
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.t2.fontSize};
  font-weight: regular;
  line-height: ${({ theme }) => theme.fonts.t2.lineHeight};
  color: ${({ theme }) => theme.colors.gray700};
`;

const OpenCloseButton = styled.button`
  width: 40px;
  height: 24px;
`;

export default function SummonerCard({ open, toggle }: { open: boolean; toggle: () => void }) {
  return (
    <CardWrapper>
      <CardHeader flexColumn align="flex-start">
        <CardColumn justify="space-between">
          <SummonerBasicInfo>
            <IconImage src="/next.svg" width="40" height="40" radius="50" alt="icon" />
            <SummonerId>
              T1 Gumayusi
              <IconImage src="/next.svg" width="16" height="16" radius="50" alt="icon" />
            </SummonerId>
            <IconImage src="/next.svg" width="6" height="6" radius="50" alt="icon" />
          </SummonerBasicInfo>
          <IconImage src="/next.svg" width="40" height="40" radius="50" alt="icon" />
        </CardColumn>
        <CardColumn width={120} gap={8}>
          <IconImage src="/next.svg" width="24" height="24" alt="다이아티어" />
          <SummonerTier>CH</SummonerTier>
          <SummonerLP>1,123 LP</SummonerLP>
        </CardColumn>
        <CardColumn gap={8} justify="space-between">
          <CardColumn gap={8}>
            <IconImage src="/next.svg" width="24" height="24" alt="icon" />
            <IconImage src="/next.svg" width="24" height="24" alt="icon" />
          </CardColumn>
          {!open && (
            <OpenCloseButton type="button" onClick={() => toggle()}>
              O
            </OpenCloseButton>
          )}
        </CardColumn>
      </CardHeader>
      <CardBody flexColumn open={open}>
        <CardColumn gap={8}>
          <IconImage src="/next.svg" width="32" height="32" radius="50" alt="icon" />
          <IconImage src="/next.svg" width="32" height="32" radius="50" alt="icon" />
          <IconImage src="/next.svg" width="32" height="32" radius="50" alt="icon" />
        </CardColumn>
        <CardColumn>
          <SummonerDetail>Lorem ipsum dolor sit amet consectetur adipisicing elit.</SummonerDetail>
        </CardColumn>
        <CardColumn>
          <SummonerLiked>
            <IconImage src="/next.svg" width="20" height="20" radius="50" alt="icon" />
            <span>1234</span>
          </SummonerLiked>
          <OpenCloseButton type="button" onClick={() => toggle()}>
            C
          </OpenCloseButton>
        </CardColumn>
      </CardBody>
    </CardWrapper>
  );
}
