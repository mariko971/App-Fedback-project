import React from 'react';
import { withRouter } from 'react-router';

import './aside-roadmap.style.scss';

const AsideRoadmap = ({data, history})=>{
    const inProgressRequests = [];
    const liveRequests = [];
    const plannedRequests = [];
     data.map(
        request=>{ 
            if(request.status === 'in-progress'){ 
                return inProgressRequests.push(request);
            }else if(request.status === 'live') {
                return liveRequests.push(request); 
            } else if(request.status === 'planned'){
                return plannedRequests.push(request);
            } else return null;       
        }
    );
    
    return (
    <div className="aside-roadmap">
        <div className="aside-roadmap-header">
            <h4>Roadmap</h4>
            <p className="view-link" onClick={()=>history.push('roadmap')}>View</p>
        </div>
        <div className="aside-body">
            <div className="aside-body-type">
                <p className="aside-body-type-txt planned-clr">Planned</p>
                <p className="aside-body-type-qty">{plannedRequests.length}</p>
            </div>
            <div className="aside-body-type">
                <p className="aside-body-type-txt inPorgress-clr">In-Progress</p>
                <p className="aside-body-type-qty">{inProgressRequests.length}</p>
            </div>
            <div className="aside-body-type">
                <p className="aside-body-type-txt live-clr">Live</p>
                <p className="aside-body-type-qty">{liveRequests.length}</p>
            </div>
            
        </div>
    </div>
)}

export default withRouter(AsideRoadmap);