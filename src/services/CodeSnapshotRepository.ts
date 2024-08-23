import { AxiosResponse } from "axios";
import { CodeSnapshot } from "../model/CodeSnapshot";
import axi from "../utils/axios/Axios";

export class CodeSnapshotRepository {
  private static instance: CodeSnapshotRepository;

  constructor() {}


  public static getInstance(): CodeSnapshotRepository {
    if (!this.instance) {
      this.instance = new CodeSnapshotRepository();
    }
    return this.instance;
  }  

  // 월별 스냅샷 리스트
  getSnapshots:(month:number) => Promise<CodeSnapshot[]> = async(month:number) => {
    const response:AxiosResponse = await axi.get(`snapshots/${month}`);
    return response.data.map(
      (snapshot:any) => {
        CodeSnapshot.fromJson(snapshot);
      }
    )
  }

  // 스냅샷 하나
  getSnapshot:() => Promise<CodeSnapshot> = async() => {
    const response:AxiosResponse = await axi.get('snapshot');
    return response.data;
  }
  
  // 스냅샷 저장
  saveSnapshot:(data:CodeSnapshot) => Promise<AxiosResponse<any,any>> = async(data:CodeSnapshot) => {
    return await axi.post('snapshots', JSON.stringify(data));
  }
}
