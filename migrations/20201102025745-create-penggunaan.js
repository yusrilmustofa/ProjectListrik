'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('penggunaan', {
      id_penggunaan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pelanggan: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references :{
          model:"pelanggan",
          key: "id_pelanggan" //primaryKey of pelanggan
        }
      },
      bulan: {
        type: Sequelize.STRING
      },
      tahun: {
        type: Sequelize.STRING
      },
      meter_awal: {
        type: Sequelize.FLOAT
      },
      meter_akhir: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('penggunaan');
  }
};
