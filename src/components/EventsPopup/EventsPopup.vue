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
  standardFilters,
  filteredEvents,
  chosenCity,
  eventsByPoint,
} = storeToRefs(store);

const onEventsPopupClose = () => {
  setEventsPopupVisibility(false);
  setEventsByPoint(null);
};
const data = computed(() => {
  return !eventsByPoint.value ? filteredEvents.value : eventsByPoint.value;
});
</script>
<template>
  <PopupDrawer :isOpen="eventsPopupVisibility" :onClose="onEventsPopupClose">
    <template #header
      ><span class="header_city"
        >{{ chosenCity.value }}, {{ chosenCity.country }}</span
      >
    </template>
    <template v-if="!eventsByPoint">
      <h3>Filters</h3>
      <template v-for="filter of standardFilters" :key="filter.id">
        <el-button
          :type="filter.isActive ? 'primary' : undefined"
          @click="changeFilterIsActive(filter.id)"
          >{{ filter.value }}
          <el-icon v-if="filter.isActive" class="el-icon--right"
            ><Close /></el-icon
        ></el-button>
      </template>
    </template>
    <h3>Events</h3>
    <div class="events_container">
      <template v-for="event in data" :key="event.id">
        <CardComp v-bind="event" :truncateDescription="true" />
      </template>
    </div>
  </PopupDrawer>
</template>

<style scoped lang="scss">
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
