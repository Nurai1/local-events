<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import { ArrowDownBold } from '@element-plus/icons-vue';

const props = defineProps({
  isOpen: Boolean,
  onClose: Function,
  infoEventPopup: Boolean,
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
const closeDrawer = () => {
  props.onClose();
  open.value = false;
};
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
    <el-icon
      @click="closeDrawer"
      :class="
        `arrow-down el-icon--right` +
        (!infoEventPopup ? '' : ' forEventInfoPopup')
      "
      ><ArrowDownBold class="arrow-down_svg" color="white"
    /></el-icon>
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
<style scoped lang="scss">
@use '../styles/element/index.scss' as *;
@use '../styles/constants.scss' as *;

.arrow-down {
  width: $drawer-icon-width;
  height: 38px;
  background-color: $color-primary;
  position: absolute;
  bottom: 5%;
  right: calc(50%);
  border-radius: 8px;
  transform: translateX(50%);
  & > svg {
    width: 24px;
    height: 24px;
  }
}

.forEventInfoPopup {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  right: calc(50% - $drawer-icon-width/2);
}
</style>
