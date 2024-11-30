import {Service} from 'typedi'
import {GenericRepository} from '../core/generic-repository.service'
import {MenuPermissionMaster} from '../database/models'

@Service()
export class MenuPermissionMasterRepository extends GenericRepository<MenuPermissionMaster> {
  constructor() {
    super(MenuPermissionMaster)
  }

}
