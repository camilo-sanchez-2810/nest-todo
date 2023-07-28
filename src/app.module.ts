import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TodosModule } from './todos/todos.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TodosModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
