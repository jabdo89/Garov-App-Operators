/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { useNavigation } from '@react-navigation/native';
import { View, Alert } from 'react-native';
import firebase from 'firebase';
import openMap from 'react-native-open-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, Icon, List, Text, Button } from '@ui-kitten/components';
import EvidenciaModal from './components/evidence-modal';
import ReturnedModal from './components/returned-modal';
import {
  CloseButton,
  Container,
  DetailTitle,
  HeaderContainer,
  InfoContainer,
  NumberContainer,
  TitleContainer,
} from './elements';

const RouteModal = ({
  route: {
    params: { route: propsRoute, onFinish = () => {} },
  },
}) => {
  const [paradas, setParadas] = useState([]);

  const { top } = useSafeAreaInsets();
  const { goBack } = useNavigation();
  const { navigate } = useNavigation();

  const [itemChanging, setItemChanging] = useState('');
  const [isEvidenceModalOpen, toggleEvidenceModal] = useState(false);
  const [isReturnedModalOpen, toggleReturnedModal] = useState(false);

  moment.locale('es');

  useEffect(() => {
    const db = firebase.firestore();
    const query = async () => {
      const parradasArray = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < propsRoute.guias.length; i++) {
        db.collection('Guias')
          .doc(propsRoute.guias[i])
          .get()
          .then((doc) => {
            parradasArray.push(doc.data());
            if (i === propsRoute.guias.length - 1) {
              setParadas(parradasArray);
            }
          });
      }
    };
    query();
  }, [propsRoute]);

  const query = async () => {
    const parradasArray = [];
    const db = firebase.firestore();
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < propsRoute.guias.length; i++) {
      db.collection('Guias')
        .doc(propsRoute.guias[i])
        .get()
        .then((doc) => {
          parradasArray.push(doc.data());
          if (i === propsRoute.guias.length - 1) {
            setParadas(parradasArray);
          }
        });
    }
  };

  const regresarPaquete = (item) => {
    setItemChanging(item);
    toggleReturnedModal(true);
  };

  const entregarPaquete = (item) => {
    setItemChanging(item);
    toggleEvidenceModal(true);
  };

  const checkCorridaStatus = () => {
    if (propsRoute.tipo === 'Devolucion') {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < paradas.length; i++) {
        if (!paradas[i].preEvidencia) return true;
      }
    } else {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < paradas.length; i++) {
        if (paradas[i].estatus === 'En Corrida') return true;
      }
    }
    return false;
  };

  const completarCorrida = () => {
    const db = firebase.firestore();
    db.collection('Corridas')
      .doc(propsRoute.id)
      .update({ estatus: 'Completado' })
      .then(() => {
        onFinish();
        Alert.alert('Corrida Completada', 'Gracias!', [
          { text: 'OK', onPress: () => navigate('Home') },
        ]);
      });
  };

  return (
    <>
      <Container pt={top}>
        <TitleContainer>
          <Text category="h5">Corrida Actual</Text>
          <CloseButton
            appearance="ghost"
            status="danger"
            onPress={goBack}
            accessoryLeft={(props) => <Icon {...props} name="close-outline" />}
          />
        </TitleContainer>
        <InfoContainer>
          <Text appearance="hint">Tipo de Corrida: </Text>
          <Text category="h5">{propsRoute.tipo}</Text>
        </InfoContainer>
        {paradas !== [] && (
          <List
            data={paradas}
            renderItem={({ item, index }) => (
              <Card>
                <View>
                  <HeaderContainer style={{ width: '90%' }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <View style={{ flexDirection: 'row' }}>
                        <NumberContainer>
                          <Text style={{ color: 'white' }} category="s1">
                            {index + 1}
                          </Text>
                        </NumberContainer>
                        <Text category="h6">Guia: {item?.delivery}</Text>
                      </View>
                      {item?.estatus === 'En Corrida' && propsRoute.tipo !== 'Corrida a Bodega' && (
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Button appearance="ghost" onPress={() => entregarPaquete(item)}>
                            <Icon
                              style={{ height: 32, width: 32 }}
                              fill="green"
                              name="checkmark-square-2"
                            />
                          </Button>
                          <Button appearance="ghost" onPress={() => regresarPaquete(item)}>
                            <Icon
                              style={{ height: 32, width: 32 }}
                              fill="red"
                              name="close-square"
                            />
                          </Button>
                        </View>
                      )}
                      {item?.estatus === 'Devolucion' && !item?.preEvidencia && (
                        <Button appearance="ghost" onPress={() => entregarPaquete(item)}>
                          <Icon
                            style={{ height: 32, width: 32 }}
                            fill="green"
                            name="checkmark-square-2"
                          />
                        </Button>
                      )}
                      {item?.estatus === 'Entregado' && (
                        <Text style={{ color: 'green' }}>Entregado</Text>
                      )}
                      {item?.estatus === 'Regresado' && (
                        <Text style={{ color: 'red' }}>Regresado</Text>
                      )}
                      {item?.estatus === 'Documentado' && (
                        <Text style={{ color: 'green' }}>En Bodega</Text>
                      )}
                    </View>
                  </HeaderContainer>
                  <Text category="s1">{item?.nombreDestinatario}</Text>
                  <Text>{item?.dDireccion}</Text>
                  <Text>{item?.dCodigoPostal}</Text>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}
                  >
                    <DetailTitle category="s1">
                      Cantidad de Paquetes: #{item?.cantidadPqte}
                    </DetailTitle>
                    <Button
                      appearance="ghost"
                      onPress={() =>
                        openMap({
                          end: `${item?.dDireccion},${item?.dCiudad},${item?.dCodigoPostal},${item?.dEstado}`,
                          navigate_mode: 'navigate',
                          provider: 'google',
                        })
                      }
                    >
                      <Icon style={{ height: 70, width: 70 }} fill="blue" name="pin-outline" />
                    </Button>
                  </View>
                </View>
              </Card>
            )}
          />
        )}

        <Button onPress={() => completarCorrida()} disabled={checkCorridaStatus()}>
          Completar Corrida
        </Button>
        {/* <TakePhotoModal
          visible={isTakePhotoModalOpen}
          onClose={() => toggleTakePhotoModal(false)}
          onPhotoTaken={savePhoto}
          animationType="slide"
        /> */}
        {isEvidenceModalOpen ? (
          <EvidenciaModal
            visible={isEvidenceModalOpen}
            onClose={() => {
              toggleEvidenceModal(false);
            }}
            parada={itemChanging}
            query={query}
            setItemChanging={setItemChanging}
          />
        ) : null}
        {isReturnedModalOpen ? (
          <ReturnedModal
            visible={isReturnedModalOpen}
            onClose={() => {
              toggleReturnedModal(false);
            }}
            parada={itemChanging}
            query={query}
            setItemChanging={setItemChanging}
          />
        ) : null}
      </Container>
    </>
  );
};

export default RouteModal;
