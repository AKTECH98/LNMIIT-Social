import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import SingleFileUpload from './SingleFileUpload';
import Button from './Button';
import Grid from './Grid';
import GridItem from './GridItem';

function PhotoSelector(props)
{

    const [crop, setCrop]=useState({ aspect: props.aspectRatio});
    const [src, setSrc]=useState(null);
    const [inputImage, setInputImage]=useState(null);

    const {
      returnValue
    } = props;

    return(<Grid>
                <GridItem large={6} medium={6} small={12}>
                      <SingleFileUpload accept="image/*"
                                        text="Click here to upload image"
                                        returnValue={(file)=>{
                                            if(file==null)
                                            {
                                              setSrc(null);
                                              setInputImage(null);
                                            }
                                            else {
                                              const reader = new FileReader();
                                              reader.addEventListener('load', () =>
                                                {
                                                  setSrc(reader.result);
                                                  setInputImage(file);
                                                }
                                              );
                                              reader.readAsDataURL(file);
                                            }
                                        }}
                      />
                </GridItem>
                <GridItem large={6} medium={6} small={12}>
                {
                  (src == null)?'':

                    <Button
                       text='Submit'
                       onClick={()=>{
                                 returnValue(crop, inputImage);
                                 setSrc(null);
                                 setInputImage(null);
                               }}
                     />
                }
                </GridItem>
                <GridItem large={12} medium={12} small={12}>

                      <ReactCrop
                        src={src}
                        crop={crop}
                        onChange={(newCrop) =>{
                            setCrop(newCrop)
                          }}
                     />

               </GridItem>
          </Grid>

    );
}


PhotoSelector.propTypes = {
  //For states
  aspectRatio:PropTypes.number.isRequired,

  //For rendering
  returnValue: PropTypes.func.isRequired
};

export default PhotoSelector;
