export default class CreateNewGroup {
    name: string
    description: string
    tags: Array<string>
    constructor(groupName: string, description: string) {
        this.name = groupName;
        this.description = description;
        this.tags = [groupName, description]
    }
}