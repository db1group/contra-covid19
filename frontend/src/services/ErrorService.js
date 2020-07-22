export default {
  getMessage(error) {
    console.info(error);
    console.info(error.message);
    console.info(error.detail);
    if (!error.response) {
      if (error.detail) return error.detail;
      if (!error.message || (error.message && typeof error.message === 'string' && error.message.trim() === '')) {
        return 'Não foi possível completar a ação. Tente novamente mais tarde.';
      }
      return error.message;
    }
    console.info(error.response);
    console.info(error.response.data || '');
    const { data = {} } = error.response;
    if (typeof data === 'string') {
      return data;
    }
    return data.error || error.response;
  },
};
