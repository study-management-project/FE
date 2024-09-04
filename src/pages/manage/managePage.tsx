import { AxiosResponse } from "axios"
import { useEffect } from "react"
import axi from "../../utils/axios/Axios";
import Cookies from 'js-cookie';

const ManagePage = () => {

  const getRooms = async() => {
    console.log(axi.defaults.withCredentials);
    const response:AxiosResponse = await axi.get('rooms');
    return response.data;
  }

  const getCookie = () => {
    const jsessionId = Cookies.get("JSESSIONID");
    console.log(jsessionId);
  }
  
  useEffect(() => {
    getCookie();
    getRooms();
    
  },[])

  return (
    <div>
      매니지 페이지
      <button onClick = {() => {console.log(document.cookie)}}>
        쿠키 테스트
      </button>
    </div>

  )
}

export default ManagePage