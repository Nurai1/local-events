<script setup>
import BaseMap from '@/components/BaseMap.vue';
import EventsPopup from '@/components/EventsPopup/EventsPopup.vue';
import PopupDrawer from '@/ui/PopupDrawer.vue';
import useMainStore from '@/store';
import { storeToRefs } from 'pinia';

const store = useMainStore();
const { setEventInfoPopupVisibility } = store;
const { chosenEvent, eventInfoPopupVisibility } = storeToRefs(store);
const onEventInfoPopupClose = () => {
  setEventInfoPopupVisibility(false);
};
</script>

<template>
  <div class="map_container">
    <BaseMap />
    <EventsPopup />
    <PopupDrawer
      :isOpen="eventInfoPopupVisibility"
      :onClose="onEventInfoPopupClose"
    >
      <CardComp v-bind="chosenEvent" :isOnlyEvent="true" cardShadow="never" />
    </PopupDrawer>
  </div>
</template>

<style scoped lang="scss">
@use '../styles/constants.scss' as *;

.map_container {
  height: calc(100% - ($header-height));
}
</style>
