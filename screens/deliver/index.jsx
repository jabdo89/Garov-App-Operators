import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@ui-kitten/components';
import { Container } from './elements';

const Deliver = () => {
  const { top } = useSafeAreaInsets();

  return (
    <Container pt={top}>
      <Text>Deliver</Text>
    </Container>
  );
};

export default Deliver;
