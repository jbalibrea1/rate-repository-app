import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textInputStyle: {
    borderRadius: 5,
    borderColor: '#333',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  error: {
    borderColor: '#d73a4a',
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    styles.textInputStyle,
    style,
    error && styles.error,
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
