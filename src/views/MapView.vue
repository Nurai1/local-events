<script setup>
import BaseMap from '@/components/BaseMap.vue';
import EventsPopup from '@/components/EventsPopup/EventsPopup.vue';
import EventInfoPopup from '@/components/EventInfo/EventInfoPopup.vue';
</script>

<template>
  <div class="map_container">
    <BaseMap />
    <EventsPopup />
    <EventInfoPopup />
  </div>
</template>

<style scoped lang="scss">
@use '../styles/constants.scss' as *;

.map_container {
  height: calc(100% - ($header-height));
}
</style>
