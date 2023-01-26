import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context';
import { Link, useParams, useNavigate, Outlet } from 'react-router-dom';

export default function HomePage() {

    const { user, setUser } = useContext(UserContext)
    // const { username } = useParams()
    const navigate = useNavigate()
    // const userlocal = JSON.parse(localStorage.getItem('onlineUser'));

    // const userloclUserName = userlocal.username

    const logOut = () => {
        localStorage.removeItem('onlineUser');
        navigate('/')
    }

    let onlineUser = JSON.parse(localStorage.getItem('onlineUser'))

    useEffect(() => {
        setUser(onlineUser.username)
    }, [user])


    return (
        <>
            <div className='navContainer'>
                <h3>hello , {user} </h3>

                <Link
                    to={`/${user}/homePage`}
                    className="btn">info</Link>

                <Link
                    to={`/${user}/todos`}
                    className="btn">ToDo List</Link>

                <Link
                    to={`/${user}/homePage/posts`}
                    className="btn">posts</Link>


                <button
                    onClick={logOut}
                    className="btn">Log out</button>

            </div>
            <div className='page'>
                <Outlet />
            </div>
        </>
    )
}