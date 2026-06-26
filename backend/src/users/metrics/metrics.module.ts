import { Module } from '@nestjs/common';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';
import { MetricsService } from './metrics.service';

const userLoginCounterProvider = makeCounterProvider({
  name: 'user_login_total',
  help: 'Total number of user login attempts',
  labelNames: ['status'],
});

@Module({
  providers: [userLoginCounterProvider,MetricsService],
  exports: [userLoginCounterProvider,MetricsService], // <-- exporter le provider déjà déclaré
})
export class MetricsModule {}
