<template>
  <div
    class="backdrop"
    :style="[
      backdropImage && !$vuetify.breakpoint.mobile
        ? { backgroundImage: `url('${backdropImage}')` }
        : {}
    ]"
  />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    backdropImage() {
      console.dir(this.$store.state.backdrop);

      if (this.$store.state.backdrop?.urls) {
        return this.$store.state.backdrop.urls[0];
      }

      return false;
    }
  }
});
</script>

<style lang="scss">
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.75);
  }
}
</style>
