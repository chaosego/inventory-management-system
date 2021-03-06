import { Column, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Stockroom } from './stockroom.entity';
import { StockItem } from './stock-item.entity';

@Entity()
export class Location extends BaseEntity {
  @Column({ nullable: false })
  public description: string;

  @Column({ type: 'integer', nullable: false, name: 'stockroom_id' })
  public stockroomId: number;

  @ManyToOne(type => Stockroom)
  @JoinColumn({ name: 'stockroom_id' })
  public stockroom: Stockroom;

  @OneToMany(type => StockItem, item => item.location)
  public stockItems: StockItem[];
}