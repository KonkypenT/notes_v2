import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from '../../groups/entities/group.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @ManyToOne(() => Group, (Group) => Group.id, { cascade: true })
  @JoinColumn({ name: 'groupId', referencedColumnName: 'id' })
  public groupId: number;

  @Column()
  public title: string;

  @Column()
  public createDate: Date;

  @Column()
  public endDate: Date;

  @Column()
  public eventDate: Date;

  @Column()
  public placeEvent: string;

  @Column()
  public isActive: boolean;

  @Column({ nullable: true })
  public photo?: string;

  @Column({ nullable: true })
  public latitude?: string;

  @Column({ nullable: true })
  public longitude?: string;
}
