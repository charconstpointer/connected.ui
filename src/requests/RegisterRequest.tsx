import { useEffect } from "react";

export default class RegisterRequest {
  username: string
  password: string
  email: string
  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

}
