'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define('Pessoas', {
    nome: {
      type: DataTypes.STRING,
      validate: {
        validaNome: function(dado){
          if(dado.length < 3) throw new Error('Nome deve ter mais do que 3 caracteres!')
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'dado do tipo email inválidos'
        }
      }
    },
    role: DataTypes.STRING
  }, { 
    paranoid:true,
    defaultScope: { // o escopo padrao, que será executado toda vez que ser chamado;
      where: {ativo: true}
    },
    scopes: { // outros escopos
      todos: {where: {}}
    }
  });
  Pessoas.associate = function(models) {
    // associations can be defined here
    Pessoas.hasMany(models.Turmas, {
      foreignKey: 'docente_id'
    })
    Pessoas.hasMany(models.Matriculas, {
      foreignKey: 'estudante_id',
      scope: {status: 'confirmado'},
      as: 'aulasMatriculadas'
    })
  };
  return Pessoas;
};