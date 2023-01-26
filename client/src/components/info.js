import React , {useContext , useState , useEffect} from 'react';
import { useNavigate  } from 'react-router-dom';
import { UserContext } from '../context';

export default function Info() {
    const [info, setInfo] = useState([]);
    console.log(info);

    const navigate = useNavigate();

    const{user , setUser} = useContext(UserContext)

    let onlineUser = JSON.parse(localStorage.getItem('onlineUser')).user_id;

    useEffect(() => {
        const getInfo = async () => {
            const data = await fetch(`http://localhost:8000/users/${onlineUser}/`);
            const response = await data.json();
            console.log(response);
            setInfo(response);
        }

        getInfo()


    }, [])


    
    return (
        <>
        {info.length > 0 && 
        <div className='infoContainer' >
            <h1>{user} info: </h1>
            <h3>Username: {info[0].username}</h3>
            <h3>user id: {info[0].user_id}</h3>
            <h3>phone: {info[0].phone}</h3>
            <h3>full name: {info[0].full_name}</h3>
            <h3>email: {info[0].email}</h3>
            <h3>city: {info[0].city}</h3>
            <h3>address: {info[0].address}</h3> 
        </div>
        }
        </>
    )
}