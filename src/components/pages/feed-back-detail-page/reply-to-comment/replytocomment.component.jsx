import React, {useState} from "react";
import { connect } from "react-redux";

import './replytocomment.style.scss';
import { replyToCommentAction } from "../../../../redux/actions/appData.action";
import { toggleReply } from "../../../utils";

const ReplyToComment = ({username, currentUser, commentID, requestID, replyToCommentAction, reply, setReply})=>{
    const [value, setValue] = useState('');
    const handleChange = (e)=> setValue(e.target.value);
    
    const newReply ={
        content: value,
        replyingTo: username,
        user: currentUser
    };

    const ids={
        requestID: parseInt(requestID),
        commentID: commentID
    };


    const handleSubmit = ()=>{
        replyToCommentAction(ids, newReply)
        setValue('');
        toggleReply(reply,setReply);
     };

    return(
        <form className="reply-to-comment">
            <textarea name="reply" value={value} onChange={handleChange}></textarea>
            <p className="post-reply-btn" onClick={()=>handleSubmit()}>
                Post Reply
            </p>
      </form>
    )
};

const mapDispatchToProps = dispatch =>({
    replyToCommentAction: (id,comment)=> dispatch(replyToCommentAction(id,comment))
});

const mapStateToProps = state =>({
    currentUser: state.appData.currentUser
});

export default connect(mapStateToProps,mapDispatchToProps)(ReplyToComment);