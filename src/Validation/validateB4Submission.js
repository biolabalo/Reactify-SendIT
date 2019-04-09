import {
  validateFullname,
  validateEmail,
  validatePassword,
  confirmPassword,

} from './validateInputs';

export default function validateB4Submission(userData) {
  if (validateFullname(userData.fullname)[1] === false
      || validateEmail(userData.email)[1] === false
      || validatePassword(userData.password)[1] === false
      || confirmPassword(userData.confirmpassword)[1] === false
  ) {
    return false;
  }
  return true;
}
