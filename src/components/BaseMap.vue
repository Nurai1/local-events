<script setup>
import { ref, watch, computed, onBeforeMount, reactive } from 'vue';
import mapboxgl from 'mapbox-gl';
import { storeToRefs } from 'pinia';
import { format } from 'date-fns';
import useMainStore from '@/store';
import api from '@/api/mock';

const store = useMainStore();
const {
  activeFilters,
  filteredEventsWithPlace,
  filteredEventsWithCoords,
  places,
} = storeToRefs(store);

const map = ref(null);
const cityInfo = reactive({
  maxBounds: undefined,
  center: undefined,
});

onBeforeMount(async () => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${store.chosenCity.value.toLowerCase()}.json?limit=1&types=place&access_token=${
      process.env.VUE_APP_MAPBOX_ACCESS_KEY
    }`
  );
  const body = await response.json();
  const maxBoundsArray = body.features[0].bbox;
  cityInfo.maxBounds = [maxBoundsArray.slice(0, 2), maxBoundsArray.slice(2)];
  cityInfo.center = body.features[0].center;
});

watch([cityInfo, activeFilters], () => {
  mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_KEY;
  map.value = new mapboxgl.Map({
    container: 'base_map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    // style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: cityInfo.center,
    zoom: 12, // starting zoom
    projection: 'equalEarth', // display the map as a 3D globe
    msxBounds: cityInfo.maxBounds,
  });
  map.value.on('style.load', () => {
    map.value.setFog({}); // Set the default atmosphere style
  });

  map.value.addControl(
    new mapboxgl.GeolocateControl({
      trackUserLocation: true,
    })
  );
});

const getPlacesByCityAsync = async (city) => {
  const response = await api.getPlacesByCity(city);
  const result = await response.json();
  store.setPlaces(result);
};
getPlacesByCityAsync(store.chosenCity.value);
const getEventsByCityAsync = async (city) => {
  const response = await api.getEventsByCity(city);
  const result = await response.json();
  store.setEvents(result);
};
getEventsByCityAsync(store.chosenCity.value);

const eventsByPlaces = computed(() => {
  const eventsData = filteredEventsWithPlace.value;
  return places.value.reduce((acc, val) => {
    const thisPlaceEvents = eventsData.filter(
      (event) => event.place === val.id
    );
    return {
      ...acc,
      [val.id]: thisPlaceEvents,
    };
  }, {});
});

watch([map, eventsByPlaces], () => {
  map.value &&
    eventsByPlaces.value &&
    places.value?.forEach((place) => {
      let popUpHtml =
        eventsByPlaces.value?.[place.id]?.length > 0
          ? '<div>' +
              eventsByPlaces.value?.[place.id]?.reduce((acc, event) => {
                const formattedDate = format(
                  new Date(event.eventDate),
                  'do MMMM'
                );
                const formattedTime = format(
                  new Date(event.eventDate),
                  "HH':'mm"
                );
                return (
                  acc +
                  `<div>${event.name} on ${formattedDate} at ${formattedTime}</div>`
                );
              }, '') ?? '' + '</div>'
          : null;
      if (popUpHtml) {
        new mapboxgl.Marker({
          color: '#3d5a80',
        })
          .setLngLat([place.long, place.lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(popUpHtml).addClassName('events_popup')
          )
          .addTo(map.value);
      }
    });
});

const eventsByCoords = computed(() => {
  return filteredEventsWithCoords.value.reduce((acc, event) => {
    return {
      ...acc,
      [event.coordinates]: acc[event.coordinates]
        ? [...acc[event.coordinates], event]
        : [event],
    };
  }, {});
});

watch([map, eventsByCoords], () => {
  map.value &&
    Object.keys(eventsByCoords.value)?.forEach((coordinate) => {
      let popUpHtml =
        eventsByCoords.value?.[coordinate]?.length > 0
          ? '<div>' +
              eventsByCoords.value?.[coordinate]?.reduce((acc, event) => {
                const formattedDate = format(
                  new Date(event.eventDate),
                  'do MMMM'
                );
                const formattedTime = format(
                  new Date(event.eventDate),
                  "HH':'mm"
                );
                return (
                  acc +
                  `<div>${event.name} on ${formattedDate} at ${formattedTime}</div>`
                );
              }, '') ?? '' + '</div>'
          : null;
      if (popUpHtml) {
        new mapboxgl.Marker({
          color: '#3d5a80',
        })
          .setLngLat(coordinate.split(', ').reverse())
          .setPopup(
            new mapboxgl.Popup().setHTML(popUpHtml).addClassName('events_popup')
          )
          .addTo(map.value);
      }
    });
});
</script>

<template>
  <div id="base_map"></div>
  <el-button
    type="primary"
    class="open_events_fixed_btn"
    @click="store.setEventsPopupVisibility(true)"
    >Open events and filters</el-button
  >
</template>

<style scoped lang="scss">
#base_map {
  width: 100%;
  height: 100%;
}

.open_events_fixed_btn {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}
</style>
<style>
.events_popup > .mapboxgl-popup-content {
  border-radius: 10px;
}
</style>
