import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Divider, Icon, useTheme } from '@ui-kitten/components';
import { Container, Row, OptionText } from './elements';
import LogoutModal from './logout-modal';

const Settings = () => {
  const [exitModal, toggleExitModal] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Container>
        <TouchableOpacity onPress={() => toggleExitModal(true)}>
          <Row>
            <OptionText>Salir</OptionText>
            <Icon height={22} width={22} fill={theme['color-danger-600']} name="log-out-outline" />
          </Row>
        </TouchableOpacity>
        <Divider />
      </Container>
      <LogoutModal visible={exitModal} onClose={() => toggleExitModal(false)} />
    </>
  );
};

export default Settings;
