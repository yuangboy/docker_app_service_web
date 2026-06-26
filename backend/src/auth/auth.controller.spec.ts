import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockJwtService = { verify: jest.fn() };
  const mockWinston = { log: jest.fn() };


   const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
  };

  const mockUsersService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers:[  { provide: JwtService, useValue: mockJwtService },
      { provide: 'winston', useValue: mockWinston },
     { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
    
    ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
