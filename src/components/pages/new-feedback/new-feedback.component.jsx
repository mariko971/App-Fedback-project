import React, {useState} from "react";
import { withRouter } from "react-router";

import "./new-feedback.style.scss";

const NewFeedbackForm = (props) => {
  const [category, setCategory] = useState('');
  const [dropdown, toggleDropdown] = useState({open:false, class: ''});
  const [value, setValue] = useState('');

  const handleClick = (option)=>{
    setCategory(option);
    toggleDropdown({open:false, class: ''});
  };

  const toggleOptions = ()=>{
    if(!dropdown.open){
      toggleDropdown({open:true, class: 'open'});
    } else {
      toggleDropdown({open:false, class: ''});
    }      
  };

  const handleChange = (e)=> setValue(e.target.value);

  const checkSelected = cat => category===cat ? 
    <p>
      <img src="/assets/shared/icon-check.svg" alt="checked icon" />
    </p>
    :
    null;  

  return (
    <div className="new-feedback-container">
      <div className="back-link" onClick={() => props.history.push("/")}>
        <img
          src="/assets/shared/icon-arrow-left.svg"
          alt="left arrow"
          className="back-link-arrow"
        />
        <span className="back-link-txt">Go Back</span>
      </div>
      <div className="new-feedback">
        <div className="new-feedback-icon">
          <img src="/assets/shared/icon-new-feedback.svg" alt="icon" />
        </div>
        <h1 className="new-feedback-header">Create New Feedback</h1>
        <div className="new-feedback-input title">
          <p className="title">Feedback Title</p>
          <p className="txt">Add a short, descriptive headline</p>
          <input type="text" name="feedback title" className="feedback-title" />
        </div>
        <div className="new-feedback-input category">
          <p className="title">Category</p>
          <p className="txt">Choose a category for your feedback</p>
          <div className="category-input" onClick={()=>toggleOptions()}>
            <p className="category-input-txt">
              {category}
            </p>
            <p className="dropdown-arrow">
              <img src="/assets/shared/icon-arrow-down.svg" alt="drop down arrow" />
            </p>
          </div>
          <ul className={`category-dropdown ${dropdown.class}`}>
            <li className="category-option" onClick={()=>handleClick('Feature')}>
              <p>Feature</p>
              {
                checkSelected('Feature')
              }
            </li>
            <li className="category-option" onClick={()=>handleClick('UI')}>
              <p>UI</p>
              {
                checkSelected('UI')
              }
            </li>
            <li className="category-option" onClick={()=>handleClick('UX')}>
              <p>UX</p>
              {
                checkSelected('UX')
              }
            </li>
            <li className="category-option" onClick={()=>handleClick('Enhancement')}>
              <p>Enhancement</p>
              {
                checkSelected('Enhancement')
              }
            </li>
            <li className="category-option" onClick={()=>handleClick('Bug')}>
              <p>Bug</p>
              {
                checkSelected('Bug')
              }
            </li>
          </ul>
        </div>
        <div className="new-feedback-input">
          <p className="title">Feedback Detail</p>
          <p className="txt">
            Include any specific comments on what should be improved, added,
            etc.
          </p>
          <textarea value={value} onChange={handleChange}></textarea>
          <div className="new-feedback-buttons">            
            <p className="feedback-btn add-btn">
              Add Feedback
            </p>
            <p className="feedback-btn cancel-btn" onClick={() => props.history.push("/")}>
              Cancel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(NewFeedbackForm);
