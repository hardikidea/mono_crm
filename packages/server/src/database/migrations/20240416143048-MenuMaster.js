'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MenuMaster', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      tooltip: {
        type: Sequelize.STRING,
        allowNull: true
      },
      executionPath: {
        type: Sequelize.STRING,
        allowNull: false
      },
      displayOrder: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: -1
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'MenuMaster', // This is a reference to the same model
          key: 'id'
        }
      },
      nonMenuPage: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    })

    // Add trigger for `updatedAt`
    await queryInterface.sequelize.query(`
    CREATE TRIGGER update_updated_at_trigger
    BEFORE UPDATE ON "MenuMaster"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MenuMaster')
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS update_updated_at_trigger ON "MenuMaster";`)
  },
}
