<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import useMainStore from '@/store';
import { Close } from '@element-plus/icons-vue';
import CardComp from './CardComp.vue';
import PopupDrawer from '@/ui/PopupDrawer.vue';

const store = useMainStore();
const { changeFilterIsActive, setEventsPopupVisibility, setEventsByPoint } =
  store;
const {
  eventsPopupVisibility,
  eventsCategories,
  filteredEvents,
  chosenCity,
  eventsByPoint,
  maxPriceFilter,
} = storeToRefs(store);

const onEventsPopupClose = () => {
  setEventsPopupVisibility(false);
  setEventsByPoint(null);
};
const data = computed(() => {
  return !eventsByPoint.value ? filteredEvents.value : eventsByPoint.value;
});
const marks = computed(() => ({
  0: '0',
  [maxPriceFilter.value]: '' + maxPriceFilter.value,
}));
</script>
<template>
  <PopupDrawer :isOpen="eventsPopupVisibility" :onClose="onEventsPopupClose">
    <template #header
      ><span class="header_city"
        >{{ chosenCity.value }}, {{ chosenCity.country }}</span
      >
    </template>
    <template v-if="!eventsByPoint">
      <div class="title-info mb15">Категории</div>
      <div class="flx-wrap jus-con-start">
        <template v-for="filter of eventsCategories" :key="filter.id">
          <el-button
            :type="filter.isActive ? 'primary' : undefined"
            @click="changeFilterIsActive(filter.id)"
            >{{ filter.label }}
            <el-icon v-if="filter.isActive" class="el-icon--right"
              ><Close /></el-icon
          ></el-button>
        </template>
      </div>
      <div class="title-info">Цена</div>
      <div class="slider-wrapper">
        <el-slider
          v-model="store.priceRange"
          range
          show-stops
          :max="maxPriceFilter"
          :marks="marks"
        />
      </div>
      <div class="title-info">Дата</div>
      <div class="jus-con-sp-bet date-picker-wrapper">
        <DatePicker
          placeholder="Дата от"
          teleportCenter
          v-model="store.dateTimeRangeFilter[0]"
          modelType="timestamp"
          format="dd/MM/yyyy HH:mm"
          selectText="Выбрать"
          cancelText="Отмена"
          hideInputIcon
          inputClassName="dp-cus-input"
        ></DatePicker>
        <DatePicker
          placeholder="Дата до"
          teleportCenter
          v-model="store.dateTimeRangeFilter[1]"
          modelType="timestamp"
          format="dd/MM/yyyy HH:mm"
          selectText="Выбрать"
          cancelText="Отмена"
          hideInputIcon
          inputClassName="dp-cus-input"
        ></DatePicker>
      </div>
    </template>
    <!-- <h3>События</h3> -->
    <div class="events_container">
      <template v-for="event in data" :key="event.id">
        <CardComp v-bind="event" :isBriefVersion="true" />
      </template>
    </div>
  </PopupDrawer>
</template>
<style lang="scss">
@use '../../styles/element/index.scss' as *;

.dp__action_buttons > .dp__select {
  color: $color-primary;
}

.dp-cus-input {
  padding-right: 30px;
}
.el-button + .el-button {
  margin-left: 0;
}

.el-button {
  margin-right: 12px;
}
</style>
<style scoped lang="scss">
.date-picker-wrapper {
  margin: 10px 0 15px;
  & > * {
    width: 48%;
  }
}

.slider-wrapper {
  width: 95%;
  margin: 0 auto;
}

.mb15 {
  margin: 0 0 15px;
}

.events_container {
  & > * {
    margin-bottom: 15px;
  }
}
.header_city {
  font-size: 18px;
  text-align: left;
}
button {
  margin-bottom: 10px;
  transition: transform 0.2s;
  //   background: #f6f4d2;
  &:hover {
    transform: scale(1.1);
  }
}
</style>
