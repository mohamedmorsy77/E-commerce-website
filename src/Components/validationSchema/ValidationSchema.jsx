import * as Yup from "yup";
const getCharactersValidationErrors = (str) => {
  return `your password must have at least 1 ${str} characters`;
};

// Registers a validation error
export const registerSchema = Yup.object({
  name: Yup.string()
    .required("first name is required")
    .max(15, "first name must 15 characters or less"),
  email: Yup.string()
    .email("please enter a valid email")
    .required("email is required"),
  password: Yup.string()
    .min(6, "password should be at least 6 characters")
    .required("password is required")
    .matches(/[0-9]/, getCharactersValidationErrors("digit"))
    .matches(/[a-z]/, getCharactersValidationErrors("lowerCase"))
    .matches(/[A-Z]/, getCharactersValidationErrors("upperCase"))
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      getCharactersValidationErrors("special character")
    ),
  rePassword: Yup.string()
    .required("please retype your password")
    .oneOf([Yup.ref("password")], "your password does not be matched"),
  phone: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required("A phone number is required"),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("please enter a valid email")
    .required("email is required"),
  password: Yup.string().required("password is required"),
});

export const forgetPassSchema = Yup.object({
  email: Yup.string()
    .email("please enter a valid email")
    .required("enter your email address"),
});

export const newPasswordSchema = Yup.object({
  email: Yup.string()
    .email("please enter a valid email")
    .required("email is required"),
  newPassword: Yup.string()
    .min(6, "password should be less than 6 characters")
    .required("password is required")
    .matches(/[0-9]/, getCharactersValidationErrors("digit"))
    .matches(/[a-z]/, getCharactersValidationErrors("lowerCase"))
    .matches(/[A-Z]/, getCharactersValidationErrors("upperCase"))
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      getCharactersValidationErrors("special character")
    ),
});

export const resetCodeSchema = Yup.object({
  resetCode: Yup.string().required("Reset code is required"),
});

export const checkoutSchema = Yup.object({
  details: Yup.string()
    .required("You must enter your address details")
    .min(5, "You must enter at least 5 characters"),
  phone: Yup.string()
    .required("Your phone is required")
    .matches(/^[0-9]+$/, "That doesn't look like a phone number")
    .min(8, "Phone number must be at least 8 characters"),

  city: Yup.string().required("your city is required"),
});

export const changeProfileDataSchema = Yup.object({
  name: Yup.string()
    .required("first name is required")
    .max(15, "first name must 15 characters or less"),
  email: Yup.string()
    .email("please enter a valid email")
    .required("email is required"),
  phone: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required("A phone number is required"),
});

export const changeLoggedUserPassword = Yup.object({
  currentPassword: Yup.string()
    .min(6, "password should be at least 6 characters")
    .required("password is required"),
  password: Yup.string()
    .min(6, "password should be at least 6 characters")
    .required("password is required")
    .matches(/[0-9]/, getCharactersValidationErrors("digit"))
    .matches(/[a-z]/, getCharactersValidationErrors("lowerCase"))
    .matches(/[A-Z]/, getCharactersValidationErrors("upperCase"))
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      getCharactersValidationErrors("special character")
    ),
  rePassword: Yup.string()
    .required("please retype your password")
    .oneOf([Yup.ref("password")], "your password does not be matched"),
});
