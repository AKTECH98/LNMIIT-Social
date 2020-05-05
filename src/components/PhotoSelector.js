import React,{useState} from 'react';
import PropTypes from "prop-types";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import SingleFileUpload from './SingleFileUpload';
import Button from './Button';

import DefaultUser from '../img/DefaultUser.png';

function PhotoSelector(props)
{
  const [crop, setCrop]=useState({ aspect: props.aspectRatio});
  const [src, setSrc]=useState(null);
  const [inputImage, setInputImage]=useState(null);
  const [displayImage, setDisplayImage]=useState(DefaultUser);

  const {
    returnValue
  } = props;

  return(
    <div>
      <img src={displayImage}/>
      <SingleFileUpload
        accept="image/*"
        text="Change"
        returnValue={(file)=>{
          if(file==null){
            setSrc(null);
            setInputImage(null);
            setDisplayImage(DefaultUser);
          }
          else{
            const reader = new FileReader();
            reader.addEventListener('load', () =>{
                setSrc(reader.result);
                setInputImage(file);
              }
            );
            reader.readAsDataURL(file);
          }
        }}
      />

      <div>
      {
        (src == null)?'':
        <Button
          text='Submit'
          onClick={()=>{
            returnValue(crop, inputImage);
            setDisplayImage(src);
            setSrc(null);
            setInputImage(null);

          }}
        />
      }
      </div>
      <div>
        <ReactCrop
          src={src}
          crop={crop}
          onChange={(newCrop) =>{
            setCrop(newCrop)
          }}
        />

      </div>
    </div>
  );
}


PhotoSelector.propTypes = {
  //For states
  aspectRatio:PropTypes.number.isRequired,

  //For rendering
  returnValue: PropTypes.func.isRequired
};

export default PhotoSelector;
