import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
