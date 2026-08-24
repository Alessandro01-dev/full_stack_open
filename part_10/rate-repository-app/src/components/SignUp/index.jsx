import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import theme from "../../theme";
import Text from "../Text";
import useCreateUser from "../../hooks/useCreateUser";
import useSignIn from "../../hooks/useSignIn";

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
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must be at most 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password must be at most 50 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const hasError = (field) => formik.touched[field] && formik.errors[field];

  return (
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

      <TextInput
        style={[
          styles.input,
          hasError("passwordConfirmation") && styles.inputError,
          !hasError("passwordConfirmation") && styles.spacer,
        ]}
        placeholder="Password confirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
        onBlur={formik.handleBlur("passwordConfirmation")}
        secureTextEntry
        autoCapitalize="none"
      />
      {hasError("passwordConfirmation") && (
        <Text style={styles.errorText}>
          {formik.errors.passwordConfirmation}
        </Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontWeight="bold" style={styles.buttonText}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({ username, password });
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;