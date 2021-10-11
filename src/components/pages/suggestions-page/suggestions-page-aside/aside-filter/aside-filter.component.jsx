import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import './aside-filter.style.scss';
import { filterSuggestions } from '../../../../../redux/actions/filters.action';


const AsideFilter = (props)=>{
    const {filterSuggestions, handleClick} = props;
    const [active, setActive]= useState(JSON.parse(window.localStorage.getItem('active'))||{activeFilter: 'all'});
    const filterHandleClick =(filter)=>{
        filterSuggestions(filter);
        handleClick();
        setActive({activeFilter:filter});
    }
    const checkSelected = (option,opt) =>option === opt ? option : '';

    useEffect(()=>{
        setActive(JSON.parse(window.localStorage.getItem('active')))
    },[]);

    useEffect(()=>{
        window.localStorage.setItem('active', JSON.stringify(active))
    },[active]);

    return(
    <div className="aside-filter">
        <p className={`aside-filter-link ${checkSelected('all',active.activeFilter)}`} onClick={()=>filterHandleClick('all')}>All</p>
        <p className={`aside-filter-link ${checkSelected('ui',active.activeFilter)}`} onClick={()=>filterHandleClick('ui')}>UI</p>
        <p className={`aside-filter-link ${checkSelected('ux',active.activeFilter)}`} onClick={()=>filterHandleClick('ux')}>UX</p>
        <p className={`aside-filter-link ${checkSelected('enhancement',active.activeFilter)}`} onClick={()=>filterHandleClick('enhancement')}>Enhancement</p>
        <p className={`aside-filter-link ${checkSelected('bug',active.activeFilter)}`} onClick={()=>filterHandleClick('bug')}>Bug</p>
        <p className={`aside-filter-link ${checkSelected('feature',active.activeFilter)}`} onClick={()=>filterHandleClick('feature')}>Feature</p>
    </div>
)}


const mapDispatchToProps = (dispatch)=>({
    filterSuggestions: (filter) => dispatch(filterSuggestions(filter))
})

export default connect(null, mapDispatchToProps)(AsideFilter);