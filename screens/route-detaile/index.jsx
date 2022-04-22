/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { View, Alert } from 'react-native';
import shortid from 'shortid';
import firebase from 'firebase';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, Icon, List, Text, Button } from '@ui-kitten/components';
import TakePhotoModal from '../../templates/take-photo-modal';
import {
  CloseButton,
  Container,
  DetailTitle,
  HeaderContainer,
  InfoContainer,
  NumberContainer,
  Tag,
  TitleContainer,
} from './elements';

const RouteModal = ({
  route: {
    params: { route: propsRoute },
  },
}) => {
  const [route] = useState(propsRoute);

  const [paradas, setParadas] = useState([]);

  const { top } = useSafeAreaInsets();
  const { goBack } = useNavigation();
  const { navigate } = useNavigation();

  const [itemChanging, setItemChanging] = useState('');
  const [isTakePhotoModalOpen, toggleTakePhotoModal] = useState(false);

  moment.locale('es');

  useEffect(() => {
    const db = firebase.firestore();
    const query = async () => {
      const parradasArray = [];

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < route.guias.length; i++) {
        db.collection('Guias')
          .doc(route.guias[i])
          .get()
          .then((doc) => {
            parradasArray.push(doc.data());
            if (i === route.guias.length - 1) {
              setParadas(parradasArray);
            }
          });
      }
    };

    query();
  }, [route]);

  const query = async () => {
    const parradasArray = [];
    const db = firebase.firestore();
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < route.guias.length; i++) {
      db.collection('Guias')
        .doc(route.guias[i])
        .get()
        .then((doc) => {
          parradasArray.push(doc.data());
          if (i === route.guias.length - 1) {
            setParadas(parradasArray);
          }
        });
    }
  };

  const savePhoto = async ({ imageBlob }) => {
    // Do not request access because this relies on the driver already gave access
    // in the Home screen
    const db = firebase.firestore();

    const imgRef = firebase.storage().ref().child(`corridas-images/${shortid.generate()}`);
    const task = imgRef.put(imageBlob);
    task.on(
      'state_changed',
      () => {},
      () => {},
      () => {
        imgRef.getDownloadURL().then((url) => {
          db.collection('Guias')
            .doc(itemChanging.id)
            .update({ estatus: 'Entregado', preEvidencia: url })
            .then(() => {
              Alert.alert('Guia Entregada');
              query();
            });
          setItemChanging('');
        });
      }
    );
  };

  const regresarPaquete = (item) => {
    const db = firebase.firestore();
    db.collection('Guias')
      .doc(item.id)
      .update({ estatus: 'Regresado' })
      .then(() => {
        Alert.alert('Guia Regresada');
        query();
      });
  };

  const entregarPaquete = (item) => {
    setItemChanging(item);
    toggleTakePhotoModal(true);
  };

  const checkCorridaStatus = () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < paradas.length; i++) {
      if (paradas[i].estatus === 'En Corrida') return true;
    }
    return false;
  };

  const completarCorrida = () => {
    const db = firebase.firestore();
    db.collection('Corridas')
      .doc(route.id)
      .update({ estatus: 'Completado' })
      .then(() => {
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
          <Text appearance="hint">Numero de Corrida: </Text>
          <Text category="h5">{route.numCorrida}</Text>
          {/* <TagsContainer>
            <Tag color="success">
              <Text appearance="alternative">{moment(route.fecha.seconds).format('dddd, LL')}</Text>
            </Tag>
            <Tag color="success">
              <WithIcon>
                <Icon
                  height={16}
                  width={16}
                  fill={theme['background-basic-color-1']}
                  name="clock-outline"
                />
                <Text appearance="alternative">
                  {moment(route.fecha.seconds).format('hh:mm a')}
                </Text>
              </WithIcon>
            </Tag>
          </TagsContainer> */}
        </InfoContainer>
        {paradas !== [] && (
          <List
            data={paradas}
            renderItem={({ item, index }) => (
              <Card
                header={(props) => (
                  <View {...props}>
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
                          <Text category="h6">Guia: {item.numGuia}</Text>
                        </View>
                        {item.estatus === 'En Corrida' && (
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
                        {item.estatus === 'Entregado' && (
                          <Text style={{ color: 'green' }}>Entregado</Text>
                        )}
                        {item.estatus === 'Regresado' && (
                          <Text style={{ color: 'red' }}>Regresado</Text>
                        )}
                      </View>
                    </HeaderContainer>
                    <Text category="s1">{item.dirrecion}</Text>
                  </View>
                )}
              >
                <DetailTitle category="s1">
                  Cantidad de Paquetes: #{item.paquetes.length}
                </DetailTitle>
                {item.paquetes.map((paquete) => {
                  return (
                    <View
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                      }}
                    >
                      <Tag color="warning">
                        <Text style={{ color: 'white' }}> {paquete.tipoDePaquete}</Text>
                      </Tag>
                      <Tag color="warning">
                        <Text style={{ color: 'white' }}> {paquete.peso} Kg</Text>
                      </Tag>
                    </View>
                  );
                })}
              </Card>
            )}
          />
        )}

        <Button onPress={() => completarCorrida()} disabled={checkCorridaStatus()}>
          Completar Corrida
        </Button>
        <TakePhotoModal
          visible={isTakePhotoModalOpen}
          onClose={() => toggleTakePhotoModal(false)}
          onPhotoTaken={savePhoto}
          animationType="slide"
        />
      </Container>
    </>
  );
};

export default RouteModal;