<script setup>
import { onMounted, onUpdated, ref } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  onClose: Function,
});

const open = ref(props.isOpen);
onUpdated(() => {
  open.value = props.isOpen;
});

const beforeClose = (done) => {
  props.onClose();
  done();
};

const isSmallScreen = ref(window.matchMedia('(max-width: 768px)').matches);
onMounted(() => {
  window.addEventListener('resize', () => {
    isSmallScreen.value = window.matchMedia('(max-width: 768px)').matches;
  });
});
</script>

<template>
  <el-drawer
    v-model="open"
    :beforeClose="beforeClose"
    :direction="isSmallScreen ? 'btt' : 'ltr'"
    size="100%"
    :modal="false"
    :lock-scroll="false"
    modal-class="drawer_container"
  >
    <slot></slot>
  </el-drawer>
</template>

<style lang="scss">
@use '../styles/constants.scss' as *;

.el-drawer__header {
  margin-bottom: 0;
}

.drawer_container {
  @include md {
    width: 40%;
  }
}
</style>
