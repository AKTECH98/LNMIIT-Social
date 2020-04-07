import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import SingleFileUpload from './SingleFileUpload';
import Button from './Button';
import Grid from './Grid';
import GridItem from './GridItem';

class PhotoSelector extends React.Component
{
  constructor(props){
    super(props);
    this.state={
      crop:{ aspect: props.aspectRatio},
      src: null,
      inputImage:null,

    };

  }
  render()
  {
    const {
      returnValue
    } = this.props;

    return(<Grid>
                <GridItem large={6} medium={6} small={12}>
                      <SingleFileUpload accept="image/*"
                                        text="Click here to upload image"
                                        returnValue={(file)=>{
                                            if(file==null)
                                            {
                                              this.setState({ src: null });
                                              this.setState({ inputImage: null});
                                            }
                                            else {
                                              const reader = new FileReader();
                                              reader.addEventListener('load', () =>
                                                {
                                                  this.setState({ src: reader.result });
                                                  this.setState({ inputImage: file});
                                                }
                                              );
                                              reader.readAsDataURL(file);
                                            }
                                        }}
                      />
                </GridItem>
                <GridItem large={6} medium={6} small={12}>
                {
                  (this.state.src == null)?'':

                    <Button
                       text='Submit'
                       onClick={()=>{
                                 returnValue(this.state.crop, this.state.inputImage);
                                 this.setState({ src: null });
                                 this.setState({ inputImage: null});
                               }}
                     />
                }
                </GridItem>
                <GridItem large={12} medium={12} small={12}>

                      <ReactCrop
                        src={this.state.src}
                        crop={this.state.crop}
                        onChange={(newCrop) =>{
                            this.setState({crop:newCrop})
                          }}
                     />

               </GridItem>
          </Grid>

    );
  }
}


PhotoSelector.propTypes = {
  //For states
  aspectRatio:PropTypes.number.isRequired,

  //For rendering
  returnValue: PropTypes.func.isRequired
};

export default PhotoSelector;
