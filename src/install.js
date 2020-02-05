import MessageBox from "./index.vue";

export function install(Vue) {
  if (install.installed) {
    return;
  }
  install.installed = true;

  Vue.component("MessageBox", MessageBox);
}
