import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';

export default defineStore('main', () => {
  const chosenCity = useLocalStorage('chosenCity', null, {
    serializer: StorageSerializers.object,
  });
  function setChosenCity(value) {
    chosenCity.value = value;
  }

  const eventsPopupVisibility = ref(false);
  function setEventsPopupVisibility(value) {
    eventsPopupVisibility.value = value;
  }

  const eventInfoPopupVisibility = ref(false);
  function setEventInfoPopupVisibility(value) {
    eventInfoPopupVisibility.value = value;
  }

  const standardFilters = reactive([
    {
      id: 'lectures',
      value: 'Lectures',
      color: '#D4E09B',
      isActive: true,
    },
    {
      id: 'shows',
      value: 'Shows',
      color: '#E5EAB7',
      isActive: true,
    },
    {
      id: 'parties',
      value: 'Parties',
      color: '#F6F4D2',
      isActive: true,
    },
    {
      id: 'trips',
      value: 'Trips',
      color: '#CBDFBD',
      isActive: true,
    },
    {
      id: 'custom',
      value: 'Custom',
      color: '#DEBE9B',
      isActive: true,
    },
    {
      id: 'exhibitions',
      value: 'Exhibitions',
      color: '#F19C79',
      isActive: true,
    },
  ]);

  function changeFilterIsActive(id) {
    const findedFilter = standardFilters.find((sFilter) => sFilter.id === id);
    findedFilter.isActive = !findedFilter.isActive;
  }

  const places = ref([]);
  function setPlaces(value) {
    places.value = value;
  }
  const events = ref([]);
  const eventsWithPlace = ref([]);
  const eventsWithCoords = ref([]);
  function setEvents(value) {
    eventsWithPlace.value = value.filter((event) => event.place);
    eventsWithCoords.value = value.filter((event) => !event.place);
    events.value = value;
  }

  const activeFilters = computed(() =>
    standardFilters.filter((fil) => fil.isActive).map((fil) => fil.id)
  );

  const filteredEvents = computed(() => {
    return events.value.filter((event) =>
      activeFilters.value.includes(event.type)
    );
  });

  const filteredEventsWithPlace = computed(() => {
    return filteredEvents.value.filter((event) => event.place);
  });

  const filteredEventsWithCoords = computed(() => {
    return filteredEvents.value.filter((event) => !event.place);
  });

  return {
    chosenCity,
    setChosenCity,
    eventsPopupVisibility,
    setEventsPopupVisibility,
    eventInfoPopupVisibility,
    setEventInfoPopupVisibility,
    standardFilters,
    changeFilterIsActive,
    places,
    setPlaces,
    eventsWithPlace,
    eventsWithCoords,
    setEvents,
    filteredEvents,
    filteredEventsWithPlace,
    filteredEventsWithCoords,
  };
});
