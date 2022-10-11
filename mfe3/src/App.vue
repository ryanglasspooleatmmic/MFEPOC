<template>
  <button @click="handleClick">MFE3 Button - Vue</button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['clicked']);

const handleClick = () => {
  if (props.clicked) {
    props.clicked();
  } else {
    alert('Vue button clicked!');
  }
};
</script>
