import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { TechnologyModule } from './technology/technology.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    TaskModule,
    QuestionnaireModule,
    TechnologyModule,
  ],
})
export class AppModule {}
