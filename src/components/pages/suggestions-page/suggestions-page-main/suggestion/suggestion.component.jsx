import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import './suggestion.style.scss';
import { commentsCount } from '../../../../utils';
import { upvoteActionFire } from '../../../../../firebase/firebase.utils';

const Suggestion = (props)=>{
    const {id, title, description, category, upvotes, comments, productRequests, currentUser} = props;
    const voted = currentUser.votes.includes(id.toString()) ? 'voted' : '';
    const request = productRequests.findIndex(req=>req.id===id);

    const voteAction = ()=> !voted ? upvoteActionFire(productRequests[request]) : null;
    
    return(
        <div className="suggestion-container" >
            <div className={`suggestion-upvote-top ${voted}`} onClick={()=>voteAction()}>
                <div className="suggestion-upvote-top-arrow">
                </div>  
                <p className="suggestion-upvote-top-votes">{upvotes}</p> 
            </div>
            <div className="suggestion-main" onClick={()=>props.history.push(`/feedback/${id}`)}>
                <h3 className='suggestion-main-title'>
                    {title}
                </h3>
                <p className='suggestion-main-txt'>
                    {description}
                </p>
                <p className='suggestion-main-topic body-3'>
                    {category==='ux'||category==='ui' ? category.toUpperCase() : category}
                </p>
            </div>
            <div className="suggestion-footer">
                <div className={`suggestion-upvote ${voted}`} onClick={()=>voteAction()}>
                    <div className="suggestion-upvote-arrow">
                    </div>  
                    <p className="suggestion-upvote-votes">{upvotes}</p> 
                </div>
                <div className="suggestion-comments">
                    <img className="suggestion-comments-icon" src="/assets/shared/icon-comments.svg" alt="comments" />
                    <p className="suggestion-comments-count">{commentsCount(comments)}</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state =>({
    productRequests: state.appData.productRequests,
    currentUser: state.appData.currentUser
});
export default connect(mapStateToProps)(withRouter(Suggestion));