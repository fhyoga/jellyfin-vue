<template>
  <v-container fill-height fluid class="pa-0">
    <video-player
      v-if="item.MediaType === 'Video'"
      :item="item"
      :poster="poster"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { BaseItemDto } from '~/api/api';
import imageHelper from '~/mixins/imageHelper';

export default Vue.extend({
  layout: 'fullpage',
  mixins: [imageHelper],
  data() {
    return {
      poster: '',
      item: [] as BaseItemDto
    };
  },
  async beforeMount() {
    try {
      const response = await this.$itemsApi.getItems({
        uId: this.$auth.user.Id,
        userId: this.$auth.user.Id,
        ids: this.$route.params.itemId,
        fields: 'Overview,Genres'
      });

      this.item = response.data.Items[0];
      console.dir(this.item);
      this.poster = this.getImageLink(this.$route.params.itemId, 'backdrop');
    } catch (error) {
      this.$nuxt.error({
        statusCode: 404,
        message: error
      });
    }
  }
});
</script>
