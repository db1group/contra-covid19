/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */
/* eslint-disable wrap-iife */
/* eslint-disable semi */
import Configuration from './configuration';

export default () => {
  const environment = Configuration.value('NODE_ENV');
  console.log(`Abrindo site em ambiente ${environment}`);
  if (environment === 'prod') {
    console.log('Carregando Hotjar');
    (function (h, o, t, j, a, r) {
      h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
      h._hjSettings = { hjid: 1770246, hjsv: 6 };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script'); r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
    console.log('Hotjar carregado com sucesso');
    return;
  }
  console.log('Hotjar não foi carregado neste ambiente');
};
