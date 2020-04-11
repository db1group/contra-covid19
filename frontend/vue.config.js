module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        const argZero = args[0];
        argZero.title = 'Covid-19 Notificações';
        return args;
      });
  },
};
