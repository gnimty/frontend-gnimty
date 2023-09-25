import styled from 'styled-components';

import SearchIcon from '@/assets/icons/system/search.svg';

const Container = styled.div<{ $width: string; $height: string; $radius: string }>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ $radius }) => $radius};
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
`;

const Input = styled.input`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.t2.fontSize};
  line-height: ${({ theme }) => theme.fonts.t2.lineHeight};
  font-weight: 400;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const IconWrapper = styled.div`
  width: 2.5rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface SearchProps {
  width: string;
  height: string;
  radius: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ width = '23.5rem', height = '2.5rem', radius = '2.5rem', placeholder, onChange }: SearchProps) => {
  return (
    <Container $width={width} $height={height} $radius={radius}>
      <Input type="text" placeholder={placeholder} onChange={onChange} />
      <IconWrapper>
        <SearchIcon width={24} height={24} />
      </IconWrapper>
    </Container>
  );
};

export default Search;
