import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableWithoutFeedback } from 'react-native';
import { useSession } from '@providers/session';
import { Icon, Spinner } from '@ui-kitten/components';
import Isotype from '@assets/brand/logo-primary.png';
import { useForm } from 'react-hook-form';
import {
  Content,
  Container,
  Input,
  SigninButton,
  Warning,
  Logo,
  SpinnerContainer,
} from './elements';

const Login = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { login } = useSession();
  const [incorrect, setIncorrect] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    errors,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    register('emailUsername', { required: 'Ingresa un username o correo' });
    register('password', { required: 'Ingresa la contraseña' });
  }, [register]);

  const submit = async ({ emailUsername, password }) => {
    try {
      await login(emailUsername, password);
    } catch (err) {
      setIncorrect(true);
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <Container>
        <Content>
          <Logo source={Isotype} />
          <Input
            autoCapitalize="none"
            autoCompleteType="email"
            size="large"
            label="Username o correo electrónico"
            placeholder="Username o correo electrónico"
            caption={errors.emailUsername?.message}
            status={errors.emailUsername?.message && 'warning'}
            captionIcon={
              errors.emailUsername?.message
                ? (props) => <Icon {...props} name="alert-circle-outline" />
                : undefined
            }
            accessoryLeft={(props) => <Icon {...props} name="person-outline" />}
            onChangeText={(value) => setValue('emailUsername', value)}
          />
          <Input
            autoCapitalize="none"
            autoCompleteType="password"
            size="large"
            label="Contraseña"
            placeholder="Contraseña"
            caption={errors.password?.message}
            status={errors.password?.message && 'warning'}
            captionIcon={
              errors.password?.message
                ? (props) => <Icon {...props} name="alert-circle-outline" />
                : undefined
            }
            accessoryRight={(props) => (
              <TouchableWithoutFeedback onPress={() => setSecureTextEntry(!secureTextEntry)}>
                <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
              </TouchableWithoutFeedback>
            )}
            accessoryLeft={(props) => <Icon {...props} name="unlock-outline" />}
            secureTextEntry={secureTextEntry}
            onChangeText={(value) => setValue('password', value)}
          />
          {incorrect && <Warning status="danger">Contraseña o usuario incorrecto</Warning>}
          <SigninButton
            accessoryRight={(props) =>
              isSubmitting ? (
                <SpinnerContainer {...props}>
                  <Spinner size="small" status="basic" />
                </SpinnerContainer>
              ) : (
                <Icon {...props} name="arrowhead-right-outline" />
              )
            }
            onPress={handleSubmit(submit)}
            size="large"
          >
            {isSubmitting ? '' : 'Iniciar sesión'}
          </SigninButton>
        </Content>
      </Container>
    </>
  );
};

export default Login;
