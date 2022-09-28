/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View, Image, Alert } from 'react-native';
import firebase from 'firebase';
import shortid from 'shortid';
import { Button, Text, Spinner } from '@ui-kitten/components';
import BottomModal from 'templates/bottom-modal';
import TakePhotoModal from 'templates/take-photo-modal';
import { Title } from './elements';

const EvidenciaModal = ({ visible, onClose, parada, query }) => {
  const [isTakePhotoModalOpen, toggleTakePhotoModal] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [tryNum, setTryNum] = useState(0);
  const [imageUploaded] = useState(false);
  const [img, setImg] = useState(null);

  const savePhoto = async ({ imageBlob }) => {
    // Do not request access because this relies on the driver already gave access
    // in the Home screen
    const db = firebase.firestore();
    setUploadingImage(true);
    const imgRef = firebase.storage().ref().child(`corridas-images/${shortid.generate()}`);
    const task = imgRef.put(imageBlob);

    task.on(
      'state_changed',
      () => {},
      () => {},
      () => {
        imgRef.getDownloadURL().then((url) => {
          if (tryNum === 0) {
            setTryNum(2);
            const tempArray = [...parada.eventos];
            if (parada.estatus === 'Devolucion') {
              tempArray.push({ statusid: 8, status: 'Devolucion', fecha: new Date() });
            } else {
              tempArray.push({ statusid: 6, status: 'Entregado', fecha: new Date() });
            }

            db.collection('Guias')
              .doc(parada.id)
              .update({
                estatus: parada.estatus === 'Devolucion' ? 'Devolucion' : 'Entregado',
                preEvidencia: url,
                eventos: tempArray,
              })
              .then(() => {
                setImg(url);
                setUploadingImage(false);
              });
          } else {
            db.collection('Guias')
              .doc(parada.id)
              .update({ preEvidencia: url })
              .then(() => {
                setImg(url);
                setUploadingImage(false);
              });
          }
        });
      }
    );
  };

  return (
    <BottomModal visible={visible} onClose={onClose}>
      <Title category="h5">¿Hiciste la entrega del paquete?</Title>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}
      >
        {img ? (
          imageUploaded ? (
            <Text style={{ marginTop: 10, marginBottom: 20 }}>Listo ¡Gracias!</Text>
          ) : uploadingImage ? (
            <Spinner />
          ) : (
            <>
              <Image
                style={{
                  width: 300,
                  height: 400,
                  marginBottom: 20,
                }}
                source={{
                  uri: img,
                }}
                // onLoadEnd={() => setUploadingImage(false)}
              />
              <Button
                style={{ width: 200, marginBottom: 20 }}
                onPress={() => toggleTakePhotoModal(true)}
                appearance="outline"
              >
                Tomar de nuevo
              </Button>
              <Button
                style={{ width: 200, marginBottom: 20 }}
                disabled={!img}
                onPress={() => {
                  query();
                  onClose();
                  Alert.alert('Guia Entregada');
                }}
              >
                Subir Evidencia
              </Button>
            </>
          )
        ) : uploadingImage ? (
          <Spinner />
        ) : (
          <>
            <Button style={{ margin: 10 }} onPress={() => toggleTakePhotoModal(true)}>
              Subir Evidencia
            </Button>
          </>
        )}
      </View>
      <TakePhotoModal
        visible={isTakePhotoModalOpen}
        onClose={() => toggleTakePhotoModal(false)}
        onPhotoTaken={savePhoto}
        animationType="slide"
      />
    </BottomModal>
  );
};

export default EvidenciaModal;
