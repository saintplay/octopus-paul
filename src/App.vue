<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <article class="message is-info">
          <div class="message-body">
            <p>
              Este aplicativo aún se encuentra en etapas de desarrollo! Si tienes sugerencias o dudas porfavor escríbeme a <em>saintplay96@gmail.com</em>
            </p>
            <strong>
              El código de esta aplicación es completamente <em>Open Source</em>, el código lo puedes encontrar <a class="is-link" href="https://github.com/saintplay/octopus-paul">Github</a>
            </strong>
          </div>
        </article>
      </div>
    </div>
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

html, body {
  height: 100%;
}

body {
  background-color: $transparent-gray;
}
</style>
