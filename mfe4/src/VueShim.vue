<template>
  <DynamicComponent v-bind="rest" />
</template>

<script setup>
import { defineProps } from 'vue';
import { getVueComponent } from './remoteVueComponent';

const props = defineProps({
  url: String,
  scope: String,
  module: String,
  rest: Object,
});

const { url, scope, module, rest } = props;

const DynamicComponent = await getVueComponent(url, scope, module);
</script>
