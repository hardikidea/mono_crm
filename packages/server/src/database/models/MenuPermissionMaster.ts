import { Model, DataTypes, CreationOptional } from 'sequelize'
import { sequelize } from './sync-model'
import MenuMaster from './MenuMaster'
import SecurityGroupMaster from './SecurityGroupMaster'

class MenuPermissionMaster extends Model {
  declare id: CreationOptional<number>
    declare menuId: number
    declare securityGroupId: number
    declare isRead: boolean
    declare isWrite: boolean
    declare isActive: boolean
    declare isDelete: boolean
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date | null
    declare readonly menu?: MenuMaster
    declare readonly securityGroup?: SecurityGroupMaster
}

MenuPermissionMaster.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MenuMaster,
        key: 'id',
      },
    },
    securityGroupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SecurityGroupMaster,
        key: 'id',
      },
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isWrite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'MenuPermissionMaster',
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
      beforeSave: async (instance: MenuPermissionMaster) => {},
      beforeUpdate: async (instance: MenuPermissionMaster) => {},
      afterSave: async (instance: MenuPermissionMaster) => {},
      afterDestroy: async (instance: MenuPermissionMaster) => {},
      beforeDestroy: async (instance: MenuPermissionMaster) => {},
    },
  },
)

MenuPermissionMaster.belongsTo(MenuMaster, { foreignKey: 'menuId', as: 'menu', onDelete: 'CASCADE', })
MenuPermissionMaster.belongsTo(SecurityGroupMaster, { foreignKey: 'securityGroupId', as: 'securityGroup', onDelete: 'CASCADE', })

export default MenuPermissionMaster
