import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import './suggestion.style.scss';
import { upvoterAction } from '../../../../../redux/actions/upvote.action';

export const commentsCount = (comments)=>{
    let count = 0;
    if(comments && comments.length>0){
        comments.map((comment)=>
            Object.keys(comment).includes('replies') ?                 
             count = comments.length + comment.replies.length
             : count = comments.length
            );
        return count;
    } else return count;
}

const Suggestion = (props)=>{
    const {id, title, description, category, upvotes, comments, appDataReducer} = props;
    
    return(
        <div className="suggestion-container" >
            <div className="suggestion-upvote" onClick={()=>appDataReducer(id)}>
                <img  src="/assets/shared/icon-arrow-up.svg" alt="up arrow"/>
                <p className="suggestion-upvote-votes">{upvotes}</p> 
            </div>
            <div className="suggestion-main" onClick={()=>props.history.push(`/feedback/${id}`)}>
                <h3 className='suggestion-main-title'>
                    {title}
                </h3>
                <p className='suggestion-main-txt'>
                    {description}
                </p>
                <p className='suggestion-main-topic body-3'>
                    {category}
                </p>
            </div>
            <div className="suggestion-comments">
                <img className="suggestion-comments-icon" src="/assets/shared/icon-comments.svg" alt="comments" />
                <p className="suggestion-comments-count">{commentsCount(comments)}</p>
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch =>({
appDataReducer: id => dispatch(upvoterAction(id))
});

export default connect(null, mapDispatchToProps)(withRouter(Suggestion));