class GroupModel {
  id: number
  name: string

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

const groupFromJson = (data: any): GroupModel => {
  return new GroupModel(data.id, data.name);
}

export default class UserInfoModel {
  username: string
  email: string
  groups: GroupModel[]
  constructor(username: string, email: string, groups: Array<any>) {
    this.username = username;
    this.email = email;
    this.groups = groups?.map(groupFromJson)
  }
}

export const userInfoFromJson = (data: any): UserInfoModel => {
  return new UserInfoModel(data.username, data.email, data.groups);
}
