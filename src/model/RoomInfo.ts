export class RoomInfo {
    private name:string;
    private description:string;
    private content:string;

    public constructor(name:string, description: string, content:string) {
        this.name = name;
        this.description = description;
        this.content = content;
    }

    static fromJson(data:any) {
        return new RoomInfo(
            data.name,
            data.description,
            data.content
        )
    }

    public getContent():string {
        return this.content;
    }
}