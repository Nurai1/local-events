<template>
  <el-row class="container" justify="center">
    <el-select
      v-model="store.chosenCity"
      @change="store.setChosenCity"
      placeholder="Choose your city"
    >
      <el-option v-for="city in cities" :key="city.id" :value="city.value" />
    </el-select>
  </el-row>
  <el-row class="container" justify="center">
    <el-button type="primary" @click="router.push('/map')">
      <router-link to="/map">Go to the map</router-link>
    </el-button>
  </el-row>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import api from '@/api/mock';
import useMainStore from '@/store';

const store = useMainStore();
const router = useRouter();
const cities = ref([]);

const getCitiesAsync = async () => {
  const response = await api.getCities();
  cities.value = await response.json();
};
getCitiesAsync();
</script>
<style scoped lang="scss">
@use '../styles/element/index.scss' as *;

.container > * {
  width: 500px;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}

a {
  color: $color-white;
}
</style>
