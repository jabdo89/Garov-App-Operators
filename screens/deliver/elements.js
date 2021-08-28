import styled from 'styled-components/native';
import { Layout } from '@ui-kitten/components';

const Container = styled(Layout)`
  flex-grow: 1;
  padding: 5px 20px;
  padding-top: ${(props) => (props.pt || 0) + 20}px;
`;

export { Container };
