export default interface ICreateNewGroup {
    name: string,
    description: string,
    tags: Array<string>
}

export default class CreateNewGroup implements ICreateNewGroup {
    constructor(groupName: string, description: string) {
        this.name = groupName;
        this.description = description;
        this.tags = [groupName, description]
    }
}