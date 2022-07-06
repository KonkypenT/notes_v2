import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { ApplicationsFriend } from './applications-friend.entity';

@Entity()
export class MeApplicationsFriend {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @ManyToOne(() => User, (User) => User.id, { cascade: true })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  public userId: User;

  @Column()
  @ManyToOne(() => User, (User) => User.id, { cascade: true })
  @JoinColumn({ name: 'friendId', referencedColumnName: 'id' })
  public friendId: number;

  @Column()
  @ManyToOne(() => ApplicationsFriend, (Application) => Application.id, { cascade: true })
  @JoinColumn({ name: 'applicationId', referencedColumnName: 'id' })
  public applicationId: number;
}
