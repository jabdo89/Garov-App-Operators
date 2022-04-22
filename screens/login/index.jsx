import React, { useState, useEffect } from 'react';
import { auth } from '@config/firebase';
import KeyboardAwareScroll from '@components/keyboard-aware-scroll';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback, View } from 'react-native';
import { emailPattern } from '@config/constants';
import { Icon, Spinner } from '@ui-kitten/components';
import { Content, Header, Title, Subtitle, Input, SigninButton } from './elements';

const Login = () => {
  const { top } = useSafeAreaInsets();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [submittedTry, setSubmittedTry] = useState(false);
  const [isEmailError, setIsEmailError] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(true);

  useEffect(() => {
    setIsEmailError(!emailPattern.test(form.email));
  }, [form.email]);

  useEffect(() => {
    setIsPasswordError(!form.password);
  }, [form.password]);

  const submit = async () => {
    if (isEmailError || isPasswordError) {
      setSubmittedTry(true);
      return;
    }

    setSubmitting(true);
    try {
      await auth().signInWithEmailAndPassword(form.email, form.password);
    } catch (err) {
      setNoUser(true);
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAwareScroll>
      <StatusBar style="auto" />
      <Header pt={top} level="2">
        <Title category="h3">Garov</Title>
        <Subtitle category="h6">Inicia sesión</Subtitle>
      </Header>
      <Content>
        <Input
          size="large"
          autoCapitalize="none"
          autoCompleteType="email"
          value={form.email}
          label="Correo"
          placeholder="Ingresa tu correo electrónico"
          status={submittedTry && isEmailError && 'warning'}
          caption={submittedTry && isEmailError && 'Ingresa un correo electrónico válido'}
          captionIcon={(props) =>
            submittedTry && isEmailError && <Icon {...props} name="alert-circle-outline" />
          }
          accessoryLeft={(props) => <Icon {...props} name="person-outline" />}
          onChangeText={(nextValue) => setForm({ ...form, email: nextValue })}
        />
        <Input
          size="large"
          autoCapitalize="none"
          autoCompleteType="password"
          value={form.password}
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          status={((submittedTry && isPasswordError) || noUser) && 'warning'}
          caption={noUser && 'Usuario no encontrado. Verifica tus credenciales'}
          captionIcon={(props) => noUser && <Icon {...props} name="alert-circle-outline" />}
          accessoryRight={(props) => (
            <TouchableWithoutFeedback onPress={() => setSecureTextEntry(!secureTextEntry)}>
              <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
            </TouchableWithoutFeedback>
          )}
          accessoryLeft={(props) => <Icon {...props} name="unlock-outline" />}
          secureTextEntry={secureTextEntry}
          onChangeText={(nextValue) => setForm({ ...form, password: nextValue })}
        />
        <SigninButton
          accessoryLeft={
            submitting
              ? (props) => (
                  <View {...props}>
                    <Spinner size="small" />
                  </View>
                )
              : undefined
          }
          disabled={submitting}
          accessoryRight={(props) => <Icon {...props} name="arrowhead-right-outline" />}
          onPress={submit}
        >
          Iniciar sesión
        </SigninButton>
      </Content>
    </KeyboardAwareScroll>
  );
};

export default Login;
