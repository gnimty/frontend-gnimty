import styled from '@emotion/styled';

import Bot from '@/assets/icons/game/position/bot.svg';
import Jug from '@/assets/icons/game/position/jug.svg';
import Diamond from '@/assets/icons/game/tier/diamond.png';
import Chat from '@/assets/icons/system/chat.svg';
import Copy from '@/assets/icons/system/copy.svg';
import ArrowDown from '@/assets/icons/system/down.svg';
import Like from '@/assets/icons/system/like.svg';
import Online from '@/assets/icons/system/online.svg';
import ArrowUp from '@/assets/icons/system/up.svg';
import IconImage from '@/components/common/IconImage';

const CardWrapper = styled.div<{ open: boolean }>`
  width: 352px;
  min-height: 144px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  grid-row: ${({ open }) => (open ? 'span 2' : 'span 1')};
`;

interface CardColumnProps {
  $open?: boolean;
  $flexColumn?: string;
  width?: number;
  $justify?: string;
  $align?: string;
  $gap?: number;
  $marginBottom?: string;
}

const CardColumn = styled.div<CardColumnProps>`
  display: flex;
  flex-direction: ${({ $flexColumn }) => ($flexColumn ? 'column' : 'row')};
  justify-content: ${({ $justify }) => $justify ?? 'flex-start'};
  align-items: ${({ $align }) => $align ?? 'center'};
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  gap: ${({ $gap }) => ($gap ? `${$gap}px` : '0')};
  margin-bottom: ${({ $marginBottom }) => $marginBottom ?? '0'};
`;

const CardHeader = styled(CardColumn)<CardColumnProps>`
  width: 100%;
  padding: 16px 20px;
`;

const CardBody = styled(CardColumn)<CardColumnProps>`
  overflow: hidden;
  padding: 0 20px 16px 20px;
  max-height: ${({ $open }) => ($open ? '500px' : '0')};
  transform: scaleY(${({ $open }) => ($open ? '1' : '0')});
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
  svg {
    font-size: 8px;
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const ChatButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const SummonerTier = styled.span`
  font-size: ${({ theme }) => theme.fonts.t2.fontSize};
  line-height: ${({ theme }) => theme.fonts.t2.lineHeight};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray800};
`;

const SummonerLP = styled(SummonerTier)`
  color: ${({ theme }) => theme.colors.gray500};
  font-weight: 400;
`;

const SummonerDetail = styled.p`
  font-size: ${({ theme }) => theme.fonts.t2.fontSize};
  font-weight: 400;
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
  font-weight: 400;
  line-height: ${({ theme }) => theme.fonts.t2.lineHeight};
  color: ${({ theme }) => theme.colors.gray700};
`;

const OpenCloseButton = styled.button`
  width: 40px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Example
const CHAMP_URL = 'https://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/Kaisa.png';
const PROFILE_URL = 'https://ddragon.leagueoflegends.com/cdn/13.12.1/img/profileicon/0.png';

export default function SummonerCard({ open, toggle }: { open: boolean; toggle: () => void }) {
  return (
    <CardWrapper open={open}>
      <CardHeader $flexColumn="true" $align="flex-start">
        <CardColumn $justify="space-between" $marginBottom="1rem">
          <SummonerBasicInfo>
            <IconImage src={PROFILE_URL} width={40} height={40} alt="icon" />
            <SummonerId>
              T1 Gumayusi
              <Copy width="16px" height={16} />
            </SummonerId>
            <Online width={6} height={6} />
          </SummonerBasicInfo>
          <ChatButton type="button">
            <Chat width="24px" height="24px" />
          </ChatButton>
        </CardColumn>
        <CardColumn width={120} $gap={8} $marginBottom="0.5rem">
          <IconImage src={Diamond} width={24} height={24} alt="다이아티어" />
          <SummonerTier>CH</SummonerTier>
          <SummonerLP>1,123 LP</SummonerLP>
        </CardColumn>
        <CardColumn $gap={8} $justify="space-between">
          <CardColumn $gap={8}>
            <Bot width={24} height={24} />
            <Jug width={24} height={24} />
          </CardColumn>
          {!open && (
            <OpenCloseButton type="button" onClick={() => toggle()}>
              <ArrowDown width="40px" height="24px" />
            </OpenCloseButton>
          )}
        </CardColumn>
      </CardHeader>
      <CardBody $flexColumn="true" $open={open} $gap={16}>
        <CardColumn $gap={8}>
          <IconImage src={CHAMP_URL} width={32} height={32} alt="icon" />
          <IconImage src={CHAMP_URL} width={32} height={32} alt="icon" />
          <IconImage src={CHAMP_URL} width={32} height={32} alt="icon" />
        </CardColumn>
        <CardColumn>
          <SummonerDetail>Lorem ipsum dolor sit amet consectetur adipisicing elit.</SummonerDetail>
        </CardColumn>
        <CardColumn $justify="space-between">
          <SummonerLiked>
            <Like width="20px" height="20px" />
            <span>1234</span>
          </SummonerLiked>
          <OpenCloseButton type="button" onClick={() => toggle()}>
            <ArrowUp width="40px" height="24px" />
          </OpenCloseButton>
        </CardColumn>
      </CardBody>
    </CardWrapper>
  );
}
