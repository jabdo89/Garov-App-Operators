import styled from 'styled-components/native';
import { Layout, Text, Input as DefaultInput, Button } from '@ui-kitten/components';
import KeyboardAwareScroll from '@components/keyboard-aware-scroll';

const Container = styled(KeyboardAwareScroll)`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme['color-basic-300']};
`;

const Content = styled(Layout)`
  padding: 20px;
  width: 100%;
  margin: auto;
  background-color: ${(props) => props.theme['color-basic-300']};
`;

const Input = styled(DefaultInput)`
  margin: 5px 0;
`;

const SigninButton = styled(Button)`
  margin-top: 10px;
`;

const Warning = styled(Text)`
  text-align: center;
`;

const Logo = styled.Image`
  margin: auto;
  height: 105px;
  width: 160px;
  margin-bottom: 20px;
`;

const SpinnerContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export { Content, Container, Input, SigninButton, Warning, Logo, SpinnerContainer };
