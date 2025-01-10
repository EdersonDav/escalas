import { Column, Entity, JoinTable, ManyToMany, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from './base';
import { RoleEnum, EntityEnum } from '../../enums';
import { Task } from './tasks.entity';
import { Unavailability } from './unavailability.entity';

@Entity(EntityEnum.USER)
@Unique(['email'])
export class User extends BaseEntity<User> {
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.VOLUNTARY, enumName: 'RoleEnum' })
  role!: RoleEnum;

  @Column()
  name!: string;

  @OneToMany(() => Unavailability, (unavailability) => unavailability.user)
  unavailability!: Unavailability[];

  @ManyToMany(() => Task, (task) => task.users)
  @JoinTable({
    name: EntityEnum.USER_TASK,
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "task_id",
      referencedColumnName: "id",
    },
  })
  tasks!: Task[];
}
