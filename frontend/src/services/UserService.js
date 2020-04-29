import http from './Http';

export default {
  findByEmail(email = '') {
    return http.get(`/users/email/${email}`).then(({ data }) => data);
  },
};
