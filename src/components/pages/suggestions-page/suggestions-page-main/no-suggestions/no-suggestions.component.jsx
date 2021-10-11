import React from 'react';
import { withRouter } from 'react-router';

import './no-suggestions.style.scss';

const Emptysuggestions = (props)=>{

      const {history} = props;  
    return(
        <div className="no-suggestions">
            <div className="no-suggestions-icon">
                <img src="assets/suggestions/illustration-empty.svg" alt="empty illustration" />
            </div>
            <h3 className='no-suggestions-title'>There is no feedback yet.</h3>
            <p className='no-suggestions-txt'>
                Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.
            </p>
            <p className="no-suggestions-btn suggestions-header-btn" onClick={()=>history.push('new-feedback')}>+ Add Feedback</p>

        </div>
    )
}

export default withRouter(Emptysuggestions);