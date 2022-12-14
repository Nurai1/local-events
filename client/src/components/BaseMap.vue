<script setup>
import { ref, watch, computed, onBeforeMount, reactive } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import mapboxgl from 'mapbox-gl';
import { storeToRefs } from 'pinia';
import { format } from 'date-fns';
import useMainStore from '@/store';
import { COUNTRY_CURRENCY_MAP } from '@/constants';

const store = useMainStore();
const {
  filteredEventsWithPlace,
  filteredEventsWithCoords,
  places,
  chosenCity,
} = storeToRefs(store);

const map = ref(null);
const cityInfo = reactive({
  maxBounds: undefined,
  center: undefined,
});
const markersPlaces = reactive([]);
const markersCoords = reactive([]);

const { result: cityPlacesResult } = useQuery(
  gql`
    query CityPlacesListQuery($value: String!) {
      city(value: $value) {
        places {
          items {
            id
            name
            coordinates {
              coordinates
            }
          }
        }
      }
    }
  `,
  {
    value: chosenCity.value.value,
  }
);

watch(cityPlacesResult, (cityPlacesResultVal) => {
  const places = cityPlacesResultVal?.city?.places?.items;
  places && store.setPlaces(places);
});

const { result: cityEventsResult } = useQuery(
  gql`
    query CityEventsListQuery($value: String!) {
      city(value: $value) {
        id
        events(filter: { passed: { equals: false } }) {
          items {
            id
            price
            name
            eventDate
            description
            isAddressAccurate
            source
            withoutExactTime
            image {
              id
              downloadUrl
            }
            coordinates {
              coordinates
            }
            place {
              id
              coordinates {
                coordinates
              }
            }
            categories {
              items {
                id
                label
                value
              }
            }
          }
        }
      }
    }
  `,
  {
    value: chosenCity.value.value,
  }
);

watch(cityEventsResult, (cityEventsResultVal) => {
  const events = cityEventsResultVal?.city?.events?.items;
  events && store.setEvents(events);
});

const createMarker = ({ eventsByPoint, pointKey, pointLngLat, placeName }) => {
  const eventsInPlace = eventsByPoint.value?.[pointKey] ?? [];
  const firstEvent = eventsInPlace[0];
  if (firstEvent) {
    const filtersLabel = firstEvent.categories.items.reduce(
      (acc, category, idx) => {
        if (idx === 0) {
          return `${category.label}`;
        }
        return `${acc} / ${category.label}`;
      },
      ''
    );
    const formattedDate = format(new Date(firstEvent.eventDate), 'do MMMM');
    const formattedTime = format(new Date(firstEvent.eventDate), "HH':'mm");
    const stringifiedEventsInPlace = JSON.stringify(eventsInPlace)
      .replaceAll("'", '&rsquo;')
      .replaceAll('"', "'");

    const stringifiedFirstEvent = JSON.stringify(firstEvent)
      .replaceAll("'", '&rsquo;')
      .replaceAll('"', "'");

    const priceText = (() => {
      if (!firstEvent.price) return '??????????????????';

      const isPriceNaN = isNaN(parseFloat(firstEvent.price));
      const price = isPriceNaN
        ? firstEvent.price
        : parseFloat(firstEvent.price);

      return (
        ((!isPriceNaN && COUNTRY_CURRENCY_MAP[store.chosenCity.country]) ||
          '') + price
      );
    })();

    const popUpHtml = `
                    <div>
                      ${
                        placeName
                          ? `
                            <span class="megatitle truncate-1-lines">${placeName}</span>
                            <div style="width: 100%; height: 1px; background: black;"></div>
                          `
                          : ''
                      }
                      <div class="event_info" onclick="
                                window.$piniaInstance.setEventInfoPopupVisibility(true);
                                window.$piniaInstance.setEventsPopupVisibility(false);
                                window.$piniaInstance.setChosenEvent(${stringifiedFirstEvent});
                              ">
                        <div class="flx event_title">
                          <span class="m-text m-title truncate-2-lines" style="min-width: fit-content; text-align: left;">
                            ${firstEvent.name}
                          </span>
                          <div style="width: 100%; text-align: left;">
                            <span class="m-text m-subtitle" style="min-width: fit-content;">
                              ${filtersLabel} / ${priceText}
                            </span>
                          </div>
                          <span class="m-text m-subtitle" style="min-width: fit-content;">
                            ${formattedDate}, ${formattedTime}
                          </span>
                          ${
                            !firstEvent.isAddressAccurate
                              ? `
                              <span class="inaccurate-event-info italic primary-color m-text m-subtitle" style="min-width: fit-content;">
                              ???????????????? ??????????.
                              </span>
                            `
                              : ''
                          }
                          ${
                            firstEvent.withoutExactTime
                              ? `
                              <span class="inaccurate-event-info italic primary-color m-text m-subtitle" style="min-width: fit-content;">
                              ???????????????? ??????????.
                              </span>
                            `
                              : ''
                          }
                        </div>
                      </div>
                      ${
                        eventsInPlace.length > 1
                          ? `
                            <div class="background_gray" style="width: 100%; height: 1px; margin-top: 10px;"></div>
                            <button class="marker_events_btn" onclick="
                              window.$piniaInstance.setEventsPopupVisibility(true);
                              window.$piniaInstance.setEventInfoPopupVisibility(false);
                              window.$piniaInstance.setEventsByPoint(${stringifiedEventsInPlace});
                            ">???????????????? ??????</button>
                        `
                          : ''
                      }
                      </div>
                    `;

    const marker = new mapboxgl.Marker({
      color: '#3d5a80',
    })
      .setLngLat(pointLngLat)
      .setPopup(
        new mapboxgl.Popup({
          focusAfterOpen: false,
          closeButton: false,
        })
          .setHTML(popUpHtml)
          .addClassName('events_popup')
      )
      .addTo(map.value);

    const markers = placeName ? markersPlaces : markersCoords;
    markers.push(marker);
  }
};

