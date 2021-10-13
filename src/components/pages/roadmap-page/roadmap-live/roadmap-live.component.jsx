import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import './roadmap-live.style.scss';

import { commentsCount } from '../../suggestions-page/suggestions-page-main/suggestion/suggestion.component';
import { upvoterAction } from '../../../../redux/actions/upvote.action';



const RoadmapLive = (props)=>{
    const {id,title, description, category, upvotes, comments, appDataReducer} = props;
    
    return(
        <div className="live">            
            <div className="live-suggestion live">            
                <div className="live-suggestion-upvote" onClick={()=>appDataReducer(id)}>
                    <div className="live-suggestion-upvote-arrow">
                    <img  src="/assets/shared/icon-arrow-up.svg" alt="up arrow"/>
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

const mapDispatchToProps = dispatch =>({
    appDataReducer: id => dispatch(upvoterAction(id))
    });

export default connect(null,mapDispatchToProps)(withRouter(RoadmapLive));