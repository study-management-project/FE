export class CodeSnapshot {
  private content:string;
  private createdAt:string;
  
  public constructor(content:string, createdAt:string) {
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

  static fromJson(json:Map<string,any>):CodeSnapshot {
    return new CodeSnapshot(
      json.get("content"),
      json.get("createdAt")
    )
  }
}