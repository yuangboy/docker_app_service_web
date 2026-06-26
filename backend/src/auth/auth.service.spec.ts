import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MetricsService } from '../users/metrics/metrics.service';

describe('AuthService', () => {
  let service: AuthService;

const mockUserModel = {};
const mockUsersService = { findOne: jest.fn() };
const mockJwtService = { sign: jest.fn() };
const mockMetricsService = { track: jest.fn() };
const mockWinston = { log: jest.fn() };

 beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      AuthService,
      { provide: 'UserModel', useValue: mockUserModel },
      { provide: UsersService, useValue: mockUsersService },
      { provide: JwtService, useValue: mockJwtService },
      { provide: MetricsService, useValue: mockMetricsService },
      { provide: 'winston', useValue: mockWinston },
    ],
  }).compile();

  service = module.get<AuthService>(AuthService);
});

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
