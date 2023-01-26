import React , {useContext , useState} from 'react';
import { useNavigate  } from 'react-router-dom';
import { UserContext } from '../context';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const{user , setUser} = useContext(UserContext)

    const handleSubmit  = async (e) => {
        e.preventDefault();
        const data = await fetch('http://localhost:8000/users/login', {
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                username:username,
                password: password
            })
        })
        const json = await data.json();
        console.log(json);
        if(json){
            localStorage.setItem('onlineUser', JSON.stringify({username:json[0].username , user_id:json[0].user_id}))
            setUser(json[0].username);
            navigate(`/${user}/homePage`);
        }else{
            alert('user not found')
        }

    }

    return (
        <div className='formContainer'>
            <h1> login </h1>
            <form onSubmit={handleSubmit}>
                <label>username</label>
                <input type='text' name='username' value={username} onChange={e => setUsername(e.target.value)} />
                <label>password</label>
                <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
                <div className='loginBtns'>
                    <button type='submit'>submit</button>
                </div>
            </form>
        </div>
    )
}

