import React from 'react';
import { connect } from 'react-redux';


import './suggestions-main.style.scss';
import Suggestion from './suggestion/suggestion.component';
import SuggestionsHeader from './suggestion-header/suggestions-header.component';
import Emptysuggestions from './no-suggestions/no-suggestions.component';
import { filterRequests } from '../../../utils';


const SuggestionsMain = (props)=> {
    const {appData: {productRequests}, suggestionsFilter: {filter}} =props;
    const requestsData = filter==='all' ? productRequests : filterRequests(productRequests,filter);
        return(
            <div className='suggestion-main-wrapper'>
                <SuggestionsHeader/>
                <div className="suggestion-wrap">
                    { 
                        requestsData.length===0 ? <Emptysuggestions/>
                        :
                        requestsData.map((request)=>{
                            return (
                            <Suggestion key={request.id} {...request}/>
                            );
                        })
                    }
                </div>
            </div>
    );
}

const mapStateToProps = state =>({
    appData: state.appData,
    suggestionsFilter: state.suggestionsFilter,
});
export default connect(mapStateToProps)(SuggestionsMain);