import React from 'react';
import { Route } from 'react-router';

import './App.css';
import SuggestionsPage from './components/pages/suggestions-page/suggestions-page.component';
import NewFeedbackForm from './components/pages/new-feedback/new-feedback.component';
import FeedbackDetailPage from './components/pages/feed-back-detail-page/feedback-detail.component';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={SuggestionsPage}/>
      <Route exact path='/new-feedback' component = {NewFeedbackForm}/>
      <Route exact path='/feedback/:requestID' component = {FeedbackDetailPage}/>
    </div>
  );
};

export default App;