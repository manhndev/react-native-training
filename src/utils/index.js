import { HOST } from '../constants';

export function normalizePhotos(photos) {
  return photos.map(photo => {
    return {
      id: photo.id || '',
      title: photo.title || '',
      description: photo.description || '',
      image: `https:${photo.image}` || '',
      owner: photo.owner ? {
        email: photo.owner.email || '',
        image: photo.owner.image || ''
      } : {
        email: '',
        image: '',
      },
      isFavorite: photo.did_i_like,
    }
  })
}

export function normalizeMessage(message) {
    return {
      id: message.id || '',
      title: message.title || '',
      description: message.description || '',
      image: `https:${message.image}` || '',
      owner: message.owner ? {
        email: message.owner.email || '',
        image: message.owner.image || ''
      } : {
        email: '',
        image: '',
      },
      isFavorite: message.did_i_like,
    }
}

export function normalizeProfile(email, image) {
  return {
    email: email || '',
    avatar: image || '',
  }
}
