<script setup>
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import api from '@/api/mock';
import useMainStore from '@/store';

const store = useMainStore();
const router = useRouter();
const cities = ref([]);
const currentCity = ref('');

watch(currentCity, () => {
  const chosenCity = {
    value: currentCity.value,
    country: cities.value.find((city) => city.value === currentCity.value)
      .country,
  };
  store.setChosenCity(chosenCity);
});

const getCitiesAsync = async () => {
  const response = await api.getCities();
  cities.value = await response.json();
};
getCitiesAsync();
</script>

<template>
  <el-row class="container" justify="center">
    <el-select v-model="currentCity" placeholder="Choose your city">
      <el-option v-for="city in cities" :key="city.id" :value="city.value">{{
        city.value
      }}</el-option>
    </el-select>
  </el-row>
  <el-row class="container" justify="center">
    <el-button type="primary" @click="router.push('/map')">
      <router-link to="/map">Go to the map</router-link>
    </el-button>
  </el-row>
</template>

<style scoped lang="scss">
@use '../styles/element/index.scss' as *;

.container {
  padding-left: 10px;
  padding-right: 10px;
  & > * {
    max-width: 500px;
    width: 100%;
  }
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
