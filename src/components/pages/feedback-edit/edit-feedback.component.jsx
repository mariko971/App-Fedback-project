import React, { useState } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import "./edit-feedback.style.scss";
import { editFeedbackAction, deleteFeedbackAction } from "../../../redux/actions/appData.action";
import { deleteFeedbackFire, editFeedbackFire } from "../../../firebase/firebase.utils";

const FeedbackEditForm = (props) => {
  const {
    appData: { productRequests },
    match: {
      params: { requestID },
    },
    history
  } = props;

  const feedback = productRequests.filter(
    (request) => request.id === parseInt(requestID)
  );
  const request = feedback[0];
  const [category, setCategory] = useState(`${request.category}`);
  const [dropdown, toggleDropdown] = useState({ open: false, class: "" });
  const [status, setStatus] = useState(`${request.status}`);
  const [stat, toggleStatus] = useState({ open: false, class: "" });
  const [editDescription, setDescription] = useState(`${request.description}`)
  const [editTitle, setTitle] = useState(`${request.title}`)

  const handleClick = (option) => {
    setCategory(option);
    toggleDropdown({ open: false, class: "" });
  };

  const statusHandleClick = (option) => {
    setStatus(option);
    toggleStatus({ open: false, class: "" });
  };

  const toggleOptions = () => {
    if (!dropdown.open) {
      toggleDropdown({ open: true, class: "open" });
    } else {
      toggleDropdown({ open: false, class: "" });
    }
  };

  const toggleStatusOptions = () => {
    if (!stat.open) {
      toggleStatus({ open: true, class: "open" });
    } else {
      toggleStatus({ open: false, class: "" });
    }
  };


   
    const checkSelected = (option,opt) =>option === opt ? opt : null;

    const editedFeedback ={
      title:editTitle,
      category:category,
      status:status,
      description:editDescription,
    };

    const requestId = request.id;

    const handleSubmit = ()=>{
      editFeedbackFire(requestId,editedFeedback);
      history.push(`/feedback/${requestID}`);
   }

   const deleteSubmit = ()=>{
     deleteFeedbackFire(requestId);
     history.push('/');
   }

   const handleTitleChange = e => setTitle(e.target.value);
   const handleDescriptionChange = e => setDescription(e.target.value);

  return (
    <div className="edit-feedback-container">
      <div
        className="edit-back-link"
        onClick={() => history.push(`/feedback/${requestID}`)}
      >
        <img
          src="/assets/shared/icon-arrow-left.svg"
          alt="left arrow"
          className="edit-back-link-arrow"
        />
        <span className="edit-back-link-txt">Go Back</span>
      </div>
      <div className="edit-feedback">
        <div className="edit-feedback-icon">
          <img src="/assets/shared/icon-edit-feedback.svg" alt="icon" />
        </div>
        <h1 className="edit-feedback-header">{`Editing '${request.title}'`}</h1>
        <div className="edit-feedback-input title">
          <p className="title">Feedback Title</p>
          <p className="txt">Add a short, descriptive headline</p>
          <input
            type="text"
            name="feedback title"
            className="edit-feedback-title"
            value={editTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div className="edit-feedback-input category">
          <p className="title">Category</p>
          <p className="txt">Choose a category for your feedback</p>
          <div className="category-input" onClick={() => toggleOptions()}>
            <p className="category-input-txt">{category}</p>
            <p className="dropdown-arrow">
              <img
                src="/assets/shared/icon-arrow-down.svg"
                alt="drop down arrow"
              />
            </p>
          </div>
          <ul className={`category-dropdown ${dropdown.class}`}>
            <li
              className="category-option"
              onClick={() => handleClick("feature")}>
              <p>Feature</p>
              <p className={`check ${checkSelected(category,'feature')}`}>
                <img src="/assets/shared/icon-check.svg" alt="checked icon" />
              </p>
              {/* {checkSelected("Feature")} */}
            </li>
            <li className="category-option" onClick={() => handleClick("ui")}>
              <p>UI</p>
              <p className={`check ${checkSelected(category,'ui')}`}>
                <img src="/assets/shared/icon-check.svg" alt="checked icon" />
              </p>
            </li>
            <li className="category-option" onClick={() => handleClick("ux")}>
              <p>UX</p>
              <p className={`check ${checkSelected(category,'ux')}`}>
                <img src="/assets/shared/icon-check.svg" alt="checked icon" />
              </p>
            </li>
            <li
              className="category-option"
              onClick={() => handleClick("enhancement")}
            >
              <p>Enhancement</p>
              <p className={`check ${checkSelected(category,'enhancement')}`}>
                <img src="/assets/shared/icon-check.svg" alt="checked icon" />
              </p>
            </li>
            <li className="category-option" onClick={() => handleClick("bug")}>
              <p>Bug</p>
              <p className={`check ${checkSelected(category,'bug')}`}>
                <img src="/assets/shared/icon-check.svg" alt="checked icon" />
              </p>
            </li>
          </ul>
        </div>
        <div className="edit-feedback-input category">
          <p className="title">Update Status</p>
          <p className="txt">Change feature state</p>
          <div className="category-input status-input" onClick={() => toggleStatusOptions()}>
            <p className="category-input-txt">{status}</p>
            <p className="dropdown-arrow">
              <img
                src="/assets/shared/icon-arrow-down.svg"
                alt="drop down arrow"
              />
            </p>
          </div>
          <ul className={`category-dropdown status-dropdown ${stat.class}`}>
            <li
              className="category-option"
              onClick={() => statusHandleClick("suggestion")}
            >
              <p>Suggestion</p>
              <p className={`check ${checkSelected(status,'suggestion')}`}>
                <img src="/assets/shared/icon-check.svg" alt="checked icon" />
              </p>
            </li>            
            <li className="category-option" onClick={() => statusHandleClick("planned")}>
              <p>Planned</p>
              <p className={`check ${checkSelected(status,'planned')}`}>
                <img src="/assets/shared/icon-check.svg" alt="checked icon" />
              </p>
            </li>
            <li
              className="category-option"
              onClick={() => handleClick("in-progress")}
            >
              <p>In-Progress</p>
              <p className={`check ${checkSelected(status,'in-progress')}`}>
                <img src="/assets/shared/icon-check.svg" alt="checked icon" />
              </p>
            </li>
            <li className="category-option" onClick={() => statusHandleClick("live")}>
              <p>Live</p>
              <p className={`check ${checkSelected(status,'live')}`}>
                <img src="/assets/shared/icon-check.svg" alt="checked icon" />
              </p>
            </li>
          </ul>
        </div>
        <div className="edit-feedback-input">
          <p className="title">Feedback Detail</p>
          <p className="txt">
            Include any specific comments on what should be improved, added,
            etc.
          </p>
          <textarea name="description" value={editDescription} onChange={handleDescriptionChange}></textarea>
          <div className="edit-feedback-buttons">
            <p className="edit-feedback-btn add-btn" onClick={()=>handleSubmit()}>Save Changes</p>
            <p
              className="edit-feedback-btn cancel-btn"
              onClick={() => history.push(`/feedback/${requestID}`)}
            >
              Cancel
            </p>
            <p className="edit-feedback-btn delete-btn" onClick={()=>deleteSubmit()}>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  appData: state.appData,
});

const mapDispatchToProps = dispatch =>({
  editFeedbackAction: (id,request) => dispatch(editFeedbackAction(id,request)),
  deleteFeedbackAction: id => dispatch(deleteFeedbackAction(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FeedbackEditForm));
