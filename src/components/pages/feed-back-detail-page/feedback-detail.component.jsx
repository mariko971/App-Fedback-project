
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { commentsCount } from '../../utils';

import Suggestion from '../suggestions-page/suggestions-page-main/suggestion/suggestion.component';
import FeedbackComment from './feed-back-comments/feed-back-comments.components';
import AddCommentForm from './add-comment/add-comment.component';
import './feedback-detail.style.scss';

const FeedbackDetailPage = (props)=>{
    const {match: {params: {requestID}}, appData: {productRequests}} = props;
    const [requestData] = productRequests.filter(request=> request.id===parseInt(requestID));

    return (
      <div className="feedback-page">
        <div className="feedback-page-header">
          <div
            className="feedback-page-header-back"
            onClick={() => props.history.push("/")}
          >
            <div className="back-link">
              <img
                src="/assets/shared/icon-arrow-left.svg"
                alt="left arrow"
                className="back-link-arrow"
              />
              <span className="back-link-txt">Go Back</span>
            </div>
          </div>
          <p className="feedback-page-header-btn button" onClick={() => props.history.push(`${props.match.url}/edit`)} >
            Edit Feedback
          </p>
        </div>
        <Suggestion {...requestData} />
        <div className="comments-container">
          <p className="comments-total">{`${commentsCount(requestData.comments)} Comments`}</p>
          {              
             requestData.comments.map(comment=>{
                const {id} = comment;
                return (<FeedbackComment key={id} requestID={requestID} {...comment}/>)
              }
              ) 
          }
        </div>
        <AddCommentForm requestID={requestData.id}/>
      </div>
    );
};

const mapStateToProps= state =>({
    appData: state.appData
});

export default connect(mapStateToProps)(withRouter(FeedbackDetailPage));