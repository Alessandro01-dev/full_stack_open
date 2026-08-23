import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import theme from "../../theme";
import Text from "../Text";
import useSignIn from "../../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 15,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    marginTop: 4,
    marginBottom: 15,
  },
  spacer: {
    marginBottom: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.white,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const hasError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          style={[
            styles.input,
            hasError("username") && styles.inputError,
            !hasError("username") && styles.spacer,
          ]}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
          onBlur={formik.handleBlur("username")}
          autoCapitalize="none"
        />
        {hasError("username") && (
          <Text style={styles.errorText}>{formik.errors.username}</Text>
        )}
        <TextInput
          style={[
            styles.input,
            hasError("password") && styles.inputError,
            !hasError("password") && styles.spacer,
          ]}
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          secureTextEntry
          autoCapitalize="none"
        />
        {hasError("password") && (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        )}
        <Pressable style={styles.button} onPress={formik.handleSubmit}>
          <Text fontWeight="bold" style={styles.buttonText}>
            Sign in
          </Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const response = await signIn({ username, password });
      if (response.data?.authenticate) {
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
