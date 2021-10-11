import React from 'react';
import { connect } from 'react-redux';

import './suggestions-aside.style.scss';
import AsideHeader from './aside-header/aside-header.component';
import AsideFilter from './aside-filter/aside-filter.component';
import AsideRoadmap from './aside-roadmap/aside-roadmap.component';

class SuggestionsAside extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showMenu: false,
            openMenu: ''
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){ 
        if(!this.state.showMenu){
           this.setState({
            showMenu: true,
            openMenu: 'open'
           })
        } else {
            this.setState({
                showMenu: false,
                openMenu: ''
               })
        }
    } 

   render(){ 
       const {appData} = this.props;
       return (
        <div className={`aside-main-wrapper ${this.state.openMenu}`}>
            <div className="aside_main">
                <AsideHeader openMenu={this.state.openMenu} handleClick ={this.handleClick} />               
            </div>
            <div className={`aside-secondary-wrapper ${this.state.openMenu}`}>
                <div className={`aside-secondary ${this.state.openMenu}`}>
                    <div className="aside-secondary-header">
                        <h3 className="aside-secondary-header-title">
                            Frontend Mentor
                        </h3>
                        <p>Feedback Board</p>
                    </div>
                <AsideFilter openMenu={this.state.openMenu} handleClick ={this.handleClick} />
                <AsideRoadmap data={appData.productRequests}/>
                </div>
            </div>
        </div>
    )}
}

const mapStateToProps = state =>({
    appData: state.appData,
});

export default connect(mapStateToProps)(SuggestionsAside);