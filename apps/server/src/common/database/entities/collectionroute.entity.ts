import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Collection } from './collection.entity';
import { ConsumerAcl } from './consumeracl.entity';

@Entity({ name: 'api_collection_service_routes' })
export class CollectionRoute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    name: 'url',
    type: 'varchar',
    default: '/',
    nullable: false,
  })
  url: string;

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

  @OneToMany(() => ConsumerAcl, (consumerAcl) => consumerAcl.route)
  acls: ConsumerAcl[];

  @Column({ name: 'acl_allowed_group_name', type: 'varchar', nullable: true })
  aclAllowedGroupName: string;

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
