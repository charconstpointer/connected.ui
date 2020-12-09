class LoginValidator {
  validate(username: string, password: string): boolean {
    return true;
  }
}

const lv = new LoginValidator();
export { lv };