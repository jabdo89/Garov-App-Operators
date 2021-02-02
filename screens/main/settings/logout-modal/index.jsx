import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button, Card, Modal } from '@ui-kitten/components';
import { useSession } from '@providers/session';

const LogoutModal = ({ visible, onClose }) => {
  const { logout } = useSession();

  return (
    <Modal
      onBackdropPress={onClose}
      backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      visible={visible}
    >
      <Card disabled>
        <Text>¿Estás seguro que deseas salir?</Text>
        <Button style={{ marginTop: 10 }} status="danger" appearance="outline" onPress={logout}>
          Sí, salir.
        </Button>
        <Button style={{ marginTop: 10 }} onPress={onClose}>
          No, quedarme.
        </Button>
      </Card>
    </Modal>
  );
};

LogoutModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LogoutModal;
