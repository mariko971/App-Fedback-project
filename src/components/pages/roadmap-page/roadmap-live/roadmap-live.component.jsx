import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import './roadmap-live.style.scss';

import { commentsCount } from '../../../utils';
import { upvoteActionFire } from '../../../../firebase/firebase.utils';


const RoadmapLive = (props)=>{
    const {id,title, description, category, upvotes, comments, productRequests, currentUser} = props;

    const voted = currentUser.votes.includes(`${id}`) ? 'voted' : '';
    const request = productRequests.findIndex(req=>req.id===id);
    const voteAction = ()=> !voted ?  upvoteActionFire(productRequests[request]) : null;
    
    return(
        <div className="live">            
            <div className="live-suggestion live">            
                <div className={`live-suggestion-upvote ${voted}`} onClick={()=>voteAction()}>
                    <div className="live-suggestion-upvote-arrow">
                    </div>               
                    <p className="live-suggestion-upvote-votes">{upvotes}</p> 
                </div>
                <p className="live-suggestion-status live-clr">Live</p>
                <div className="live-suggestion-main">
                    <h3 className='live-suggestion-main-title'>
                        {title}
                    </h3>
                    <p className='live-suggestion-main-txt'>
                        {description}
                    </p>
                    <p className='live-suggestion-main-topic body-3'>
                        {category}
                    </p>
                </div>
                <div className="live-suggestion-comments">
                    <img className="live-suggestion-comments-icon" src="/assets/shared/icon-comments.svg" alt="comments" />
                    <p className="live-suggestion-comments-count">{commentsCount(comments)}</p>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state =>({
    productRequests: state.appData.productRequests,
    currentUser: state.appData.currentUser
});
export default connect(mapStateToProps)(withRouter(RoadmapLive));