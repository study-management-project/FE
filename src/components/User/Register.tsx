import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import axi from '../../utils/axios/Axios';

export default function Register() {
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response: AxiosResponse = await axi.post("/register");
            console.log(response);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <>
            <div className='w-full h-full flex justify-center align-middle border-collapse border-2 border-neutral-950 rounded-md'>
                <div className='w-full h-full m-2'>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="id" 
                            placeholder='유저명' 
                            className='w-full mt-2 h-12 max-h-8 border rounded-md' 
                        />
                        <input 
                            type="text" 
                            name="id" 
                            placeholder='아이디' 
                            className='w-full mt-2 h-12 max-h-8 border rounded-md' 
                        />
                        <input 
                            type="password" 
                            name="password" 
                            placeholder='비밀번호' 
                            className='w-full mt-2 h-12 max-h-8 rounded-md' 
                        />

                        <input 
                            type="password" 
                            name="password" 
                            placeholder='비밀번호 확인' 
                            className='w-full mt-2 h-12 max-h-8 rounded-md' 
                        />
                        <input 
                            type="submit" 
                            value="회원가입" 
                            className='w-full mt-4 h-24 max-h-12 text-xl bg-blue-800 text-white rounded-md'
                        />
                        <div className='flex justify-end mt-4'>
                            <button 
                                type="button" 
                                onClick={() => navigate('/')}>
                                로그인
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
