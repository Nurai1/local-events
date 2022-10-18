<script setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import useMainStore from '@/store';
import PopupDrawer from '@/ui/PopupDrawer.vue';
import mapLocationPath from '@/assets/map-location.svg';
import { CITY_RU_TO_ENG } from '@/constants';

const store = useMainStore();
const { setEventInfoPopupVisibility } = store;
const { chosenCity, chosenEvent, eventInfoPopupVisibility } =
  storeToRefs(store);
const onEventInfoPopupClose = () => {
  setEventInfoPopupVisibility(false);
};
const chosenEventLongLat = computed(() =>
  chosenEvent.value.place
    ? chosenEvent.value.place.coordinates.coordinates
    : chosenEvent.value.coordinates.coordinates
);

const hrefToMap = computed(
  () =>
    // TODO: Tbilisi while we have just one
    `https://yandex.com.ge/maps/${chosenCity.value.yandexCode}/${CITY_RU_TO_ENG[
      chosenCity.value.value
    ]?.toLowerCase()}/?ll=${chosenEventLongLat.value[0]}%2C${
      chosenEventLongLat.value[1]
    }&mode=whatshere&whatshere%5Bpoint%5D=${chosenEventLongLat.value[0]}%2C${
      chosenEventLongLat.value[1]
    }&whatshere%5Bzoom%5D=${chosenEvent.value.isAddressAccurate ? 17 : 12}&z=${
      chosenEvent.value.isAddressAccurate ? 15 : 13
    }`
);
</script>
<template>
  <PopupDrawer
    :isOpen="eventInfoPopupVisibility"
    :onClose="onEventInfoPopupClose"
  >
    <CardComp v-bind="chosenEvent" :isBriefVersion="false" cardShadow="never" />
    <div class="buttons_wrap">
      <el-button type="primary"
        ><a :href="hrefToMap"><img :src="mapLocationPath" class="btn_icon" /></a
      ></el-button>
    </div>
  </PopupDrawer>
</template>
<style scoped lang="scss">
.el-button {
  padding: 10px;
}
.buttons_wrap {
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: translateX(-50%);
}
.btn_icon {
  width: 16px;
  height: 16px;
}
</style>
