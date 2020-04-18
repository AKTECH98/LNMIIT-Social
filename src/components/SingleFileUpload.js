import React,{useState,useContext} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

import TextField from './TextField.js';
import Grid from './Grid';
import GridItem from './GridItem';
import Button from './Button'

function SingleFileUpload(props)
{

    const [files,setFiles]=useState(null);
    const [fileName,setFileName]=useState(null);

    const {
      text,
      returnValue,
      accept,
    } = props;

    const labelStyling = {
      borderRadius: '4px',
      padding: '6px 16px',
      //backgroundColor: useContext(ColorsContext).objectDefault,
      display: 'inline-block',
      cursor: 'pointer'
    };

    const inputStyling ={
      width: '0.1px',
	    height: '0.1px',
    	opacity: 0,
    	overflow: 'hidden',
    	position: 'absolute',
    	zIndex: -1
    }

    return(
      <Grid>
      <GridItem large={6} medium={6} small={6}>
            <label style={labelStyling}>
                <input type="file"
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
            <Button
              text="X"
              onClick={()=>{
                setFiles(null)
                setFileName(null)
                returnValue(null)
              }}
            />

      </GridItem>
      <GridItem large={6} medium={6} small={6}>
          {(fileName==null)?'No image selected':fileName}
      </GridItem>
      </Grid>
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
