import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [AuthModule, UserModule, TodosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
