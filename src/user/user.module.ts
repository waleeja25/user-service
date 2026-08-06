import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities';
import { UserGrpcController } from './user.grpc.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],

  controllers: [UserGrpcController],

  providers: [UserService],

  exports: [UserService],
})
export class UserModule {}
