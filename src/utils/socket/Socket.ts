import { CompatClient, IMessage, Stomp, StompSubscription } from "@stomp/stompjs";
import axi from "../axios/Axios";
import { AxiosResponse } from "axios";
import SockJS from "sockjs-client";
import { Dispatch, SetStateAction } from "react";


export class Sock {
    private client: CompatClient | undefined;
    private roomId: string | undefined;
    private subscriptions: StompSubscription[] = [];
    private instance: any;

    private constructor() {
        this.instance = new SockJS(import.meta.env.VITE_SERVER_URL + 'ws');
    }

    public static createInstance(): Sock {
        return new Sock();
    }

    public getRoomId() {
        return this.roomId;
    }

    // 소켓 연결
    public async connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client = Stomp.over(this.instance);
            this.client.connect({}, () => {
                resolve();
            }, (error: any) => {
                reject(error);
            });
        });
    }

    // 방 접속
    public async joinRoom(roomId: string | undefined): Promise<void> {
        const response: AxiosResponse = await axi.get(`/room/${roomId}`);
        this.roomId = roomId;
        return response.data;
    }

    private isConnected(): boolean {
        return (this.client != undefined) && (this.client.connected);
    }

    // 토픽 구독
    public subscribe(topic: string, action: Dispatch<SetStateAction<any>>): void {
        if (this.client) {
            if (this.client.connected) {
                const subscription: StompSubscription = this.client.subscribe(
                    "/topic/" + this.roomId + "/" + topic,
                        (message:IMessage) => {
                            action(message.body);
                        }

                );
                this.subscriptions.push(subscription);
            }
        }
    }

    public unsubscribe(): void {
        if (this.isConnected()) {
            for (const subscription of this.subscriptions) {
                subscription.unsubscribe();
            }
        }
    }

    // 코드 공유
    public async sendCode(code: string):Promise<void> {
        return new Promise((resolve, reject) => {
            resolve(
                this.client?.send(
                    "/share-code",
                    {},
                    JSON.stringify({ uuid: this.roomId, content: code })
                )
            )
        })
    }

    // 코멘트 등록
    public sendComment(comment: string) {
        this.client?.send(
            "/share-comment",
            {},
            JSON.stringify({ uuid: this.roomId, content: comment })
        );
    }

    // 스냅샷 등록
    public sendSnapshot(comment: string) {
        this.client?.send(
            "/share-snapshot",
            {},
            JSON.stringify({ uuid: this.roomId, content: comment })
        );
    }
}