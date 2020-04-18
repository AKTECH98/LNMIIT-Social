import React,{useState} from 'react';

export const ColorsContext = React.createContext(null);

export function ColorsProvider(props){
  const [textDefault,setTextDefault] = useState("#000000");
  const [textSuccess,setTextSuccess] = useState("#29aae2");
  const [textFailure,setTextFailure] = useState("#f26631");

  const [objectDefault,setObjectDefault] = useState("#000000");
  const [objectSuccess,setObjectSuccess] = useState("#29aae2");
  const [objectFailure,setObjectFailure] = useState("#f26631");

  const [background,setBackground] = useState("#aaaaaa");
  const [foreground,setForeground] = useState("#ddeeff");

  const returnValue={
    textDefault:textDefault,
    setTextDefault:setTextDefault,
    textSuccess:textSuccess,
    setTextSuccess:setTextSuccess,
    textFailure:textFailure,
    setTextFailure:setTextFailure,

    objectDefault:objectDefault,
    setObjectDefault:setObjectDefault,
    objectSuccess:objectSuccess,
    setObjectSuccess:setObjectSuccess,
    objectFailure:objectFailure,
    setObjectFailure:setObjectFailure,

    background:background,
    setBackground:setBackground,
    foreground:foreground,
    setForeground:setForeground
  }

  return(
    <ColorsContext.Provider value={returnValue}>
      {props.children}
    </ColorsContext.Provider>
  );
}
