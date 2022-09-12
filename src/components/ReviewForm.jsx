import { Button, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import useReview from '../hooks/useReview';
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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().min(0).max(100).required('Rating is required'),
  text: yup.string(),
});

export const SignInContainer = ({ onPress }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline={true} />
      <Button onPress={onPress} title="Create a review" style={styles.btn} />
    </View>
  );
};

const ReviewForm = () => {
  let navigate = useNavigate();
  const [createNewReview] = useReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { createReview } = await createNewReview({
        ownerName,
        repositoryName,
        rating,
        text,
      });

      const { repository } = createReview;
      navigate(`/${repository.id}`, { replace: true });
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

export default ReviewForm;
