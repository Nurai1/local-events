<template>
  <div id="base_map"></div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#base_map {
  width: 65%;
  height: 500px;
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
import { format } from 'date-fns';
import useMainStore from '@/store';
import api from '@/api/mock';
const props = defineProps({
  msg: String,
});

const store = useMainStore();

const buildings = ref([]);
const events = ref([]);
const map = ref(null);
const cityInfo = reactive({
  maxBounds: undefined,
  center: undefined,
});

onBeforeMount(async () => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${store.chosenCity.toLowerCase()}.json?limit=1&types=place&access_token=pk.eyJ1IjoiYmxpbmRtYW4yMCIsImEiOiJjazVqbWxwMTUwNGltM2twa3VpMGc4OGZmIn0.HtBj6u91XPLtIPjg0TQoCw`
  );
  const body = await response.json();
  const maxBoundsArray = body.features[0].bbox;
  cityInfo.maxBounds = [maxBoundsArray.slice(0, 2), maxBoundsArray.slice(2)];
  cityInfo.center = body.features[0].center;
});

watch(cityInfo, () => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYmxpbmRtYW4yMCIsImEiOiJjazVqbW92aHowNG5qM2txazM4MHR1b3o0In0.OBRzj-3gGUTHipAJbpClPw';
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
  buildings.value = await response.json();
};
getBuildingsAsync();
const getEventsAsync = async () => {
  const response = await api.getEvents();
  events.value = await response.json();
};
getEventsAsync();

const buildingsEvents = computed(() => {
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

watch(buildingsEvents, () => {
  buildings.value.forEach((building) => {
    let popUpHtml =
      '<div>' +
        buildingsEvents.value?.[building.id]?.reduce((acc, event) => {
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
