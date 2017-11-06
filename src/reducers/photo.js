import { SET_PHOTOS, UPLOAD_PHOTO, ADD_PHOTO } from '../actions/photo';

const initialState = {
  photos: [],
  photo: null,
}

export default function(state = initialState, action) {
  if (action.type == SET_PHOTOS) {
    return {
      ...state,
      photos: action.photos
    }
  }

  if (action.type == UPLOAD_PHOTO) {
    return {
      ...state,
      photos: action.photos
    }
  }

  if (action.type == ADD_PHOTO) {
      return {
       ...state,
       photos: state.photos.concat(action.photo)
     }
  }

  return state;
}
