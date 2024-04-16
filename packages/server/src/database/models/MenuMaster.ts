import { Model, DataTypes, CreationOptional } from 'sequelize'
import { sequelize } from './sync-model'

class MenuMaster extends Model {
  declare id: CreationOptional<number>
  declare name: string
  declare tooltip: string
  declare executionPath: string
  declare displayOrder: number
  declare parentId: number
  declare nonMenuPage: boolean
  declare isActive: boolean
  declare createdAt: Date
  declare updatedAt: Date
  declare deletedAt: Date

  declare Children?: MenuMaster[]
  declare Parent?: MenuMaster
  
}

MenuMaster.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    tooltip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    executionPath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: -1
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: MenuMaster, // This is a reference to the same model
        key: 'id',
      },
    },
    nonMenuPage: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'MenuMaster',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    paranoid: true,
    underscored: false,
    hasTrigger: false,
    defaultScope: {
      attributes: { exclude: [], include: [] },
    },
    hooks: {
      beforeSave: async (instance: MenuMaster) => {},
      beforeUpdate: async (instance: MenuMaster) => {},
      afterSave: async (instance: MenuMaster) => {},
      afterDestroy: async (instance: MenuMaster) => {},
      beforeDestroy: async (instance: MenuMaster) => {},
    },
  },
)

MenuMaster.hasMany(MenuMaster, { as: 'Children', foreignKey: 'parentId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
MenuMaster.belongsTo(MenuMaster, { as: 'Parent', foreignKey: 'parentId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });


export default MenuMaster
