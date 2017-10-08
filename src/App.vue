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
@import "node_modules/bulma/sass/utilities/initial-variables";
@import "node_modules/bulma/bulma";

@import "assets/sass/colors";
@import "assets/sass/animations/all";

body {
  background-color: $transparent-gray;
}
</style>
