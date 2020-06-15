import {backendServerUrl} from '../WebsiteMainFiles/config.js'

export const postRequest = (api, parameters, processResponse)=>{
  const url = backendServerUrl + api
  const request = {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify(parameters)
  }
  fetch(url,request).then(res => res.json()).then(json=>processResponse(json))


}
