export default class {
  constructor(data = {}) {
    return {
      puerperaAte45DiasDoParto: data.puerperaAte45DiasDoParto || false,
      sindromeDeDown: data.sindromeDeDown || false,
      diabetesMellitus: data.diabetesMellitus || false,
      imunodeficiencia: data.imunodeficiencia || false,
      doencaCardioVascularCronica: data.doencaCardioVascularCronica || false,
      doencaHepaticaCronica: data.doencaHepaticaCronica || false,
      doencaNeurologicaCronica: data.doencaNeurologicaCronica || false,
      doencaRenalCronica: data.doencaRenalCronica || false,
      doencaHematologicaCronica: data.doencaHematologicaCronica || false,
      asma: data.asma || false,
      outraPneumopatiaCronica: data.outraPneumopatiaCronica || false,
      obesidade: data.obesidade || false,
      outros: data.outros || '',
    };
  }
};
