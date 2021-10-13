import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import './roadmap-inprogress.style.scss';
import { commentsCount } from '../../suggestions-page/suggestions-page-main/suggestion/suggestion.component';
import { upvoterAction } from '../../../../redux/actions/upvote.action';



const RoadmapInProgress = (props)=>{
    const {id,title, description, category, upvotes, comments, appDataReducer} = props;
    
    return(
        <div className="inprogress">            
            <div className="inprogress-suggestion progress">            
                <div className="inprogress-suggestion-upvote" onClick={()=>appDataReducer(id)}>
                    <div className="inprogress-suggestion-upvote-arrow">
                    <img  src="/assets/shared/icon-arrow-up.svg" alt="up arrow"/>
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
}

const mapDispatchToProps = dispatch =>({
    appDataReducer: id => dispatch(upvoterAction(id))
    });

export default connect(null,mapDispatchToProps)(withRouter(RoadmapInProgress));