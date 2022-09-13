import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('main', () => {
  const chosenCity = ref('Tbilisi');

  function setChosenCity(value) {
    chosenCity.value = value;
  }
  return {
    chosenCity,
    setChosenCity,
  };
});
