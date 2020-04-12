export default class Comorbidades {
  constructor(data = {}) {
    this.puerperaAte45DiasDoParto = data.puerperaAte45DiasDoParto || false;
    this.sindromeDeDown = data.sindromeDeDown || false;
    this.diabetesMellitus = data.diabetesMellitus || false;
    this.imunodeficiencia = data.imunodeficiencia || false;
    this.doencaCardioVascularCronica = data.doencaCardioVascularCronica || false;
    this.doencaHepaticaCronica = data.doencaHepaticaCronica || false;
    this.doencaNeurologicaCronica = data.doencaNeurologicaCronica || false;
    this.doencaRenalCronica = data.doencaRenalCronica || false;
    this.doencaHematologicaCronica = data.doencaHematologicaCronica || false;
    this.asma = data.asma || false;
    this.outraPneumopatiaCronica = data.outraPneumopatiaCronica || false;
    this.obesidade = data.obesidade || false;
    this.outros = data.outros || '';
  }
}
