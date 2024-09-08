import {  AxiosResponse } from "axios";
import axi from "../utils/axios/Axios";
import { Comment } from "../model/Comment";

export class CommentRepository {
  private static instance: CommentRepository;

  constructor() {}


  public static getInstance(): CommentRepository {
    if (!this.instance) {
      this.instance = new CommentRepository();
    }
    return this.instance;
  }  

  // 전체 코멘트 가져오기
  getComments:(page:number) => Promise<Comment[]> = async(page:number) => {
    const response:AxiosResponse = await axi.get(`comments/${page}`);
    return response.data.map(
      (comment:any) => {
        Comment.fromJson(comment);
      }
    )
  }
  
  // 코멘트 하나 저장하기
  saveComment:(data:Comment) => Promise<AxiosResponse<any,any>> = async(data:Comment) => {
    return await axi.post('comments', JSON.stringify(data));
  }
}
