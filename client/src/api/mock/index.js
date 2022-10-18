import { placesTbilisi, eventsTbilisi, cities } from './data';

const fetch = (mockData, time = 300) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const returned = {};
      returned.json = () => Promise.resolve(mockData);
      resolve(returned);
    }, time);
  });
};

export default {
  getPlacesByCity(cityName) {
    if (cityName === 'Tbilisi') {
      return fetch(placesTbilisi);
    }
    if (cityName === 'Moscow') {
      return fetch([]);
    }
    return fetch({
      error: "This city doesn't exist",
      message: "This city doesn't exist",
      code: 500,
    });
  },
  getEventsByCity(cityName) {
    if (cityName === 'Tbilisi') {
      return fetch(eventsTbilisi);
    }
    if (cityName === 'Moscow') {
      return fetch([]);
    }
    return fetch({
      error: "This city doesn't exist",
      message: "This city doesn't exist",
      code: 500,
    });
  },
  getCities() {
    return fetch(cities);
  },
};
