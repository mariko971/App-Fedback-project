import React,{useEffect, useState} from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import './App.css';
import SuggestionsPage from './components/pages/suggestions-page/suggestions-page.component';
import NewFeedbackForm from './components/pages/new-feedback/new-feedback.component';
import FeedbackDetailPage from './components/pages/feed-back-detail-page/feedback-detail.component';
import FeedbackEditForm from './components/pages/feedback-edit/edit-feedback.component';
import RoadmapPage from './components/pages/roadmap-page/roadmap.component';
import { firestore} from './firebase/firebase.utils';
import { updateRequestsAction, updateCurrentUserAction } from './redux/actions/appData.action';
import WithSpinner from './components/with-spinner/with-spinner.component';

function App(props) {
  const [loading, isLoading] = useState(true);
  const {updateRequestsAction, updateCurrentUserAction} = props;
  const SuggestionsPageWithSpinner = WithSpinner(SuggestionsPage);
  const RoadmapPageWithSpinner = WithSpinner(RoadmapPage);
  const FeedbackDetailPageWithSpinner = WithSpinner(FeedbackDetailPage);
  const FeedbackEditFormWithSpinner = WithSpinner(FeedbackEditForm);
  
  useEffect(()=>{
    const currentUserRef = firestore.collection('user');
    currentUserRef.onSnapshot(async snapshot=>{
      const currentUserMap = snapshot.docs.reduce((acc,obj)=>{ return acc={...obj.data()}},{});
      updateCurrentUserAction(currentUserMap);
    });
  });

  useEffect(()=>{
    const collectionRef = firestore.collection('productRequests');
    collectionRef.onSnapshot(async snapshot=>{
      const collectionMap = snapshot.docs.map(doc=>doc.data());
      updateRequestsAction(collectionMap);
      isLoading(false);
    });
  });




  return (
    <div className="App">
      <Route exact path='/' render={ props => <SuggestionsPageWithSpinner isLoading={loading} {...props}/>}/>
      <Route exact path='/new-feedback' component = {NewFeedbackForm}/>
      <Route exact path='/feedback/:requestID' render={ props => <FeedbackDetailPageWithSpinner isLoading={loading} {...props}/>}/>
      <Route  path='/feedback/:requestID/edit' render={ props => <FeedbackEditFormWithSpinner isLoading={loading} {...props}/>}/>
      <Route  path='/roadmap' render={ props => <RoadmapPageWithSpinner isLoading={loading} {...props}/>}/>
    </div>
  );
};

const mapDispatchToProps= dispatch => ({
  updateRequestsAction: requests => dispatch(updateRequestsAction(requests)),
  updateCurrentUserAction: user => dispatch(updateCurrentUserAction(user))
})
export default connect(null,mapDispatchToProps)(App);