<script setup>
defineProps({
  name: String,
});
</script>
<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{ name }}</span>
      </div>
    </template>
  </el-card>
</template>
