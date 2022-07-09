import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public createDate: Date;

  @Column()
  public isActive: boolean;

  @Column()
  @ManyToOne(() => User, (User) => User.id, { cascade: true })
  @JoinColumn({ name: 'ownerId', referencedColumnName: 'id' })
  public ownerId: number;

  @Column({ nullable: true })
  public photo?: string;

  @Column({ nullable: true })
  public inactiveDate?: Date;

  @Column({ nullable: true })
  public description?: string;
}
