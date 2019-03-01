import {getCookie, deleteCookie} from './cookieService.jsx';

export function getUserToken() {
   const userToken = getCookie('tkn');
   return userToken;
}

export function deleteUserToken() {
   deleteCookie('tkn');
}