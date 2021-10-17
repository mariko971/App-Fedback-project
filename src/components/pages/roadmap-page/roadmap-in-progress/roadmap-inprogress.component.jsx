import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import './roadmap-inprogress.style.scss';
import { commentsCount } from '../../../utils';
import { upvoteActionFire } from '../../../../firebase/firebase.utils';


const RoadmapInProgress = (props)=>{
    const {id,title, description, category, upvotes, comments, productRequests, currentUser} = props;
    const voted = currentUser.votes.includes(`${id}`) ? 'voted' : '';
    const request = productRequests.findIndex(req=>req.id===id);
    const voteAction = ()=> !voted ?  upvoteActionFire(productRequests[request]) : null;
    
      
    return(
        <div className="inprogress">            
            <div className="inprogress-suggestion progress">            
                <div className={`inprogress-suggestion-upvote ${voted}`}onClick={()=>voteAction()}>
                    <div className="inprogress-suggestion-upvote-arrow">
                    </div>               
                    <p className="inprogress-suggestion-upvote-votes">{upvotes}</p> 
                </div>
                <p className="inprogress-suggestion-status progress-clr">In-Progress</p>
                <div className="inprogress-suggestion-main">
                    <h3 className='inprogress-suggestion-main-title'>
                        {title}
                    </h3>
                    <p className='inprogress-suggestion-main-txt'>
                        {description}
                    </p>
                    <p className='inprogress-suggestion-main-topic body-3'>
                        {category}
                    </p>
                </div>
                <div className="inprogress-suggestion-comments">
                    <img className="inprogress-suggestion-comments-icon" src="/assets/shared/icon-comments.svg" alt="comments" />
                    <p className="inprogress-suggestion-comments-count">{commentsCount(comments)}</p>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state =>({
    productRequests: state.appData.productRequests,
    currentUser: state.appData.currentUser
});
export default connect(mapStateToProps)(withRouter(RoadmapInProgress));