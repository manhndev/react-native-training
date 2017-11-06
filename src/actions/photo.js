import { HOST } from '../constants';
import { normalizePhotos } from '../utils';
import { resetRoute } from './nav';

export const SET_PHOTOS = 'SET_PHOTOS';
export const UPLOAD_PHOTO = 'UPLOAD_PHOTO';
export const ADD_PHOTO = 'ADD_PHOTO';

export function setPhotos(photos) {
  return {
    type: SET_PHOTOS,
    photos
  }
}

export function setPhoto(photo) {
  return {
    type: ADD_PHOTO,
    photo
  }
}

export function addPhoto(data) {
  return (dispatch, getState) => {
    return () => {
      setPhoto(photo);
    }
  }
}

export function getPhotos(photos) {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken;
    return fetch(`${HOST}/api/v1/photos?access_token=${accessToken}`)
    .then(response => response.json())
    .then(json => {
      dispatch(setPhotos(normalizePhotos(json.photos)));
    })
    .catch(e => alert(e));
  }
}

export function favorite(photoID) {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken;

    const config = {
      method: 'POST'
    }

    return fetch(`${HOST}/api/v1/favorites/${photoID}?access_token=${accessToken}`, config)
    .then(response => response.json())
    .then(json => {
      alert('Added')
    })
    .catch(e => alert(e));
  }
}

export function uploadPhoto(avatarSource, text, description, accessToken) {
  return (dispatch) => {
    let data = new FormData()
    if (avatarSource.uri) {
      data.append('photo[images]', {uri: avatarSource.uri, name: 'image.jpg', type: 'image/jpg'})
    }
    data.append('photo[title]', text)
    data.append('photo[description]', description)
    data.append('access_token', accessToken)
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    }

    return fetch(`${HOST}/api/v1/upload`, config)
    .then(response => response.json())
    .then(json => {
      if (!json.success) {
        alert(json.error);
      }
    })
    .catch(e => alert(e));
  }
}
