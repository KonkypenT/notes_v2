import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class ApplicationsFriend {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @ManyToOne(() => User, (User) => User.id, { cascade: true })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  public userId: number;

  @Column()
  @ManyToOne(() => User, (User) => User.id, { cascade: true })
  @JoinColumn({ name: 'friendId', referencedColumnName: 'id' })
  public friendId: number;
}
