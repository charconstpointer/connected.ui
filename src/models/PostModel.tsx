import UserModel, { userFromJson } from "./UserModel";
import CommentModel, { commentsFromJson } from '../models/CommentModel'
export default class PostModel {
  id: number;
  body: string;
  postDate: Date;
  poster: UserModel;
  comments: Array<CommentModel>

  constructor(id: number, body: string, postDate: Date, poster: UserModel, comments: Array<CommentModel>) {
    this.id = id;
    this.body = body;
    this.postDate = postDate;
    this.poster = poster;
    this.comments = comments;
  }
}

export const postFromJson = (data: any): PostModel => {
  console.log(data)
  return new PostModel(data.id, data.body, data.postDate, userFromJson(data.poster), commentsFromJson(data));
}