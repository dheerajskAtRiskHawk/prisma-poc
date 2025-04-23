import { User } from '../domain/user.entity';
import { UserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';
import { BaseController } from './base.controller';
import { Request, Response } from 'express';

export class UserController extends BaseController<User, UserDto> {
  constructor() {
    console.log('[UserController] Initializing...');
    const service = new UserService();
    super(service, UserDto);
    console.log('[UserController] Initialized');
  }

  protected async findAll(req: Request, res: Response) {
    console.log('[UserController] findAll called');
    try {
      const results = await this.service.findAll();
      console.log('[UserController] findAll results:', results);
      res.json(results);
    } catch (error) {
      console.error('[UserController] Error in findAll:', error);
      res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
  }
} 