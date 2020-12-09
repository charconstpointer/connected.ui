import UserModel from "./UserModel";

export default class PostModel {
  public id: number;
  public body: string;
  public postDate: Date;
  public poster: UserModel;

  constructor(id: number, body: string, postDate: Date, poster: UserModel) {
    this.id = id;
    this.body = body;
    this.postDate = postDate;
    this.poster = postDate;
  }
  // public <CommentDto> Comments :IEnumerable;
}