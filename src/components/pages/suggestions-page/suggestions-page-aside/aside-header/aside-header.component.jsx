import React, { Component } from 'react';

import './aside-header.style.scss';

class AsideHeader extends Component{
   
    render(){
        const {openMenu, handleClick}=this.props;
        return(
        <div className="aside-header">
            <div className="aside-header__info">
                <h3 className="aside-header__title">
                    Frontend Mentor
                    </h3>
                <p>Feedback Board</p>
            </div>
            <div className='aside-header-menu' onClick={()=>handleClick()}>
                <span className={`aside-header-menu__btn ${openMenu}`}>
                </span>
            </div>
        </div>
        )
    }
}

export default AsideHeader;