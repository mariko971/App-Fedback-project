import React, {useState} from "react";

import './feedbackcomment.style.scss';
import CommentReply from "../feedback-comment-reply/comment-reply.component";
import ReplyToComment from "../reply-to-comment/replytocomment.component";
import { toggleReply } from "../../../utils";

const FeedbackComment = (props)=>{
    const {id,content, user: {image, name, username}, replies, requestID } = props;
    const [reply, setReply] = useState('');
    return(
        <div className="comment">
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
            <p className='comment-txt'>{content}</p>
            <div className={`feedback-reply-to ${reply}`}>
                <ReplyToComment commentID={id} requestID={requestID} username={username} reply={reply} setReply={setReply}/>
            </div>
            {
                replies ? replies.map(
                    
                    reply=> <CommentReply key={replies.indexOf(reply)} commentID={id} requestID={requestID} {...reply}/>
                ) 
                :
                null
            }
            
        </div>
    )
}

export default FeedbackComment;

