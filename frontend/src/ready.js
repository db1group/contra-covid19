import UserService from '@/services/UserService';

const loadLoggedUser = (scope) => {
  /* eslint no-param-reassign: ["error", { "props": false }] */
  UserService.findByEmail(scope.$logged.email)
    .then(({ data }) => {
      scope.$logged.userId = data.id;
    });
};

export default (scope) => {
  loadLoggedUser(scope);
};
