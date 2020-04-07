import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

import GlobalVariables from 'WebsiteMainFiles/GlobalVariables.js';
import TextField from './TextField.js';
import Grid from './Grid';
import GridItem from './GridItem';
import Button from './Button'

class SingleFileUpload extends React.Component
{
  constructor(props){
    super(props);
    this.state={
      files: null,
      fileName: null,
    };
  }

  render()
  {
    const {
      text,
      returnValue,
      accept,
    } = this.props;

    const labelStyling = {
      borderRadius: '4px',
      padding: '6px 16px',
      backgroundColor: GlobalVariables.colors.neutral,
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
                            let files = event.target.files
                            this.setState({files:files})
                            this.setState({fileName:files[0].name})
                            returnValue(files[0])
                        }}
                />
                {text}
            </label>
            <Button
              text="X"
              onClick={()=>{
                this.setState({files:null})
                this.setState({fileName:null})
                returnValue(null)
              }}
            />

      </GridItem>
      <GridItem large={6} medium={6} small={6}>
          {(this.state.fileName==null)?'No image selected':this.state.fileName}
      </GridItem>
      </Grid>
    );
  }
}


SingleFileUpload.propTypes = {
  //For states

  //For rendering
  text: PropTypes.string.isRequired,
  returnValue: PropTypes.func.isRequired,
  accept: PropTypes.string.isRequired,
};

export default SingleFileUpload;
