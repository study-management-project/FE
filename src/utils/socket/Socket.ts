import { CompatClient, IMessage, Stomp, StompSubscription } from "@stomp/stompjs";
import axi from "../axios/Axios";
import { AxiosResponse } from "axios";
import SockJS from "sockjs-client";


export class Sock {
    private static instance:any = new SockJS(import.meta.env.VITE_SERVER_URL+'/ws');
    private static client:CompatClient | undefined;
    private static roomId:string|undefined;
    private static timer:NodeJS.Timeout|undefined;
    private static subscriptions:StompSubscription[] = [];

    private constructor() {}

    public static getInstance():Sock {
        return Sock.instance;
    }

    // 소켓 연결
    public static async connect():Promise<void> {
        return new Promise((resolve, reject) => {
            this.client = Stomp.over(Sock.instance);
            this.client.connect({}, () => {
                resolve();
            }, (error:any) => {
                console.log("연결 실패");
                reject(error)
            });
        })
    }

    // 방 접속
    public static async joinRoom(roomId:string|undefined):Promise<void> {
        const response:AxiosResponse = await axi.get(`/room/${roomId}`);
        Sock.roomId = roomId;
        console.log(`Sock.roomId = ${Sock.roomId}`);
        return response.data;
    }

    private static isConnected():boolean {
        return (Sock.client != undefined)&&(Sock.client.connected);
    }

    // 토픽 구독
    public static subscribe(topic:string, action?: Function):void {
        console.log(`Sock.roomId = ${Sock.roomId}`);
        if (Sock.client) {
            if (Sock.client.connected) {
                const subscription:StompSubscription = Sock.client.subscribe(
                    "/topic/"+ Sock.roomId + "/"+ topic,
                    (message:IMessage) => {action? action(message.body) : console.log(message.body)}
                );
                Sock.subscriptions.push(subscription);
            }
        }
    }

    public static unsubscribe():void {
        if (Sock.isConnected()) {
            for (let subscription of Sock.subscriptions) {
                subscription.unsubscribe();
            }
        }
    }

    // 코드 공유
    public static sendCode(code: string) {
        if (Sock.timer) {
            clearTimeout(Sock.timer);
        }
        Sock.timer = setTimeout(() => {
            Sock.client?.send(
                "/share-code",
                {},
                JSON.stringify({uuid: Sock.roomId, content: code})
            )
        },500)
        clearTimeout(Sock.timer);
    }

    // 코멘트 등록
    public static sendComment (comment:string) {
        Sock.client?.send(
            "/share-comment",
            {},
            JSON.stringify({uuid: Sock.roomId, content: comment})
        )
    }

    // 스냅샷 등록
    public static sendSnapshot (comment:string) {
        Sock.client?.send(
            "/share-snapshot",
            {},
            JSON.stringify({uuid: Sock.roomId, content: comment})
        )
    }
}