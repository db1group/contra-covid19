export default {
  getMessage(error) {
    const defaultError = 'Não foi possível completar a ação. Tente novamente mais tarde.';
    console.info('Error: ', error);
    console.info('Error Message: ', error.message);
    console.info('Error Detail: ', error.detail);
    console.info('Error Response: ', error.response);
    if (!error.response) {
      if (error.detail) return error.detail;
      if (!error.message || (error.message && typeof error.message === 'string' && error.message.trim() === '')) {
        return defaultError;
      }
      return error.message;
    }
    console.info('Error Response Data', error.response.data || '');
    const { data = {} } = error.response;
    if (typeof data === 'string') {
      return data;
    }
    if (data.error) {
      console.info('Error Response Data Error: ', data.error);
      if (typeof data.error === 'string') {
        return data.error;
      }
      return defaultError;
    }
    return error.response;
  },
};
