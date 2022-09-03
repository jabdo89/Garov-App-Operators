/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import firebase from 'firebase';
import { Button, Text, Input, Radio, RadioGroup } from '@ui-kitten/components';
import BottomModal from 'templates/bottom-modal';
import { Title } from './elements';

const ReturnedModal = ({ visible, onClose, parada, query }) => {
  const [driverComments, setDriverComments] = useState();
  const [reasonIndex, setReasonIndex] = useState(0);

  const reasons = [
    'Disponibilidad de Operador',
    'Falla Enlace/Conexión Ultima Milla',
    'Disponibilidad de Unidad',
    'Siniestro',
    'Daño de Materia',
    'Falla Mecanica',
    'Extravio',
    'Error Orden',
    'Cerrado',
    'CONTACTO EQUIVOCADO',
    'DIRECCION EQUIVOCADA',
    'Cita y/o Horario',
    'Factura',
    'Validacion',
    'CLIMA',
    'O.C',
    'MANIFESTACIONES',
    'ROBO',
    'Zonas de alto riesgo delictivo',
  ];

  const onFinish = () => {
    const db = firebase.firestore();

    const tempArray = parada.eventos;
    tempArray.push({ statusid: 5, status: 'Regresado', fecha: new Date() });

    db.collection('Guias')
      .doc(parada.id)
      .update({
        estatus: 'Regresado',
        eventos: tempArray,
        rasonRegresado: reasons[reasonIndex],
        comentariosRegresado: driverComments || null,
      })
      .then(() => {
        query();
        onClose();
        Alert.alert('Guia Regresada');
        query();
      });
  };

  return (
    <BottomModal visible={visible} onClose={onClose}>
      <Title category="h5">Regresar Paquete</Title>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}
      >
        <Text>Razon de Regresado</Text>
        <ScrollView style={{ height: '60%', overflow: 'hidden' }}>
          <RadioGroup
            selectedIndex={reasonIndex}
            onChange={(index) => {
              setReasonIndex(index);
            }}
            style={{ marginBottom: 20, marginTop: 20 }}
          >
            {reasons.map((reason) => {
              return <Radio>{reason}</Radio>;
            })}
          </RadioGroup>
        </ScrollView>
        <Input
          textStyle={{ minHeight: 64 }}
          multiline
          size="large"
          onChangeText={setDriverComments}
          value={driverComments}
          placeholder="Comentarios..."
        />
        <Button style={{ margin: 40 }} onPress={() => onFinish()}>
          Regresar Paquete
        </Button>
      </View>
    </BottomModal>
  );
};

export default ReturnedModal;
