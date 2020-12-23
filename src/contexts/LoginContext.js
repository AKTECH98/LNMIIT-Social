import React,{useState} from 'react'

const LoginContext = React.createContext()


function LoginProvider({children}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword]= useState(null);

  return (
    <LoginContext.Provider value={{'email':email,'setEmail':setEmail,'password':password,'setPassword':setPassword}}>
        {children}
    </LoginContext.Provider>
  )
}
export {LoginProvider}
export default LoginContext


/*
Example use case
import LoginContext from 'filepath';
        <LoginContext.Consumer>
        {
          (data)=>{
            return <div>email is {data.email} and password is {data.password}</div>
          }
        }
        </LoginContext.Consumer>
*/