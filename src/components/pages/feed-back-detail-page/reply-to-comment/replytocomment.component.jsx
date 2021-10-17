import React, {useState} from "react";
import { connect } from "react-redux";

import './replytocomment.style.scss';
import { replyToCommentAction } from "../../../../redux/actions/appData.action";
import { toggleReply } from "../../../utils";
import { replyToCommentFire } from "../../../../firebase/firebase.utils";
import { newComments } from "../../../utils";

const ReplyToComment = ({username, currentUser, productRequests, commentID, requestID, reply, setReply})=>{

    const [value, setValue] = useState('');
    const handleChange = (e)=> setValue(e.target.value);
    
    const newReply ={
        content: value,
        replyingTo: username,
        user: {
                name: currentUser.name,
                image: currentUser.image,
                username: currentUser.username
            }
    };

    const handleSubmit = ()=>{
        replyToCommentFire(parseInt(requestID), newComments(newReply,productRequests,commentID,requestID));
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
    currentUser: state.appData.currentUser,
    productRequests: state.appData.productRequests
});

export default connect(mapStateToProps,mapDispatchToProps)(ReplyToComment);