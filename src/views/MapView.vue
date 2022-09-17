<template>
  <div class="map_container">
    <BaseMap />
    <EventsPopup />
  </div>
</template>

<script>
import BaseMap from '@/components/BaseMap.vue';
import EventsPopup from '@/components/EventsPopup/EventsPopup.vue';

export default {
  name: 'MapView',
  components: {
    BaseMap,
    EventsPopup,
  },
};
</script>

<style scoped lang="scss">
@use '../styles/constants.scss' as *;

.map_container {
  height: calc(100% - ($header-height));
}
</style>
