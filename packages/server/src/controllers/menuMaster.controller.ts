import 'reflect-metadata'
import { Service } from 'typedi'
import { NextFunction, Request, Response, Router } from 'express'
import { MenuMaster } from '@database/models'
import { MenuMasterService } from '@service/menuMaster.service'
import { CustomError } from '@utils/CustomError'
import { ValidateRequests } from '@core/validation'
import { ValidationForCreateSecurityGroup, ValidationForId, ValidationForPagination } from '@validations/index'
// import { Container } from 'typedi'

@Service()
export class MenuMasterController {
  public router: Router

  constructor(public menuMaster: MenuMasterService) {
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
      const menuMasterCreate: Partial<MenuMaster> = request.body
      await this.menuMaster.createRecord(menuMasterCreate)
      response.status(200).send({ status: 200, data: `[${menuMasterCreate.name}] created successfully.` })
    } catch (error) {
      response.status(500).send('Internal Server Error')
    }
  }

  update = async (request: Request, response: Response, next: NextFunction) => {
    const id: number = parseInt(request.params.id, 0)
    try {
      const menuMasterUpdate: Partial<MenuMaster> = request.body
      const updatedCount = await this.menuMaster.updateRecord(id, menuMasterUpdate, true)
      if (updatedCount > 0) {
        response.status(200).send({ status: 200, data: `${MenuMaster.tableName} [id] updated successfully.` })
      } else {
        response.status(400).send(`${MenuMaster.tableName} provided with [id] not found or Invalid Request.`)
      }
    } catch (error) {
      response.status(500).send('Internal Server Error')
    }
  }

  fetchById = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id, 0)
    const menuMasterInfo = await this.menuMaster.fetchById(id)
    if (menuMasterInfo) {
      res.status(200).json({ status: 200, data: menuMasterInfo })
    } else {
      next(new CustomError(404, `${MenuMaster.tableName} not found with id: [id]`))
    }
  }

  removeById = async (request: Request, response: Response, next: NextFunction) => {
    const id: number = parseInt(request.params.id, 0)
    const isMenuMasterRemoved = await this.menuMaster.deleteRecord({ where: { id } })
    if (isMenuMasterRemoved) {
      response.status(200).json({ status: 200, data: `${MenuMaster.tableName}[id] removed successfully` })
    } else {
      next(new CustomError(404, `${MenuMaster.tableName} not found with id: [id]`))
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
      return await this.menuMaster.fetchAllRecord({})
    } catch (error) {
      console.error('Error fetching fetchAllMenuMasters:', error)
      throw new CustomError(500, 'Internal Server Error')
    }
  }

  private async paginationRequest(page: number, limit: number) {
    try {
      return await this.menuMaster.fetchPagination(page, limit)
    } catch (error) {
      console.error('Error fetching paginationRequest:', error)
      throw new CustomError(500, 'Internal Server Error')
    }
  }
}
