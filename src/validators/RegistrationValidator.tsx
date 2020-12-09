class RegistrationValidator {
  validate(username: string, password: string, email: string): boolean {
    return true;
  }
}

const v = new RegistrationValidator();
export { v };