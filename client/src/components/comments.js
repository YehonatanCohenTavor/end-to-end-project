import React, { useState, useEffect } from 'react';

function Comments(props) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/posts/${props.post_id}/comments`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setComments(data);
        })
    },[])

    return ( 
        <div className='commentsContainer'>
            {comments.map(comment => {
                return <p key={comment.comment_id} className='comment'>{comment.body}</p>
            })}
        </div>
     );
}

export default Comments;