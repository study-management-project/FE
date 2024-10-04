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
            if (response.status === 200) {
                navigate('/manage');
            }
        } catch (error) {
            alert('아이디 혹은 패스워드가 다릅니다.');
            console.error("Login failed:", error);
        }
    };

    return (
        <>
            <div className='w-full h-full flex justify-center align-middle border-collapse border-2rounded-md'>
                <div className='w-full h-full m-2'>
                    <form onSubmit={handleSubmit} autoComplete='off' className='flex flex-col justify-evenly h-96 px-4'>
                        <div className='h-3/5 flex flex-col justify-evenly'>
                            <input 
                                type='text'
                                name='id'
                                id='id' 
                                placeholder='이메일 주소' 
                                className='w-full px-2 rounded-md bg-white/50 placeholder:text-white text-xl leading-[3rem]'
                                value={getId}
                                onChange={event => setId(event.target.value)}
                            />
                            <input 
                                type='password'
                                name='password'
                                placeholder='비밀번호' 
                                className='w-full px-2 rounded-bl-md rounded-md bg-white/50 placeholder:text-white text-xl leading-[3rem]'
                                value={getPwd}
                                onChange={event => setPwd(event.target.value)}
                            />
                        </div>
                        {!isEmpty && <span className='text-red-500'>모든 필드를 입력하세요.</span>}
                        <div>
                            <input 
                                type='submit'
                                value='로그인'
                                className='w-full mt-16 h-24 max-h-12 text-xl bg-blue-600 text-white rounded-md'
                            />
                            <div className='flex justify-end mt-4'>
                                <button 
                                    type='button'
                                    onClick={() => navigate('/register')}>
                                    회원가입 →
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}


export default Login