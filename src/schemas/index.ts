import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .required("Required"),
});

// validate authorId is an array of numbers
export const BookSchema = Yup.object({
  title: Yup.string().required("Required"),
  published_year: Yup.number()
    .typeError("Must be a number")
    .integer("Must be an integer")
    .required("Required"),
  stock: Yup.number()
    .typeError("Must be a number")
    .integer("Must be an integer")
    .required("Required"),
  authorId: Yup.array()
    .min(1, "Must be at least 1 author")
    .required("Required"),
  genreId: Yup.array().min(1, "Must be at least 1 genre").required("Required"),
});
