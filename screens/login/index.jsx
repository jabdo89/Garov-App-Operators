import React, { useState, useEffect } from 'react';
import KeyboardAwareScroll from '@components/keyboard-aware-scroll';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native';
import { useSession } from '@providers/session';
import { Icon } from '@ui-kitten/components';
import { Content, Header, Title, Subtitle, Input, SigninButton, Warning } from './elements';

const Login = () => {
  const { top } = useSafeAreaInsets();
  const [form, setForm] = useState({
    emailUsername: '',
    password: '',
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { login } = useSession();
  const [submittedTry, setSubmittedTry] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  useEffect(() => {
    setIncorrect(false);
  }, [form]);

  const submit = async () => {
    if (!form.emailUsername || !form.password) {
      setSubmittedTry(true);
      return;
    }

    try {
      await login(form.emailUsername, form.password);
    } catch (err) {
      setIncorrect(true);
    }
  };

  return (
    <KeyboardAwareScroll>
      <Header pt={top} level="2">
        <Title category="h3">Bienvenido</Title>
        <Subtitle category="h6">Inicia sesión</Subtitle>
      </Header>
      <Content>
        <Input
          autoCapitalize="none"
          autoCompleteType="emailUsername"
          value={form.emailUsername}
          label="Correo"
          placeholder="Username o correo electrónico"
          caption={submittedTry && !form.emailUsername && 'Ingresa un username o correo'}
          status={submittedTry && !form.emailUsername && 'warning'}
          captionIcon={(props) =>
            submittedTry && !form.emailUsername && <Icon {...props} name="alert-circle-outline" />
          }
          accessoryLeft={(props) => <Icon {...props} name="person-outline" />}
          onChangeText={(nextValue) => setForm({ ...form, emailUsername: nextValue })}
        />
        <Input
          autoCapitalize="none"
          autoCompleteType="password"
          value={form.password}
          label="Contraseña"
          placeholder="Contraseña"
          status={submittedTry && !form.password && 'warning'}
          caption={submittedTry && !form.password && 'Ingresa la contraseña'}
          accessoryRight={(props) => (
            <TouchableWithoutFeedback onPress={() => setSecureTextEntry(!secureTextEntry)}>
              <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
            </TouchableWithoutFeedback>
          )}
          accessoryLeft={(props) => <Icon {...props} name="unlock-outline" />}
          secureTextEntry={secureTextEntry}
          onChangeText={(nextValue) => setForm({ ...form, password: nextValue })}
        />
        {incorrect && <Warning status="danger">Contraseña o usuario incorrecto</Warning>}
        <SigninButton
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
