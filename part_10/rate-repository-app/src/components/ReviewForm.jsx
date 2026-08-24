import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import theme from "../theme";
import Text from "./Text";
import useCreateReview from "../hooks/useCreateReview";

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
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
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
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100")
    .required("Rating is required"),
  text: yup.string(),
});

export const ReviewFormContainer = ({ onSubmit }) => {
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
          hasError("ownerName") && styles.inputError,
          !hasError("ownerName") && styles.spacer,
        ]}
        placeholder="Repository owner's username"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        onBlur={formik.handleBlur("ownerName")}
        autoCapitalize="none"
      />
      {hasError("ownerName") && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          hasError("repositoryName") && styles.inputError,
          !hasError("repositoryName") && styles.spacer,
        ]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        onBlur={formik.handleBlur("repositoryName")}
        autoCapitalize="none"
      />
      {hasError("repositoryName") && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          hasError("rating") && styles.inputError,
          !hasError("rating") && styles.spacer,
        ]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        onBlur={formik.handleBlur("rating")}
        keyboardType="numeric"
      />
      {hasError("rating") && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          styles.multilineInput,
          hasError("text") && styles.inputError,
          !hasError("text") && styles.spacer,
        ]}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        onBlur={formik.handleBlur("text")}
        multiline
      />
      {hasError("text") && (
        <Text style={styles.errorText}>{formik.errors.text}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontWeight="bold" style={styles.buttonText}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const data = await createReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text,
      });

      if (data?.createReview?.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;