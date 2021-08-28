import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@ui-kitten/components';
import { Container } from './elements';

const Send = () => {
  const { top } = useSafeAreaInsets();

  return (
    <Container pt={top}>
      <Text>Send</Text>
    </Container>
  );
};

export default Send;
