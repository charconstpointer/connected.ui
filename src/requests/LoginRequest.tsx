export default class RegisterRequest {
  username: string
  password: string
  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
  }
}
