import { Context } from '@nuxt/types';
import { AxiosInstance } from 'axios';
import { LibraryApi } from '~/api/api';
import { Configuration } from '~/api/configuration';
import { PluginInjection } from '~/types/utils';

declare module '@nuxt/types' {
  interface Context {
    $libraryApi: LibraryApi;
  }

  interface NuxtAppOptions {
    $libraryApi: LibraryApi;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $libraryApi: LibraryApi;
  }
}

export default (context: Context, inject: PluginInjection): void => {
  const config = new Configuration();

  const libraryApi = new LibraryApi(
    config,
    '',
    context.$axios as AxiosInstance
  );
  inject('libraryApi', libraryApi);
};
