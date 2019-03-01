import { getUserToken, deleteUserToken } from './userService.jsx';
import { ApiRootUrl } from './../urlService.jsx';

export function callPost(url, model){
    const requestOpts = {
        method: 'POST',
        body: JSON.stringify(model),
    };

    return executeRequest(url, requestOpts);
}

export function callGet(url) {
    const requestOpts = {
        method: 'GET',
        mode: 'cors'
    };

    return executeRequest(url, requestOpts);
}

async function executeRequest(url, requestOpts) {
    requestOpts.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Host': 'localhost:44391',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
        // 'credentials': 'same-origin',
    };
    const token = getUserToken();
    if (token) {
        requestOpts.headers.Authorization = token;
    }
    else{
        window.location.href = 'https://localhost:44391/account/login?logout=false';
        return Promise.reject("401");
    }

    let response = await fetch(ApiRootUrl + url, requestOpts);
    
    if (!response.ok) {
        if(response.status == 401){
          deleteUserToken();
          return Promise.reject("401");
        }

      return Promise.reject(response.statusText);
    }

    let result = await response.json();
    if (result && result.Error) {
      return Promise.reject(result.Error);
    }

    return result;
  }
