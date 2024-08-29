import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import axi from '../../utils/axios/Axios';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const [getId, setId] = useState('');
    const [getPwd, setPwd] = useState('');
    const [isEmpty, setEmpty] = useState(true);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(getId === '' || getPwd === '') {
            setEmpty(!isEmpty)
            return;
        }

        const data = {
            email: getId,
            password: getPwd
        }

        try {
            const response: AxiosResponse = await axi.post("/login", JSON.stringify(data));
            console.log(response);
        } catch (error) {
            alert('아이디 혹은 패스워드가 다릅니다.');
            console.error("Login failed:", error);
        }
    };

    return (
        <>
            <div className='w-full h-full flex justify-center align-middle border-collapse border-2 border-neutral-950 rounded-md'>
                <div className='w-full h-full m-2'>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type='text'
                            name='id'
                            id='id' 
                            placeholder='이메일 주소' 
                            className='w-full mt-4 h-12 max-h-8 border rounded-tl-md rounded-tr-md'
                            value={getId}
                            onChange={event => setId(event.target.value)}
                        />
                        <input 
                            type='password'
                            name='password'
                            placeholder='비밀번호' 
                            className='w-full h-12 max-h-8 rounded-bl-md rounded-br-md'
                            value={getPwd}
                            onChange={event => setPwd(event.target.value)}
                        />
                        {!isEmpty && <span className='text-red-500'>모든 필드를 입력하세요.</span>}
                        <input 
                            type='submit'
                            value='로그인'
                            className='w-full mt-4 h-24 max-h-12 text-xl bg-blue-800 text-white rounded-md'
                        />
                        <div className='flex justify-end mt-4'>
                            <button 
                                type='button'
                                onClick={() => navigate('/register')}>
                                회원가입
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}


export default Login