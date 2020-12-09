import UserModel from "./UserModel";

export default class PostModel {
  id: number;
  body: string;
  postDate: Date;
  poster: UserModel;

  constructor(id: number, body: string, postDate: Date, poster: UserModel) {
    this.id = id;
    this.body = body;
    this.postDate = postDate;
    this.poster = postDate;
  }
  // public <CommentDto> Comments :IEnumerable;
}

export const userFromJson = (data: any): PostModel => {
  return new PostModel(data.id, data.body, data.postDate, new UserModel());
}