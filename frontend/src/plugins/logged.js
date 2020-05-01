let installed = false;

function init(watch, options) {
  watch.$once('ready', (cb) => cb && cb());
  const { keycloak } = options;

  /* eslint no-param-reassign: ["error", { "props": false }] */
  function updateWatchVariables(user) {
    watch.logged = keycloak.authenticated;
    watch.email = user.email;
    watch.userName = user.username;
    if (typeof options.onReady === 'function') {
      watch.$emit('ready', options.onReady.bind(this, watch));
    }
  }

  keycloak.loadUserProfile()
    .success((user) => { updateWatchVariables(user); });
}

export default {
  /* eslint object-shorthand: ["error", "properties"] */
  install: (Vue, params = {}) => {
    if (installed) return;
    installed = true;

    const watch = new Vue({
      data() {
        return {
          logged: false,
          email: '',
          userId: null,
          userName: '',
        };
      },
    });
    init(watch, params);
    Object.defineProperty(Vue.prototype, '$logged', {
      get() {
        return watch;
      },
    });
  },
};
