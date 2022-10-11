<template>
  <div id="some-generated-value"></div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';
import { getRender } from './remoteReactComponent';

const props = defineProps({
  url: String,
  scope: String,
  module: String,
  rest: Object,
});

const { url, scope, module, rest } = props;

onMounted(async () => {
  const reactRender = await getRender(url, scope, module);
  if (reactRender) {
    reactRender('some-generated-value', rest);
  }
});

</script>
