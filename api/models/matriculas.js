'use strict';
module.exports = (sequelize, DataTypes) => {
  const Matriculas = sequelize.define('Matriculas', {
    status: DataTypes.STRING
  }, { paranoid:true }); // "apaga" para o front, porém o campo continua no bd;
  Matriculas.associate = function(models) {
    // associations can be defined here
    Matriculas.belongsTo(models.Pessoas,{
      foreignKey: 'estudante_id'
    })
    Matriculas.belongsTo(models.Turmas,{
      foreignKey: 'turma_id'
    })
  };
  return Matriculas;
};