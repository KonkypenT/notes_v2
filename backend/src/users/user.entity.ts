import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public firstName: string;

  @Column()
  public surname: string;

  @Column()
  public username: string;

  @Column()
  public email: string;

  @Column()
  public password?: string;

  @Column({ nullable: true })
  public photo?: string;
}
