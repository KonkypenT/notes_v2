import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class Friends {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @ManyToOne(() => User, (User) => User.id, { cascade: true })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  public userId: User;

  @Column()
  @ManyToOne(() => User, (User) => User.id, { cascade: true })
  @JoinColumn({ name: 'friendId', referencedColumnName: 'id' })
  public friendId: User;

  @Column({ nullable: true })
  public linkId: number;
}
