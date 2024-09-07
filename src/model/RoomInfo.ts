export class RoomInfo {
    private id?:number;
    private uuid?: string;
    private name:string;
    private description:string;
    private content?:string;

    public constructor(name:string, description: string, content?:string,
        id?:number, uuid?:string
    ) {
        this.name = name;
        this.description = description;
        this.content = content;
        this.id = id;
        this.uuid = uuid;
    }

    static fromJson(data:any) {
        return new RoomInfo(
            data.name,
            data.description,
            data.content
        )
    }

    static fromListJson(data:any) {
        return new RoomInfo(
            data.name,
            data.description,
            undefined,
            data.id,
            data.uuid
        )
    }

    public getId():number {
        if (this.id) {
            return this.id;
        } else {
            return -1;
        }
    }

    public getContent():string {
        if (this.content) {
            return this.content;
        } else {
            return "";
        }
    }

    public getUuid():string {
        if (this.uuid) {
            return this.uuid;
        } else {
            return "";
        }
    }

    public getName():string {
        return this.name;
    }

    public getDescription():string {
        return this.description;
    }
}