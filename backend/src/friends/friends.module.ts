import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friends } from './entities/friends.entity';
import { MeApplicationsFriend } from './entities/me-applications-friend.entity';
import { ApplicationsFriend } from './entities/applications-friend.entity';
import { FriendsService } from './friends.service';
import { ApplicationsView } from './views/applications-view.entity';
import { FriendsView } from './views/friends-view.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Friends, MeApplicationsFriend, ApplicationsFriend, ApplicationsView, FriendsView]),
  ],
  providers: [FriendsService],
  exports: [FriendsService],
})
export class FriendsModule {}
