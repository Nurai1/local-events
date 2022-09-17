<script setup>
import { onMounted, ref } from 'vue';
import useMainStore from '@/store';
import { Close } from '@element-plus/icons-vue';
import CardComp from './CardComp.vue';

const store = useMainStore();

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
      v-model="store.eventsPopupVisibility"
      :direction="isSmallScreen ? 'btt' : 'ltr'"
      size="100%"
      :modal="false"
      :lock-scroll="false"
      modal-class="drawer_container"
    >
      <template #header
        ><h4>Events in {{ store.chosenCity }}</h4>
      </template>
      <h3>Filters</h3>
      <template v-for="filter of store.standardFilters" :key="filter.id">
        <el-button
          :type="filter.isActive ? 'success' : undefined"
          @click="store.changeFilterIsActive(filter.id)"
          >{{ filter.value }}
          <el-icon v-if="filter.isActive" class="el-icon--right"
            ><Close /></el-icon
        ></el-button>
      </template>
      <h3>Events</h3>
      <div class="events_container">
        <template v-for="event in store.filteredEvents" :key="event.id">
          <CardComp :name="event.name" />
        </template>
      </div>
    </el-drawer>
  </div>
</template>
<style scoped lang="scss">
@use '../../styles/constants.scss' as *;

.events_container {
  & > * {
    margin-bottom: 15px;
  }
}
:global(.drawer_container) {
  @include md {
    width: 40%;
  }
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