onBeforeMount(async () => {
  // to use in html click handler
  window.$piniaInstance = {};
  window.$piniaInstance.setEventsPopupVisibility =
    store.setEventsPopupVisibility;
  window.$piniaInstance.setEventsByPoint = store.setEventsByPoint;
  window.$piniaInstance.setEventInfoPopupVisibility =
    store.setEventInfoPopupVisibility;
  window.$piniaInstance.setChosenEvent = store.setChosenEvent;

  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${chosenCity.value.value.toLowerCase()}.json?limit=1&types=place&access_token=${
      process.env.VUE_APP_MAPBOX_ACCESS_KEY
    }`
  );
  const body = await response.json();
  const maxBoundsArray = body.features[0].bbox;
  cityInfo.maxBounds = [maxBoundsArray.slice(0, 2), maxBoundsArray.slice(2)];
  cityInfo.center = body.features[0].center;
});

watch([cityInfo], () => {
  mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_KEY;
  map.value = new mapboxgl.Map({
    container: 'base_map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    // style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: cityInfo.center,
    zoom: 12, // starting zoom
    projection: 'equalEarth', // display the map as a 3D globe
    maxBounds: cityInfo.maxBounds,
  });
  map.value.on('style.load', () => {
    map.value.setFog({}); // Set the default atmosphere style
  });

  map.value.addControl(
    new mapboxgl.GeolocateControl({
      trackUserLocation: true,
      showUserHeading: true,
    })
  );
});

const eventsByPlaces = computed(() => {
  const eventsData = filteredEventsWithPlace.value;
  return places.value.reduce((acc, val) => {
    const thisPlaceEvents = eventsData.filter(
      (event) => event.place.id === val.id
    );
    return {
      ...acc,
      [val.id]: thisPlaceEvents,
    };
  }, {});
});

watch([map, eventsByPlaces], () => {
  markersPlaces.forEach((marker) => {
    marker.remove();
  });
  markersPlaces.length = 0;

  map.value &&
    eventsByPlaces.value &&
    places.value?.forEach((place) => {
      createMarker({
        eventsByPoint: eventsByPlaces,
        pointKey: place.id,
        pointLngLat: place.coordinates.coordinates.map(String),
        placeName: place.name,
      });
    });
});

const eventsByCoords = computed(() => {
  return filteredEventsWithCoords.value.reduce((acc, event) => {
    const coordinatesString = event.coordinates.coordinates.join(', ');
    return {
      ...acc,
      [coordinatesString]: acc[coordinatesString]
        ? [...acc[coordinatesString], event]
        : [event],
    };
  }, {});
});

watch([map, eventsByCoords], () => {
  markersCoords.forEach((marker) => {
    marker.remove();
  });
  markersCoords.length = 0;

  map.value &&
    Object.keys(eventsByCoords.value)?.forEach((coordinate) => {
      createMarker({
        eventsByPoint: eventsByCoords,
        pointKey: coordinate,
        pointLngLat: coordinate.split(', '),
      });
    });
});
</script>

<template>
  <div id="base_map"></div>
  <el-button type="primary" class="feedback_fixed_btn"
    ><a target="_blank" href="https://t.me/bllndman"
      >???????????????? ??????????</a
    ></el-button
  >
  <el-button
    type="primary"
    class="open_events_fixed_btn"
    @click="
      store.setEventsPopupVisibility(true);
      store.setEventInfoPopupVisibility(false);
      store.setEventsByPoint(null);
    "
    >???????????? ??????????????????????</el-button
  >
</template>

<style scoped lang="scss">
#base_map {
  width: 100%;
  height: 100%;
}

.feedback_fixed_btn {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1000;
  padding: 0;
  & a {
    padding: 8px 15px;
  }
}

.open_events_fixed_btn {
  position: fixed;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}
</style>
<style lang="scss">
@use 'sass:color';
@use '../styles/element/index.scss' as *;

.background_gray {
  background: #cad2d3;
}

.mapboxgl-marker {
  z-index: 1;
}

.mapboxgl-marker.mapboxgl-user-location-accuracy-circle {
  z-index: 0;
}

.marker_events_btn {
  @extend .background_gray;
  border: none;
  border-radius: 3px;
  padding: 4px 10px;
  margin-top: 10px;
  cursor: pointer;
}

.events_popup {
  transform: translate(-50%, 0%) !important;
  top: auto;
  bottom: 12%;
  left: 50%;
  z-index: 1;
}

.events_popup > .mapboxgl-popup-tip {
  display: none;
}

.events_popup > .mapboxgl-popup-content {
  border-radius: 10px;
}

.event_info {
  cursor: pointer;
}

.event_title {
  justify-content: left;
  flex-wrap: wrap;
  padding-top: 5px;
}

.m-text {
  font-size: 13px;
}
.m-title {
  font-size: 14px;
}
.m-subtitle {
  color: color.adjust($color-info, $lightness: -20%);
  display: inline-block;
  margin: 3.5px 0 0px;
}

.inaccurate-event-info {
  width: 100%;
  text-align: left;
}

@mixin truncate-lines($amount) {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: $amount;
}
.truncate-2-lines {
  @include truncate-lines(2);
}
.truncate-1-lines {
  @include truncate-lines(1);
}
</style>
