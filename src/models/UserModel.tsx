export default class UserModel {
  username: string
  email: string
  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
  }


}

export const userFromJson = (data: any): UserModel => {
  return new UserModel(data.username, data.email);
}
