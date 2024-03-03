import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Collection } from './collection.entity';
import { HTTP_METHODS } from 'src/apis/types';

@Entity({ name: 'api_collection_service_routes' })
export class CollectionRoute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    name: 'method',
    type: 'enum',
    default: HTTP_METHODS.GET,
    nullable: false,
    enum: HTTP_METHODS,
  })
  method: string;

  @Column({
    name: 'url',
    type: 'varchar',
    default: '/',
    nullable: false,
  })
  url: string;

  @Column({
    name: 'request',
    type: 'json',
    nullable: true,
  })
  request: any;

  @Column({
    name: 'response',
    type: 'json',
    nullable: true,
  })
  response: any[];

  @Column({
    name: 'environment',
    type: 'varchar',
    default: 'development',
    nullable: false,
  })
  environment: string;

  @Column({ name: 'service_id', type: 'varchar', nullable: true })
  serviceId: string | null;

  @Column({ name: 'route_id', type: 'varchar', nullable: true })
  routeId: string | null;

  @Column({ type: 'json', nullable: true })
  tiers: (number | `${number}`)[] | null;

  @Column({
    type: 'boolean',
    transformer: {
      from: (value: number) => !!value,
      to: (value: boolean) => (value ? 1 : 0),
    },
    nullable: false,
    default: null,
  })
  enabled: boolean;

  @JoinColumn({ name: 'collection_id' })
  @ManyToOne(() => Collection, { nullable: true })
  collection: Collection;

  @Column({ name: 'collection_id', nullable: true, length: 36 })
  collectionId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt?: Date | null;
}
