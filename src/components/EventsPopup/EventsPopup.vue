<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import useMainStore from '@/store';
import { Close } from '@element-plus/icons-vue';
import CardComp from './CardComp.vue';

const store = useMainStore();
const { changeFilterIsActive } = store;
const { eventsPopupVisibility, standardFilters, filteredEvents, chosenCity } =
  storeToRefs(store);

const isSmallScreen = ref(window.matchMedia('(max-width: 768px)').matches);
onMounted(() => {
  window.addEventListener('resize', () => {
    isSmallScreen.value = window.matchMedia('(max-width: 768px)').matches;
  });
});
</script>

<template>
  <div>
    <el-drawer
      v-model="eventsPopupVisibility"
      :direction="isSmallScreen ? 'btt' : 'ltr'"
      size="100%"
      :modal="false"
      :lock-scroll="false"
      modal-class="drawer_container"
    >
      <template #header
        ><span class="header_city"
          >{{ chosenCity.value }}, {{ chosenCity.country }}</span
        >
      </template>
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
      <h3>Events</h3>
      <div class="events_container">
        <template v-for="event in filteredEvents" :key="event.id">
          <CardComp v-bind="event" />
        </template>
      </div>
    </el-drawer>
  </div>
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

<style lang="scss">
@use '../../styles/constants.scss' as *;

.el-drawer__header {
  margin-bottom: 0;
}
.drawer_container {
  @include md {
    width: 40%;
  }
}
</style>
