export default {
  getMessage(error) {
    console.error(error);
    console.error(error.message);
    console.error(error.response);
    console.error(error.response.data);
    if (!error.response) {
      if (!error.message || error.message.trim() === '') {
        return 'Não foi possível completar a ação. Tente novamente mais tarde.';
      }
      return error.message;
    }
    const { data } = error.response || {};
    return data.error || error.response;
  },
};
