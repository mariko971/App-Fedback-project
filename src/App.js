import React from 'react';
import { Route } from 'react-router';

import './App.css';
import SuggestionsPage from './components/pages/suggestions-page/suggestions-page.component';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={SuggestionsPage}/>
    </div>
  );
};

export default App;