<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import "node_modules/milligram/src/milligram";

@import "assets/sass/colors";
@import "assets/sass/animations/all";

body {
  font-family: 'Roboto Slab', serif;
  background-color: $transparent-gray;
}

</style>
