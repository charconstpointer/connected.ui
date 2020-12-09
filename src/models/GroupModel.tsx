import PostModel from './PostModel'
import UserModel from './UserModel'
export default class GroupModel {
    id: number;
    name: string;
    tags: Array<string>;
    posts: Array<PostModel>;
    users: Array<UserModel>;
    constructor(id: number, name: string, tags: Array<string>, posts: Array<PostModel>, users: Array<UserModel>) {
        this.id = id;
        this.name = name;
        this.tags = tags;
        this.posts = posts;
        this.users = users;
    }
}






export const fromJson = (data: any): GroupModel => {
    const group = new GroupModel(data.id, data.name, data.tags, data.posts, data.users);
    return group;
}