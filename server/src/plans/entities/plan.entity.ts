import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';

@Entity()
export class Plan extends BaseEntity {
  @Column({ nullable: false, unique: true })
  public name: string;
}