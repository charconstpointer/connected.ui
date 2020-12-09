export default class Group {
    id: number;
    name: string;
    tags: Array<string>;

    constructor(id: number, name: string, tags: Array<string>) {
        this.id = id;
        this.name = name;
        this.tags = tags;
    }
}

export const fromJson = (data: any): Group => {
    const group = new Group(data.id, data.name, data.tags);
    return group;
}