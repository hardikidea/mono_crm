import 'reflect-metadata'
import {Service} from 'typedi'
import {NextFunction, Request, Response, Router} from 'express'
import {MenuPermissionMaster} from '@database/models'
import {MenuPermissionMasterService} from '@service/menuPermissionMaster.service'
import {CustomError} from '@utils/CustomError'
import {ValidateRequests} from '@core/validation'
import {ValidationForCreateSecurityGroup, ValidationForId, ValidationForPagination} from '@validations/index'

// import { Container } from 'typedi'

@Service()
export class MenuPermissionMasterController {
  public router: Router

  constructor(public menuPermissionMaster: MenuPermissionMasterService) {
    this.router = Router()
    this.initRoutes()
  }

  initRoutes(): void {
    // this.initUserTokenRoutes()
    this.router.get('/', ValidationForPagination, ValidateRequests, this.fetchAll)
    this.router.get('/:id', ValidationForId, ValidateRequests, this.fetchById)
    this.router.post('/', ValidationForCreateSecurityGroup, ValidateRequests, this.create)
    this.router.put('/:id', ValidationForId, ValidateRequests, this.update)
    this.router.delete('/:id', ValidationForId, ValidateRequests, this.removeById)
  }

  //initUserTokenRoutes(): void {
  //  const controller = Container.get(UserTokenMasterController)
  //  this.router.use('/token', controller.router)
  //}

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const menuPermissionMasterCreate: Partial<MenuPermissionMaster> = request.body
      await this.menuPermissionMaster.createRecord(menuPermissionMasterCreate)
      response.status(200).send({ status: 200, data: `[${menuPermissionMasterCreate.menuId}] created successfully.` })
    } catch (error) {
      response.status(500).send('Internal Server Error')
    }
  }

  update = async (request: Request, response: Response, next: NextFunction) => {
    const id: number = parseInt(request.params.id, 0)
    try {
      const menuPermissionMasterUpdate: Partial<MenuPermissionMaster> = request.body
      const updatedCount = await this.menuPermissionMaster.updateRecord(id, menuPermissionMasterUpdate, true)
      if (updatedCount > 0) {
        response.status(200).send({ status: 200, data: `${MenuPermissionMaster.tableName} [id] updated successfully.` })
      } else {
        response.status(400).send(`${MenuPermissionMaster.tableName} provided with [id] not found or Invalid Request.`)
      }
    } catch (error) {
      response.status(500).send('Internal Server Error')
    }
  }

  fetchById = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id, 0)
    const menuPermissionMasterInfo = await this.menuPermissionMaster.fetchById(id)
    if (menuPermissionMasterInfo) {
      res.status(200).json({ status: 200, data: menuPermissionMasterInfo })
    } else {
      next(new CustomError(404, `${MenuPermissionMaster.tableName} not found with id: [id]`))
    }
  }

  removeById = async (request: Request, response: Response, next: NextFunction) => {
    const id: number = parseInt(request.params.id, 0)
    const isMenuPermissionMasterRemoved = await this.menuPermissionMaster.deleteRecord({ where: { id } })
    if (isMenuPermissionMasterRemoved) {
      response.status(200).json({ status: 200, data: `${MenuPermissionMaster.tableName}[id] removed successfully` })
    } else {
      next(new CustomError(404, `${MenuPermissionMaster.tableName} not found with id: [id]`))
    }
  }

  fetchAll = async (request: Request, response: Response) => {
    if (request.query.page && request.query.limit) {
      const page = parseInt(request.query.page.toString())
      const limit = parseInt(request.query.limit.toString())
      response.status(200).send({ status: 200, data: await this.paginationRequest(page, limit) })
    } else {
      response.status(200).send({ status: 200, data: await this.fetchAllRecords() })
    }
  }

  private async fetchAllRecords() {
    try {
      return await this.menuPermissionMaster.fetchAllRecord({})
    } catch (error) {
      console.error('Error fetching fetchAllMenuPermissionMasters:', error)
      throw new CustomError(500, 'Internal Server Error')
    }
  }

  private async paginationRequest(page: number, limit: number) {
    try {
      return await this.menuPermissionMaster.fetchPagination(page, limit)
    } catch (error) {
      console.error('Error fetching paginationRequest:', error)
      throw new CustomError(500, 'Internal Server Error')
    }
  }
}
