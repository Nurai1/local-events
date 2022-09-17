import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';

export default defineStore('main', () => {
  const chosenCity = ref('Tbilisi');
  const eventsPopupVisibility = ref(false);
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

  function setChosenCity(value) {
    chosenCity.value = value;
  }

  function setEventsPopupVisibility(value) {
    eventsPopupVisibility.value = value;
  }

  const buildings = ref([]);
  function setBuildings(value) {
    buildings.value = value;
  }
  const events = ref([]);
  function setEvents(value) {
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
  return {
    chosenCity,
    setChosenCity,
    eventsPopupVisibility,
    setEventsPopupVisibility,
    standardFilters,
    changeFilterIsActive,
    buildings,
    setBuildings,
    events,
    setEvents,
    filteredEvents,
  };
});
