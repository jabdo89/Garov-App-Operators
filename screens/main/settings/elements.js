import styled from 'styled-components/native';
import { Text, Layout } from '@ui-kitten/components';

const Container = styled(Layout)`
  flex-grow: 1;
  padding: 5px 20px;
`;

const Row = styled(Layout)`
  flex-direction: row;
  padding: 20px 0px;
  align-items: center;
`;

const OptionText = styled(Text)`
  margin-right: auto;
`;

export { Container, Row, OptionText };
