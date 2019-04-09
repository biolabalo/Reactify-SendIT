/* eslint-disable no-console */

// eslint-disable-next-line no-undef
let PasswordToCampare;
export function validateFullname(fullname) {
  if (fullname.trim().length < 5) return ['isShowFullnameError', false];
  return ['isShowFullnameError', true];
}

export function validateEmail(Email) {
  // eslint-disable-next-line no-useless-escape
  const regexVal = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  if (!regexVal.test(Email)) return ['isShowEmailError', false];
  return ['isShowEmailError', true];
}

export function validatePassword(Pasword) {
  PasswordToCampare = Pasword;
  const regexVal = /^[a-zA-Z0-9]{5,15}$/;
  if (!regexVal.test(Pasword)) return ['isShowPasswordError', false];
  return ['isShowPasswordError', true];
}

export function confirmPassword(pwd) {
  if (PasswordToCampare !== pwd) return ['isConfirmPasswordNotEqualPassword', false];
  return ['isConfirmPasswordNotEqualPassword', true];
}

export function validateInputs(inputname, inputValue) {
  let result;
  switch (inputname) {
    case 'fullname':
      result = validateFullname(inputValue);
      break;
    case 'email':
      result = validateEmail(inputValue);
      break;
    case 'password':
      result = validatePassword(inputValue);
      break;
    case 'confirmpassword':
      result = confirmPassword(inputValue);
      break;
    default:
      result = null;
  }

  return result;
}
