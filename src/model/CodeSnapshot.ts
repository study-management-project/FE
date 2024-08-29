import { AxiosResponse } from "axios";

export class CodeSnapshot {
  private title:string;
  private content:string;
  private createdAt:string;
  
  public constructor(title:string, content:string, createdAt:string) {
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }

  getContent():string {
    return this.content;
  }

  setContent(newContent:string):void {
    this.content = newContent;
  }

  getCreatedAt():string {
    return this.createdAt;
  }

  setCreatedAt():void {
    this.createdAt = new Date().toString();
  }

  static fromJson(json:AxiosResponse<any,any>):CodeSnapshot {
    const data = json.data; 
    return new CodeSnapshot(
      data.title,
      data.content,
      data.createdDate
    )
  }
}