import styled from 'styled-components';

const Container = styled.div<{ $width: string; $height: string }>`
  flex: 1;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.t2.fontSize};
  line-height: ${({ theme }) => theme.fonts.t2.lineHeight};
  font-weight: 400;
`;

const RadioInput = styled.input`
  accent-color: ${({ theme }) => theme.colors.red800};
  position: relative;
  width: 1.25rem;
  height: 1.25rem;
  vertical-align: middle;
  cursor: pointer;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.gray400};
  border-radius: 50%;

  &:checked {
    background-position: center;
    background-repeat: no-repeat;
    border: none;
  }
`;

interface RadioProps {
  width: string;
  height: string;
  label: string;
  name: string;
}

const Radio = ({ width, height, label, name }: RadioProps) => {
  return (
    <Container $width={width} $height={height}>
      <RadioInput type="radio" name={name} id={label} />
      <Label htmlFor={label}>{label}</Label>
    </Container>
  );
};

export default Radio;
