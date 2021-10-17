import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import './roadmap-planned.style.scss';
import { commentsCount } from '../../../utils';
import { upvoteActionFire } from '../../../../firebase/firebase.utils';


const RoadmapPlanned = (props)=>{
    const {id,title, description, category, upvotes, comments, productRequests, currentUser} = props;

    const voted = currentUser.votes.includes(`${id}`) ? 'voted' : '';
    const request = productRequests.findIndex(req=>req.id===id);
    const voteAction = ()=> !voted ?  upvoteActionFire(productRequests[request]) : null;
    
    return(
        <div className="planned">            
            <div className="planned-suggestion planned">            
                <div className={`planned-suggestion-upvote ${voted}`} onClick={()=>voteAction()}>
                    <div className="planned-suggestion-upvote-arrow">
                    </div>               
                    <p className="planned-suggestion-upvote-votes">{upvotes}</p> 
                </div>
                <p className="planned-suggestion-status planned-clr">Planned</p>
                <div className="planned-suggestion-main">
                    <h3 className='planned-suggestion-main-title'>
                        {title}
                    </h3>
                    <p className='planned-suggestion-main-txt'>
                        {description}
                    </p>
                    <p className='planned-suggestion-main-topic body-3'>
                        {category}
                    </p>
                </div>
                <div className="planned-suggestion-comments">
                    <img className="planned-suggestion-comments-icon" src="/assets/shared/icon-comments.svg" alt="comments" />
                    <p className="planned-suggestion-comments-count">{commentsCount(comments)}</p>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state =>({
    productRequests: state.appData.productRequests,
    currentUser: state.appData.currentUser
});

export default connect(mapStateToProps)(withRouter(RoadmapPlanned));