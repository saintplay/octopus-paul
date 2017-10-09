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

$scu-margins: (0 5 10 15 20 25 30);

@import "node_modules/bulma/bulma";
@import "node_modules/sass-util/main";

@import "assets/sass/colors";
@import "assets/sass/animations/all";

body {
  background-color: $transparent-gray;
}
</style>
