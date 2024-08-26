import { AxiosResponse } from "axios";
import { CodeSnapshot } from "./CodeSnapshot";

export class RoomInfo {
    private uuid: string;
    private name:string;
    private description:string;
    private content:string;
    private snapshotList:CodeSnapshot[];
    private commentList:string[];
    private haveSnapshotDate:number[];

    public constructor(uuid:string, name:string, description: string, content:string, snapshotList:CodeSnapshot[], commentList:string[], haveSnapshotDate: number[]) {
        this.uuid = uuid,
        this.name = name,
        this.description = description,
        this.content = content,
        this.snapshotList = snapshotList,
        this.commentList = commentList,
        this.haveSnapshotDate = haveSnapshotDate
    }

    static fromJson(data:any) {
        const snapshotList:CodeSnapshot[] = data.snapshotList.map((snapshot:any) => CodeSnapshot.fromJson(snapshot));
        return new RoomInfo(
            data.checkUpDTO.uuid,
            data.name,
            data.description,
            data.contetn,
            snapshotList,
            data.commentList,
            data.haveSnapshotDate
        )
    }

    public getHaveSnapshotDate() {
        return this.haveSnapshotDate;
    }
}