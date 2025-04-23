import { Router, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { BaseService } from '../services/base.service';

export abstract class BaseController<TEntity, TDto extends object> {
  protected router: Router;
  protected service: BaseService<TEntity, TDto>;
  protected dtoClass: ClassConstructor<TDto>;

  constructor(
    service: BaseService<TEntity, TDto>,
    dtoClass: ClassConstructor<TDto>
  ) {
    this.router = Router();
    this.service = service;
    this.dtoClass = dtoClass;
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    // Create
    this.router.post('/', this.create.bind(this));

    // Read
    this.router.get('/:id', this.findById.bind(this));
    this.router.get('/', this.findAll.bind(this));

    // Update
    this.router.put('/:id', this.update.bind(this));

    // Delete
    this.router.delete('/:id', this.delete.bind(this));
  }

  protected async create(req: Request, res: Response) {
    try {
      const dto = plainToInstance(this.dtoClass, req.body);
      const errors = await validate(dto);
      
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const result = await this.service.create(dto);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error in create:', error);
      res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
  }

  protected async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const result = await this.service.findById(id);
      
      if (!result) {
        res.status(404).json({ message: 'Not found' });
        return;
      }

      res.json(result);
    } catch (error) {
      console.error('Error in findById:', error);
      res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
  }

  protected async findAll(_req: Request, res: Response) {
    try {
      console.log('findAll');
      const results = await this.service.findAll();
      res.json(results);
    } catch (error) {
      console.error('Error in findAll:', error);
      res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
  }

  protected async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const dto = plainToInstance(this.dtoClass, req.body);
      const errors = await validate(dto);
      
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const result = await this.service.update(id, dto);
      res.json(result);
    } catch (error) {
      console.error('Error in update:', error);
      res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
  }

  protected async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.service.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error in delete:', error);
      res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
} 