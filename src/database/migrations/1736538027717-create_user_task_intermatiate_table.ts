import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { EntityEnum } from "../../enums";

export class CreateUserTaskIntermatiateTable1736538027717 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: EntityEnum.USER_TASK,
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        generationStrategy: 'uuid',
                        isUnique: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true
                    },
                    {
                        name: "task_id",
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: "user_id",
                        type: "varchar",
                        isPrimary: true,
                    }
                ],
            }),
        );

        await queryRunner.createForeignKey(
            EntityEnum.USER_TASK,
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: EntityEnum.USER,
                onDelete: "CASCADE",
            }),
        );

        await queryRunner.createForeignKey(
            EntityEnum.USER_TASK,
            new TableForeignKey({
                columnNames: ["task_id"],
                referencedColumnNames: ["id"],
                referencedTableName: EntityEnum.TASK,
                onDelete: "CASCADE",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(EntityEnum.USER_TASK);
        const userForeignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf("user_id") !== -1);
        const taskForeignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf("task_id") !== -1);
        if (userForeignKey) await queryRunner.dropForeignKey(EntityEnum.USER_TASK, userForeignKey);
        if (taskForeignKey) await queryRunner.dropForeignKey(EntityEnum.USER_TASK, taskForeignKey);

        await queryRunner.dropTable(EntityEnum.USER_TASK);
    }
}
