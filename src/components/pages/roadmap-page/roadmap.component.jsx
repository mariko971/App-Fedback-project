import React, { useState } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import "./roadmap.style.scss";
import RoadmapInProgress from "./roadmap-in-progress/roadmap-inprogress.component";
import RoadmapPlanned from "./roadmap-planned/roadmap-planned.component";
import RoadmapLive from "./roadmap-live/roadmap-live.component";

const RoadmapPage = (props) => {
  const [status, setStatus] = useState("in-progress");
  const {
    appData: { productRequests },
  } = props;

  const getRequests = (status) =>
    productRequests.filter((request) => request.status === status);
  const checkStatus = (option, opt) => (option === opt ? opt : null);
  const plannedCount = getRequests("planned").length;
  const liveCount = getRequests("live").length;
  const inprogressCount = getRequests("in-progress").length;

  const roadmapRequests = getRequests(status);
  const count = roadmapRequests.length;
  const render = () => {    
      switch (status) {
        case "in-progress": {
          return (
            <>
              <div className="roadmap-requests-header">
                <h2 className="roadmap-requests-header-h2">
                  In-Progress ({count})
                </h2>
                <p className="roadmap-requests-header-txt">
                  Features currently being developed
                </p>
              </div>
              {roadmapRequests.map((request) => (
                <RoadmapInProgress key={request.id} {...request} />
              ))}
            </>
          );
        }
        case "live": {
          return (
            <>
              <div className="roadmap-requests-header">
                <h2 className="roadmap-requests-header-h2">Live ({count})</h2>
                <p className="roadmap-requests-header-txt">Released features</p>
              </div>
              {roadmapRequests.map((request) => (
                <RoadmapLive key={request.id} {...request} />
              ))}
            </>
          );
        }
        case "planned": {
          return (
            <>
              <div className="roadmap-requests-header">
                <h2 className="roadmap-requests-header-h2">
                  Planned ({count})
                </h2>
                <p className="roadmap-requests-header-txt">
                  Ideas prioritized for research
                </p>
              </div>
              {roadmapRequests.map((request) => (
                <RoadmapPlanned key={request.id} {...request} />
              ))}
            </>
          );
        }
        default:
          return null;
      }    
    };
  
  return (
    <div className="roadmap">
      <div className="roadmap-header">
        <div className="roadmap-header-back">
          <div className="back-link" onClick={() => props.history.push(`/`)}>
            <img
              src="/assets/shared/icon-arrow-left.svg"
              alt="left arrow"
              className="back-link-arrow"
            />
            <span className="back-link-txt">Go Back</span>
          </div>
          <p className="roadmap-header-title">Roadmap</p>
        </div>
        <p
          className="button roadmap-header-btn"
          onClick={() => props.history.push("new-feedback")}
        >
          + Add Feedback
        </p>
      </div>
      <div className="roadmap-nav">
        <div
          className={`roadmap-nav-link ${checkStatus(status, "planned")}`}
          onClick={() => setStatus("planned")}
        >
          <p>{`Planned (${plannedCount})`}</p>
        </div>
        <div
          className={`roadmap-nav-link ${checkStatus(status, "in-progress")}`}
          onClick={() => setStatus("in-progress")}
        >
          <p>{`In-Progress (${inprogressCount})`}</p>
        </div>
        <div
          className={`roadmap-nav-link ${checkStatus(status, "live")}`}
          onClick={() => setStatus("live")}
        >
          <p>{`Live (${liveCount})`}</p>
        </div>
      </div>
      <div className="roadmap-requests-mobile">{render()}</div>
      <div className="roadmap-requests-big">
        <div className="roadmap-request-planned">
          <div className="roadmap-requests-header">
            <h2 className="roadmap-requests-header-h2">
              Planned ({plannedCount})
            </h2>
            <p className="roadmap-requests-header-txt">
              Ideas prioritized for research
            </p>
          </div>
          {getRequests("planned").map((request) => (
            <RoadmapPlanned key={request.id} {...request} />
          ))}
        </div>
        <div className="roadmap-request-inprogress">
          <div className="roadmap-requests-header">
            <h2 className="roadmap-requests-header-h2">
              In-Progress ({inprogressCount})
            </h2>
            <p className="roadmap-requests-header-txt">
              Features currently being developed
            </p>
          </div>
          {getRequests("in-progress").map((request) => (
            <RoadmapInProgress key={request.id} {...request} />
          ))}
        </div>
        <div className="roadmap-request-live">
          <div className="roadmap-requests-header">
            <h2 className="roadmap-requests-header-h2">Live ({liveCount})</h2>
            <p className="roadmap-requests-header-txt">Released features</p>
          </div>
          {getRequests("live").map((request) => (
            <RoadmapLive key={request.id} {...request} />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  appData: state.appData,
  suggestionsFilter: state.suggestionsFilter,
});

export default connect(mapStateToProps)(withRouter(RoadmapPage));
