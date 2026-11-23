export type BlogFormState = {
  errors: { title?: string; author?: string; url?: string };
  values?: { title: string; author: string; url: string };
};
