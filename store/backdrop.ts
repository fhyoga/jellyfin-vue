import { MutationTree } from 'vuex';

export interface BackdropState {
  urls: string[];
}

export const state = (): BackdropState => ({
  urls: []
});

interface MutationPayload {
  urls: string[];
}

export const mutations: MutationTree<BackdropState> = {
  set(state: BackdropState, payload: MutationPayload) {
    state.urls = payload.urls;
  },
  clear(state: BackdropState) {
    state.urls = [];
  }
};
