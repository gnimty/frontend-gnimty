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
  svg {
    cursor: pointer;
  }
`;

const Input = styled.input`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.t2.fontSize};
  line-height: ${({ theme }) => theme.fonts.t2.lineHeight};
  font-weight: 400;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

interface SearchProps {
  width: string;
  height: string;
  radius: string;
  placeholder?: string;
}

const Search = ({ width = '23.5rem', height = '2.5rem', radius = '2.5rem', placeholder }: SearchProps) => {
  return (
    <Container $width={width} $height={height} $radius={radius}>
      <Input type="text" placeholder={placeholder} />
      <SearchIcon />
    </Container>
  );
};

export default Search;
