import React, {useState} from "react";
import { connect } from "react-redux";

import './add-comment.style.scss';
import { postCommentAction } from "../../../../redux/actions/appData.action";

const AddCommentForm = ({requestID,postCommentAction,currentUser, productRequests})=>{
    
    const [value, setValue] = useState('');

    const newID= ()=>{
        const feedback = productRequests.find(feed=>feed.id===requestID);
        return  Math.max(...feedback.comments.map(req=>req.id))+1;
    }

    const newComment ={
        id:newID(),
        content: value,
        user: currentUser,
    };

    const handleChange = (e)=> setValue(e.target.value);

    const handleSubmit = ()=>{
       postCommentAction(requestID,newComment);
       setValue('');
    }
    return(
        <div className="add-comment" onSubmit={handleSubmit}>
            <h3>Add Comment</h3>
            <textarea name="comment" value={value} onChange={handleChange} placeholder='Type your comment here'></textarea>
            <div className="add-comment-footer">
                <p className="footer-txt">250 Characters left</p>
                <p className="footer-btn" onClick={()=>handleSubmit()}>Post Comment</p>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch =>({
    postCommentAction: (id,comment)=> dispatch(postCommentAction(id,comment))
});
const mapStateToProps = state =>({
    currentUser: state.appData.currentUser,
    productRequests: state.appData.productRequests
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentForm);