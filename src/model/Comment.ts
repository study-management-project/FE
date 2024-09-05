export class Comment {
  private description:string;
  private createdAt:string;

  public constructor(description:string, createdAt:string) {
    this.description=description;
    this.createdAt=createdAt;
  }

  getDesc():string {
    return this.description;
  }

  setDesc(newDescription:string):void {
    this.description = newDescription;
  }

  getCreatedAt():string {
    return this.createdAt;
  }

  setCreatedAt():void {
    this.createdAt = new Date().toString(); 
  }

  static fromJson(json:any):Comment {
    return new Comment(
      json["description"],
      json["createdAt"]
    )
  }
}