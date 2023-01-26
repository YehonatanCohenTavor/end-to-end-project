import React, { useState } from 'react';
import Comments from './comments';

function Post(props) {
    const [commentsDisplay, setCommentsDisplay] = useState(false);

    const showComments = () => {
        setCommentsDisplay(prev => !prev);
    }

    return (
        <div className='post'>
            <p>{props.body}</p>
            {commentsDisplay && <Comments post_id={props.post_id} />}
            <button onClick={showComments}>{commentsDisplay ? 'Show less' : 'Comments'}</button>
        </div>
    );
}

export default Post;