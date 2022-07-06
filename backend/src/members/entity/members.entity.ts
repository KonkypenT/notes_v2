import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { Group } from '../../groups/entities/group.entity';

@Entity()
export class Members {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public isActive: boolean;

  @Column()
  @ManyToOne(() => User, (User) => User.id, { cascade: true })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  public userId: number;

  @Column()
  @ManyToOne(() => Group, (Group) => Group.id, { cascade: true })
  @JoinColumn({ name: 'groupId', referencedColumnName: 'id' })
  public groupId: number;
}
