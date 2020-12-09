import UserModel, { userFromJson } from "./UserModel";

export default class PostModel {
  id: number;
  body: string;
  postDate: Date;
  poster: UserModel;

  constructor(id: number, body: string, postDate: Date, poster: UserModel) {
    this.id = id;
    this.body = body;
    this.postDate = postDate;
    this.poster = poster;
  }
  // public <CommentDto> Comments :IEnumerable;
}

export const postFromJson = (data: any): PostModel => {
  console.log(data)
  return new PostModel(data.id, data.body, data.postDate, userFromJson(data.poster));
}