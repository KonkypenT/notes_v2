import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { RegisterModule } from './register/register.module';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { UserController } from './users/user.controller';
import { Friends } from './friends/entities/friends.entity';
import { MeApplicationsFriend } from './friends/entities/me-applications-friend.entity';
import { ApplicationsFriend } from './friends/entities/applications-friend.entity';
import { FriendsController } from './friends/friends.controller';
import { FriendsModule } from './friends/friends.module';
import { ApplicationsView } from './friends/views/applications-view.entity';
import { FriendsView } from './friends/views/friends-view.entity';
import { Group } from './groups/entities/group.entity';
import { GroupModule } from './groups/group.module';
import { GroupController } from './groups/group.controller';
import { Members } from './members/entity/members.entity';
import { MembersModule } from './members/members.module';
import { GroupView } from './groups/views/group-view.entity';
import { FullInfoAboutGroupView } from './groups/views/full-info-about-group.entity';
import { MembersController } from './members/members.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'postgres',
      entities: [
        User,
        Friends,
        MeApplicationsFriend,
        ApplicationsFriend,
        ApplicationsView,
        FriendsView,
        Group,
        Members,
        GroupView,
        FullInfoAboutGroupView,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
    RegisterModule,
    UsersModule,
    AuthModule,
    FriendsModule,
    GroupModule,
    MembersModule,
  ],
  controllers: [AppController, UserController, FriendsController, GroupController, MembersController],
})
export class AppModule {}
