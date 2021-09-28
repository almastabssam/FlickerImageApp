const axios = require('axios');

export const getImageList = data => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=11c40ef31e4961acf4f98c8ff4e945d7&format=json&nojsoncallback=1&text=kittens',
      )
      .then(response => {
        // console.log('API success response', response);
        resolve(response);
      })
      .catch(error => {
        // console.log('API Error', error);
        reject(error);
      });
  });
};
