import React,{useState} from 'react';

export const UserContext = React.createContext(null);

export function UsersProvider(props){

  const [emailId,setEmailId] = useState(null);
  const [privateKey,setPrivateKey]=useState(null);
  const [publicKey,setPublicKey]=useState(null);

  const returnValue={
    emailId:emailId,
    setEmailId:setEmailId,
    privateKey:privateKey,
    setPrivateKey:setPrivateKey,
    publicKey:publicKey,
    setPublicKey:setPublicKey
  }

  return(
    <UserContext.Provider value={returnValue}>
      {props.children}
    </UserContext.Provider>
  );
}
