import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';

export default defineStore('main', () => {
  const chosenCity = useLocalStorage(
    'chosenCity',
    // убрать на null когда расширится список городов
    { value: 'Тбилиси', country: 'Грузия' },
    {
      serializer: StorageSerializers.object,
    }
  );
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

  const eventsCategories = ref([]);
  function setEventsCategories(val) {
    eventsCategories.value = val;
  }

  function changeFilterIsActive(id) {
    const findedFilter = eventsCategories.value.find(
      (sFilter) => sFilter.id === id
    );
    findedFilter.isActive = !findedFilter.isActive;
  }

  const priceRange = ref(null);
  function changePriceRange(range) {
    priceRange.value = range;
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

  const maxPriceFilter = computed(() => {
    return events.value.reduce((acc, ev) => {
      if (ev.price > acc) {
        return ev.price;
      }
      return acc;
    }, 0);
  });

  const dateTimeRangeFilter = reactive([]);

  const activeFilters = computed(() =>
    eventsCategories.value.filter((fil) => fil.isActive).map((fil) => fil.value)
  );

  const filteredEvents = computed(() => {
    return events.value.filter(
      (event) =>
        activeFilters.value.some((filterName) =>
          event.categories.items.some(
            (eventCategory) => eventCategory.value === filterName
          )
        ) &&
        (!priceRange.value ||
          (event.price >= priceRange.value[0] &&
            event.price <= priceRange.value[1])) &&
        (!dateTimeRangeFilter[0] ||
          new Date(event.eventDate).getTime() >= dateTimeRangeFilter[0]) &&
        (!dateTimeRangeFilter[1] ||
          new Date(event.eventDate).getTime() <= dateTimeRangeFilter[1])
    );
  });

  const filteredEventsWithPlace = computed(() => {
    return filteredEvents.value.filter((event) => event.place);
  });

  const filteredEventsWithCoords = computed(() => {
    return filteredEvents.value.filter((event) => !event.place);
  });

  const chosenEvent = ref({});
  function setChosenEvent(value) {
    chosenEvent.value = value;
  }

  // any events by place or by coordinates
  const eventsByPoint = ref(null);
  function setEventsByPoint(value) {
    eventsByPoint.value = value;
  }

  return {
    chosenCity,
    setChosenCity,
    eventsPopupVisibility,
    setEventsPopupVisibility,
    eventInfoPopupVisibility,
    setEventInfoPopupVisibility,
    eventsCategories,
    setEventsCategories,
    changeFilterIsActive,
    priceRange,
    changePriceRange,
    places,
    setPlaces,
    eventsWithPlace,
    eventsWithCoords,
    setEvents,
    filteredEvents,
    filteredEventsWithPlace,
    filteredEventsWithCoords,
    chosenEvent,
    setChosenEvent,
    eventsByPoint,
    setEventsByPoint,
    maxPriceFilter,
    dateTimeRangeFilter,
  };
});
