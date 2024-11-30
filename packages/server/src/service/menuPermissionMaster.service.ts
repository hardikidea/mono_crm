import {Service} from 'typedi'
import {MenuPermissionMaster} from '../database/models'
import {MenuPermissionMasterRepository} from '@repository/menuPermissionMaster.repository'
import {FindOptions} from 'sequelize'
import {IDeleteRepository, IReadRepository, IWriteRepository} from '../core/IGenericRepository.interface'
import {TPaginationData} from '../types/TPaginationData.type'

@Service()
export class MenuPermissionMasterService implements IWriteRepository<MenuPermissionMaster>, IReadRepository<MenuPermissionMaster>, IDeleteRepository<MenuPermissionMaster> {
  constructor(public menuPermissionMaster: MenuPermissionMasterRepository) {}
  async deleteRecord(option?: FindOptions): Promise<number> {
    return this.menuPermissionMaster.delete(option ?? {})
  }
  async fetchRecord(option?: FindOptions): Promise<MenuPermissionMaster | null> {
    return await this.menuPermissionMaster.find(option ?? {})
  }
  async fetchAllRecord(option?: FindOptions): Promise<MenuPermissionMaster[]> {
    return this.menuPermissionMaster.findAll(option ?? {})
  }
  async fetchById(id: number): Promise<MenuPermissionMaster | null> {
    return this.menuPermissionMaster.findById(id)
  }
  async fetchPagination(page: number, limit: number): Promise<TPaginationData<MenuPermissionMaster>> {
    const offset = (page - 1) * limit
    const dataItems = await this.menuPermissionMaster.pagination({ limit, offset })
    return { ...dataItems, currentPage: page }
  }
  async createRecord(item: Partial<MenuPermissionMaster>): Promise<MenuPermissionMaster> {
    return await this.menuPermissionMaster.create(item)
  }
  async updateRecord(id: number, item: Partial<MenuPermissionMaster>, isForceToUpdate: boolean = false): Promise<number> {
    return await this.menuPermissionMaster.update(id, item, isForceToUpdate)
  }
}
