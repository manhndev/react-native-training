import { HOST } from '../constants';
import { resetRoute } from './nav';
import { normalizeProfile } from '../utils';

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_PROFILE = 'SET_PROFILE';


export function setAccessToken(accessToken) {
  return {
    type: SET_ACCESS_TOKEN,
    accessToken,
  };
}

export function setProfile(profile) {
  return {
    type: SET_PROFILE,
    profile,
  };
}

export function loginWithFacebook(facebookAccessToken) {
  return (dispatch) => {
    return fetch(`${HOST}/api/v1/facebook`, {
      method: 'POST',
      body: JSON.stringify({
        facebook_access_token: facebookAccessToken,
      }),
      headers: { "content-type": "application/json" },
    })
    .then(response => response.json())
    .then(json => {
      if (json.access_token) {
        dispatch(setAccessToken(json.access_token));
        dispatch(setProfile(normalizeProfile(json.email, json.image)));
        dispatch(resetRoute({ routeName: 'Main' }));
      } else {
        alert(json.error);
      }
    })
    .catch(e => alert(e));
  };
}

export function logout() {
  return (dispatch, getState) => {
    dispatch(setAccessToken(null));
    dispatch(setProfile(null));
    dispatch(resetRoute({ routeName: 'AuthenticationScreen' }));
  };
}
