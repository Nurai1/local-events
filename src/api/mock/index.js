import { buildings, events, cities } from './data';

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
  getBuildings() {
    return fetch(buildings);
  },
  getEvents() {
    return fetch(events);
  },
  getCities() {
    return fetch(cities);
  },
};
