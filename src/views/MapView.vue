<template>
  <div class="home">
    <BaseMap msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import BaseMap from '@/components/BaseMap.vue';

export default {
  name: 'MapView',
  components: {
    BaseMap,
  },
};
</script>
