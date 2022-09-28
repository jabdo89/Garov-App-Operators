/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useAuth } from '@providers/auth';
import firebase from 'firebase';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { Text, Button, Icon, List, ListItem } from '@ui-kitten/components';
import { Container } from './elements';

const Home = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation();

  const [corridas, setCorridas] = useState([]);
  const [corridaActual, setCorridaActual] = useState(null);

  useEffect(() => {
    const query = () => {
      const db = firebase.firestore();

      db.collection('Corridas').onSnapshot((querySnapshot) => {
        let corridasArray = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.operador === user.userID) {
            corridasArray.push(data);
            if (data.estatus === 'activo') {
              setCorridaActual(data);
            }
          }
        });
        corridasArray = corridasArray.slice().sort((a, b) => b.fecha.seconds - a.fecha.seconds);

        setCorridas(corridasArray);
      });
    };
    query();
  }, [user]);

  const query = () => {
    const db = firebase.firestore();
    db.collection('Corridas').onSnapshot((querySnapshot) => {
      let corridasArray = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.operador === user.userID) {
          corridasArray.push(data);
          if (data.estatus === 'activo') {
            setCorridaActual(data);
          } else {
            setCorridaActual(null);
          }
        }
      });
      corridasArray = corridasArray.slice().sort((a, b) => b.fecha.seconds - a.fecha.seconds);

      setCorridas(corridasArray);
    });
  };

  const renderItemIcon = (props) => <Icon {...props} name="car" />;

  const renderItem = ({ item }) => (
    <ListItem
      title={item.id}
      description={moment(item.fecha.seconds * 1000).format('ddd, D MMM')}
      accessoryLeft={renderItemIcon}
      accessoryRight={() => (
        <Button
          size="tiny"
          onPress={() =>
            item.estatus === 'activo'
              ? navigate('Corrida', {
                  route: {
                    estatus: item.estatus,
                    guias: item.guias,
                    id: item.id,
                    numCorrida: item.numCorrida,
                    operador: item.operador,
                    tipo: item.tipo,
                    unidad: item.unidad,
                  },
                  onFinish: query,
                })
              : null
          }
        >
          {item.estatus}
        </Button>
      )}
    />
  );

  return (
    <>
      <Container>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '20%',
            backgroundColor: 'blue',
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              marginLeft: 20,
              marginTop: '10%',
              fontWeight: '800',
            }}
            strong
          >
            Hola, {user.nombre}
          </Text>
          <Text style={{ color: 'white', fontSize: 15, marginLeft: 20 }}>
            ¿Listo para tu corrida de hoy?
          </Text>
        </View>
        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>Tu Corrida de Hoy :</Text>
          {corridaActual ? (
            <Button
              style={{ width: '40%', margin: 20 }}
              onPress={() =>
                navigate('Corrida', {
                  route: {
                    estatus: corridaActual.estatus,
                    guias: corridaActual.guias,
                    id: corridaActual.id,
                    numCorrida: corridaActual.numCorrida,
                    operador: corridaActual.operador,
                    tipo: corridaActual.tipo,
                    unidad: corridaActual.unidad,
                  },
                  onFinish: query,
                })
              }
            >
              <Text style={{ color: 'white' }}> Ir a Corrida</Text>
            </Button>
          ) : (
            <Text> Aun no tienes corrida</Text>
          )}
        </View>
        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>Historial de Corridas</Text>
          <List
            style={{
              maxHeight: '70%',
            }}
            data={corridas}
            renderItem={renderItem}
          />
        </View>
      </Container>
    </>
  );
};

export default Home;
