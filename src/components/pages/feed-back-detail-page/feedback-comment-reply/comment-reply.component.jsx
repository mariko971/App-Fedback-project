import React, {useState} from "react";

import './comment-reply.style.scss';
import ReplyToComment from "../reply-to-comment/replytocomment.component";
import { toggleReply } from "../../../utils";


const CommentReply = (props)=>{
    const {content, replyingTo, user: {image, name, username}, commentID, replies,requestID} = props;

    const [reply, setReply] = useState('');

    return(
        <div className="comment-reply">
            <div className="comment-header">
                <div className="author">
                    <div className="author-avatar" style={{background: (`url(${image}) no-repeat center/cover`)}}>
                    </div>
                    <div className="author-profile">
                        <p className="author-profile-name">{name}</p>
                        <p className="author-profile-username">@{username}</p>
                    </div>
                </div>
                <p className="reply" onClick={()=>toggleReply(reply,setReply)}>Reply</p>
            </div>
            <p className='comment-txt'><span className='reply-to'>
                @{replyingTo}</span> {content}
            </p>
            {
                replies ? replies.map(
                    
                    reply=> <CommentReply key={replies.indexOf(reply)} commentID={commentID} requestID={requestID} {...reply}/>
                ) 
                :
                null
            }
            <div className={`comment-reply-to ${reply}`}>
                <ReplyToComment username={username} commentID={commentID} requestID={requestID} reply={reply} setReply={setReply}/>
            </div> 
        </div>
    )
};



export default CommentReply;