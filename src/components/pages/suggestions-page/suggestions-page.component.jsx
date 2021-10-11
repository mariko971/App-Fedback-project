import React from 'react';

import './suggestions-page.style.scss';
import SuggestionsAside from './suggestions-page-aside/suggestions-aside.component';
import SuggestionsMain from './suggestions-page-main/suggestions-main.component';

const SuggestionsPage = ()=>{   
        
    return(
        <div className="suggestions-page-wrapper">
            <SuggestionsAside/>
            <SuggestionsMain/>
        </div>
    )
};

export default SuggestionsPage;