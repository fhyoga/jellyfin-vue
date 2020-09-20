import { Plugin } from '@nuxt/types';
import { BaseItemDto } from '~/api';

interface BackdropStore {
  set: (items: BaseItemDto[]) => void;
  clear: () => void;
}

declare module '@nuxt/types' {
  interface Context {
    $backdrop: BackdropStore;
  }

  interface NuxtAppOptions {
    $backdrop: BackdropStore;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $backdrop: BackdropStore;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $backdrop: BackdropStore;
  }
}

const backdropPlugin: Plugin = (context, inject) => {
  const backdrop = {
    set: (items: BaseItemDto[]) => {
      const backdropUrls = [];

      for (const item of items) {
        let url: string;

        if (item.ParentBackdropItemId && item.ParentBackdropImageTags) {
          url = `${context.$axios.defaults.baseURL}/Items/${item.ParentBackdropItemId}/Images/Backdrop?tag=${item.ParentBackdropImageTags[0]}`;
        } else if (item.BackdropImageTags) {
          url = `${context.$axios.defaults.baseURL}/Items/${item.Id}/Images/Backdrop?tag=${item.BackdropImageTags[0]}`;
        } else {
          continue;
        }

        backdropUrls.push(url);
      }

      context.store.commit('backdrop/set', {
        urls: backdropUrls
      });
    },
    clear: () => {
      context.store.commit('backdrop/clear');
    }
  };

  inject('backdrop', backdrop);
};

export default backdropPlugin;
