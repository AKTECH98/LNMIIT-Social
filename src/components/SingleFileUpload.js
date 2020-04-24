import React,{useState} from 'react';
import PropTypes from "prop-types";

import Button from './Button'

const SingleFileUpload = (props) => {

  const [files,setFiles]=useState(null);
  const [fileName,setFileName]=useState(null);

  const {
    text,
    returnValue,
    accept,
  } = props;

  const inputStyling ={
    width: '0.1px',
	  height: '0.1px',
  	opacity: 0,
  	overflow: 'hidden',
  	position: 'absolute',
  	zIndex: -1
  }

  return(
    <div className = "fileupload">
      <div className = "fileupload__image">
      <label className = "button--link fileupload--link">
        <input 
          type="file"
          accept={accept}
          style={inputStyling}
          onChange={(event)=>{
            let file = event.target.files
            setFiles(file)
            setFileName(file[0].name)
            returnValue(file[0])
          }}  
        />
        {text}
      </label>
      </div>
      <div>
      {
        (fileName==null)?'No Image Selected':
        <Button
          text="X"
          onClick={()=>{
            setFiles(null)
            setFileName(null)
            returnValue(null)
          }}
          type = "button__delete"
        />
      }
      </div>
    </div>
  );
}


SingleFileUpload.propTypes = {
  //For states

  //For rendering
  text: PropTypes.string.isRequired,
  returnValue: PropTypes.func.isRequired,
  accept: PropTypes.string.isRequired,
};

export default SingleFileUpload;