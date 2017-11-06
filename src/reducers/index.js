
import { combineReducers } from 'redux';

import nav from './nav';
import user from './user';
import photo from './photo';

export default combineReducers({
  nav,
  user,
  photo,
});
