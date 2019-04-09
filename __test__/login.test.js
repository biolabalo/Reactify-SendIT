import validateLoginB4Submission from '../src/Validation/login';
import {
  validateInputs,
  confirmPassword,
} from '../src/Validation/validateInputs';

describe('validateLoginB4Submission test', () => {
  it('should test the validateLoginB4Submission function when bad data is given', () => {
    const userData = {
      email: '',
      password: '',
    };
    const filteredArticles = validateLoginB4Submission(userData);
    expect(filteredArticles).toEqual(false);
  });
  it('should test the validateLoginB4Submission function when good data is given', () => {
    const userData = {
      email: 'biola101@gmail.com',
      password: 'ustomedd56',
    };
    const filteredArticles = validateLoginB4Submission(userData);
    expect(filteredArticles).toEqual(true);
  });
});

describe('comfirm password', () => {
  const PasswordToCampare = 'abiolabal24';
  const pwd = 'abiolabal24';
  it('should test the comfirm password function inside the validateInputs func', () => {
    const result = validateInputs('confirmpassword', pwd);
    expect(result[1]).toEqual(false);
  });


  it('should test null arguments', () => {
    const result = validateInputs();
    expect(result).toEqual(null);
  });

  
  it('should test the password function inside the validateInputs func', () => {
    const result = validateInputs('password', pwd);
    expect(result[1]).toEqual(true);
  });

  it('should test the email function inside the validateInputs func', () => {
    const result = validateInputs('email', pwd);
    expect(result[1]).toEqual(false);
  });

  it('should test the fullname function inside the validateInputs func', () => {
    const result = validateInputs('fullname', pwd);
    expect(result[1]).toEqual(true);
  });
});


describe('validateLoginB4Submission test', () => {
  it('should test the confirmPassword function when passwords match', () => {
    let pwd = 'aa123';
    let PasswordToCampare = 'aaaaaa123';
    const result = confirmPassword(pwd);
    expect(result[1]).toEqual(false);
  });
});
