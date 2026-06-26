// metrics/metrics.service.ts
import { Injectable } from '@nestjs/common';
import { Counter } from 'prom-client';

@Injectable()
export class MetricsService {
  public readonly userLoginCounter: Counter<string>;

  constructor() {
    this.userLoginCounter = new Counter({
      name: 'user_login_total',
      help: 'Total number of user logins',
      labelNames: ['status'],
    });
  }

  incrementLogin(status: 'success' | 'failure') {
    this.userLoginCounter.inc({ status });
  }
}