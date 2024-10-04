import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import axi from '../../utils/axios/Axios';
import { useState } from 'react';

export default function Register() {
    const navigate = useNavigate();
    const [getName, setName] = useState('');
    const [getId, setId] = useState('');
    const [getPwd, setPwd] = useState('');
    const [getPwdChk, setPwdChk] = useState('');
    const [isCorrect, setCorrect] = useState(true);
    const [isEmpty, setEmpty] = useState(true);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (getName === '' || getId === '' || getPwd === '' || getPwdChk === '') {
            setEmpty(!isEmpty)
            return;
        }
        if (getPwd !== getPwdChk) {
            setCorrect(!isCorrect);
            return;
        }

        const data = {
            username: getName,
            password: getPwd,
            email: getId
        }

        try {
            const response: AxiosResponse = await axi.post("/register", JSON.stringify(data));
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
                            value={getName}
                            onChange={e => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            name="id"
                            placeholder='아이디'
                            className='w-full mt-2 h-12 max-h-8 border rounded-md'
                            value={getId}
                            onChange={event => setId(event.target.value)}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder='비밀번호'
                            className='w-full mt-2 h-12 max-h-8 rounded-md'
                            value={getPwd}
                            onChange={e => setPwd(e.target.value)}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder='비밀번호 확인'
                            className='w-full mt-2 h-12 max-h-8 rounded-md'
                            value={getPwdChk}
                            onChange={e => setPwdChk(e.target.value)}
                        />
                        {!isCorrect && <span className='text-red-500'>비밀번호가 다릅니다. 비밀번호를 확인하세요.</span>}
                        {!isEmpty && <span className='text-red-500'>모든 필드를 입력하세요.</span>}
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
