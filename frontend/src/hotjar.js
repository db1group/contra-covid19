/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */
import Configuration from './configuration';

export default () => {
  const environment = Configuration.value('NODE_ENV');
  if (environment === 'prod') {
    console.log('Carregando Hotjar');
    (function (h, o, t, j, a, r) {
      h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments); };
      h._hjSettings = { hjid: 1770246, hjsv: 6 };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script'); r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    }(window, document, 'https://static.hotjar.com/c/hotjar-%27,%27.js?sv=%27'));
    return;
  }
  console.log('Hotjar não foi carregado neste ambiente');
};
