const models = require('../models');
const usuarioRepository = require('../repositories/usuario-repository');
const secureRoles = require('../secure/roles');

const verificarSupervisorExiste = async () => models.User.findOne({
  where: {
    nome: 'SUPERVISOR',
    municipioId: null,
  },
});

const terminateScript = () => process.exit();

const criarSupervisor = async () => {
  const supervisor = await verificarSupervisorExiste();
  if (supervisor) {
    terminateScript();
    return;
  }
  await usuarioRepository.criarUsuario(null, {
    nome: 'SUPERVISOR',
    email: 'supervisor@notificasaude.com.br',
    permissoes: [secureRoles.values.Supervisor],
  }, true);
  terminateScript();
};

criarSupervisor();
