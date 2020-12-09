export default class CommentModel {
  content: string
  createDate: Date
  constructor(content: string, createDate: Date) {
    this.content = content;
    this.createDate = createDate;
  }
}

export const commentsFromJson = (data: any): Array<CommentModel> => {
  return data.comments.map((c: any) => commentFromJson(c));
}

export const commentFromJson = (data: any): CommentModel => {
  return new CommentModel(data.content, data.createDate);
}