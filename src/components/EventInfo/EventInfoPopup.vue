<script setup>
// import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import useMainStore from '@/store';
import PopupDrawer from '@/ui/PopupDrawer.vue';

const store = useMainStore();
const { setEventInfoPopupVisibility } = store;
const { eventInfoPopupVisibility } = storeToRefs(store);
</script>
<template>
  <PopupDrawer
    :isOpen="eventInfoPopupVisibility"
    :onTrigger="setEventInfoPopupVisibility"
  >
  </PopupDrawer>
</template>
<style scoped lang="scss"></style>
