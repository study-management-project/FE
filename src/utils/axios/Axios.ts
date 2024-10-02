import axios, { AxiosInstance } from "axios";

class Axios {
    private static instance: AxiosInstance;

    private constructor() {}

    public static getInstance():AxiosInstance {
        // axios 인스턴스 생성
        Axios.instance = axios.create({
            baseURL: import.meta.env.VITE_SERVER_URL,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        })
        // 인스턴스에 interceptors 설정
        Axios.instance.interceptors.response.use((res) => {
            return res;
        }, async (error) => {
            return error;
        })
        return Axios.instance;
    }
    
    public get(url:string) {
        return Axios.instance.get(
            url
        )
    }

    public post(url:string, data:any) {
        return Axios.instance.post(
            url,
            data
        )
    }

    public put(url:string, data:any) {
        return Axios.instance.put(
            url,
            data
        )
    }

    public delete(url:string) {
        return Axios.instance.delete(
            url
        )
    }
}

const axi = Axios.getInstance();
export default axi;