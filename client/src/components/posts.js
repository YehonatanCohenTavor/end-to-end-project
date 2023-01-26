import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context';
import Post from './singlePost';



function Posts() {
    const [posts, setPosts] = useState([]);
    const [textarea, setTextarea] = useState('');

    const user_id = JSON.parse(localStorage.getItem('onlineUser')).user_id;

    useEffect(() => {
        fetch(`http://localhost:8000/posts?user_id=${user_id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPosts(data);
            })
    }, [])

    const createPost = () => {
        fetch('http://localhost:8000/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ body: textarea, user_id: user_id })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPosts(prev=>[...prev,data[0]])
            })
    }

    return (
        <div className='postsContainer'>
            <div className='addPost'>
                <textarea value={textarea}
                    onChange={(e) => setTextarea(e.target.value)}
                    cols="30" rows="6"
                ></textarea>
                <button onClick={createPost}>Post</button>
            </div>
            {posts.map(post => {
                return <Post key={post.post_id}
                    body={post.body}
                    post_id={post.post_id} />
            })}
        </div>
    );
}

export default Posts;
