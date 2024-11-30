import {Service} from 'typedi'
import {MenuMaster} from '../database/models'
import {MenuMasterRepository} from '@repository/menuMaster.repository'
import {FindOptions} from 'sequelize'
import {IDeleteRepository, IReadRepository, IWriteRepository} from '../core/IGenericRepository.interface'
import {TPaginationData} from '../types/TPaginationData.type'

@Service()
export class MenuMasterService implements IWriteRepository<MenuMaster>, IReadRepository<MenuMaster>, IDeleteRepository<MenuMaster> {
  constructor(public menuMaster: MenuMasterRepository) {}
  async deleteRecord(option?: FindOptions): Promise<number> {
    return this.menuMaster.delete(option ?? {})
  }
  async fetchRecord(option?: FindOptions): Promise<MenuMaster | null> {
    return await this.menuMaster.find(option ?? {})
  }
  async fetchAllRecord(option?: FindOptions): Promise<MenuMaster[]> {
    return this.menuMaster.findAll(option ?? {})
  }
  async fetchById(id: number): Promise<MenuMaster | null> {
    return this.menuMaster.findById(id)
  }
  async fetchPagination(page: number, limit: number): Promise<TPaginationData<MenuMaster>> {
    const offset = (page - 1) * limit
    const dataItems = await this.menuMaster.pagination({ limit, offset })
    return { ...dataItems, currentPage: page }
  }
  async createRecord(item: Partial<MenuMaster>): Promise<MenuMaster> {
    return await this.menuMaster.create(item)
  }
  async updateRecord(id: number, item: Partial<MenuMaster>, isForceToUpdate: boolean = false): Promise<number> {
    return await this.menuMaster.update(id, item, isForceToUpdate)
  }
}
