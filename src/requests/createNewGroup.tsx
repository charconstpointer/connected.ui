export default class CreateNewGroup {
    name: string
    description: string
    tags: Array<string>
    constructor(groupName: string, description: string, tags: string[]) {
        this.name = groupName;
        this.description = description;
        this.tags = [...tags, groupName, description]
    }
}