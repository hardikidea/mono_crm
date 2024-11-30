import {Service} from 'typedi'
import {GenericRepository} from 'core/generic-repository.service'
import {MenuMaster} from '../database/models'

@Service()
export class MenuMasterRepository extends GenericRepository<MenuMaster> {
  constructor() {
    super(MenuMaster)
  }
}
