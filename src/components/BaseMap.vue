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

<script setup>
import { ref, watch, computed, onBeforeMount, reactive } from 'vue';
import mapboxgl from 'mapbox-gl';
import { storeToRefs } from 'pinia';
import { format } from 'date-fns';
import useMainStore from '@/store';
import api from '@/api/mock';

const store = useMainStore();
const { events, buildings } = storeToRefs(store);

const map = ref(null);
const cityInfo = reactive({
  maxBounds: undefined,
  center: undefined,
});

onBeforeMount(async () => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${store.chosenCity.toLowerCase()}.json?limit=1&types=place&access_token=${
      process.env.VUE_APP_MAPBOX_ACCESS_KEY
    }`
  );
  const body = await response.json();
  const maxBoundsArray = body.features[0].bbox;
  cityInfo.maxBounds = [maxBoundsArray.slice(0, 2), maxBoundsArray.slice(2)];
  cityInfo.center = body.features[0].center;
});

watch(cityInfo, () => {
  mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_KEY;
  map.value = new mapboxgl.Map({
    container: 'base_map', // container ID
    style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
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

const getBuildingsAsync = async () => {
  const response = await api.getBuildings();
  const result = await response.json();
  store.setBuildings(result);
};
getBuildingsAsync();
const getEventsAsync = async () => {
  const response = await api.getEvents();
  const result = await response.json();
  store.setEvents(result);
};
getEventsAsync();

const eventsByBuildings = computed(() => {
  const eventsData = events.value;
  return buildings.value.reduce((acc, val) => {
    const thisBuildingEvents = eventsData.filter(
      (event) => event.building === val.id
    );
    return {
      ...acc,
      [val.id]: thisBuildingEvents,
    };
  }, {});
});

watch(eventsByBuildings, () => {
  buildings.value.forEach((building) => {
    let popUpHtml =
      '<div>' +
        eventsByBuildings.value?.[building.id]?.reduce((acc, event) => {
          const formattedDate = format(new Date(event.eventDate), 'do MMMM');
          const formattedTime = format(new Date(event.eventDate), "HH':'mm");
          return (
            acc +
            `<div>${event.name} on ${formattedDate} at ${formattedTime}</div>`
          );
        }, '') ?? '' + '</div>';
    new mapboxgl.Marker()
      .setLngLat([building.long, building.lat])
      .setPopup(
        new mapboxgl.Popup().setHTML(popUpHtml).addClassName('events_popup')
      )
      .addTo(map.value);
  });
});
</script>
