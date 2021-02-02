import styled from 'styled-components/native';

const Container = styled.View`
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme['color-basic-400']};
`;

export { Container };
