/* eslint-disable no-param-reassign */
import Validator from "validator";
module.exports = function validateRegisterInput(data: any) {
  let errors: any = {};

  const doesKeyExist = (key: any) => {
    return Object.prototype.hasOwnProperty.call(data, key) || false;
  };

  if (!doesKeyExist(`email`)) {
    errors.message = "Add key email";
  }
  if (!doesKeyExist(`password`)) {
    errors.message = "Add key password";
  }
  if (!doesKeyExist(`password2`)) {
    errors.message = "Add key password_2";
  }
  if (!doesKeyExist(`last_name`)) {
    errors.message = "Add key last_name";
  }
  if (!doesKeyExist(`first_name`)) {
    errors.message = "Add key first_name";
  }
  if (!doesKeyExist(`phone_number`)) {
    errors.message = "Add key phone_number";
  }
  data.phone_number = data.phone_number ? data.phone_number : "";
  data.email = data.email ? data.email : "";
  data.password = data.password ? data.password : "";
  data.password2 = data.password2 ? data.password2 : "";
  data.first_name = data.first_name ? data.first_name : "";
  data.last_name = data.last_name ? data.last_name : "";

  if (Validator.isEmpty(data.company_name)) {
    errors.message = "Name field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.message = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.message = "Email is invalid";
  }

  if (!Validator.isAlphanumeric(String(data.password))) {
    errors.message = "Password must be alphanumeric";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.message = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.message = "Confirm password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.message = "Passwords must match";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
