export type RegisterFormState = {
  errors: {
    username?: string;
    password?: string;
    passwordConfirm?: string;
  };
  values?: { username: string; name: string };
};
