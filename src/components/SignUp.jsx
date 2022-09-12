import { Button, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';
import { useNavigate } from 'react-router-dom';

const styles = StyleSheet.create({
  form: {
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  btn: {
    backgroundColor: '#FF3',
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    borderRadius: 2,
    shadowColor: '#242424',
  },
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username is a required string with a length between 1 and 30')
    .max(30, 'Username is a required string with a length between 1 and 30')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be less than 50 characters ')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password does not match')
    .required('Password confirm is required'),
});

export const SignInContainer = ({ onPress }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput
        name="passwordConfirm"
        placeholder="Password confirmation"
        secureTextEntry
      />
      <Button onPress={onPress} title="Sign Up" style={styles.btn} />
    </View>
  );
};

const SignIn = () => {
  let navigate = useNavigate();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      navigate('/', { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignInContainer onPress={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
