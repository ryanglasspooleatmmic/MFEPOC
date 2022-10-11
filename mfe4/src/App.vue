<template>
  <div>
      <h1>
        Dynamically Resolving Micro-Frontend Host - Vue3
      </h1>
      <div style="margin:10px;padding:10px;width:60%;border:4px solid black;">
        <h3>
          Button from MFE1 (React)
        </h3>
        <button @click=loadReact :disabled="reactLoaded">Load MFE1 (React) Button</button><br />
        <ReactShim v-if="reactLoaded" url="http://localhost:8083/remoteEntry.js" scope="MFE1" module="ButtonRender" :rest="{ onClick: handleReactClick }" />
        <h3>
          Button from MFE3 (Vue)
        </h3>
        <button @click="loadVue" :disabled="vueLoaded">Load MFE3 (Vue) Button</button><br />
        <Suspense v-if="vueLoaded">
          <VueShim url="http://localhost:8084/remoteEntry.js" scope="MFE3" module="VueFeatureApp" :rest="{ clicked: handleVueClick }" />
        </Suspense>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ReactShim from './ReactShim';
import VueShim from './VueShim';

const reactLoaded = ref(false);
const vueLoaded = ref(false);

const loadReact = () => {
  reactLoaded.value = true;
};
const loadVue = () => {
  vueLoaded.value = true;
};

const handleReactClick = () => {
  alert('React button clicked through props-passed handler!');
};

const handleVueClick = () => {
    alert('Vue button clicked through props-passed handler!');
};
</script>
