import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1672277405188 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "users",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },

                        {
                            name: "name",
                            type: "varchar",
                            isNullable: false
                        },

                        {
                            name: "email",
                            type: "varchar",
                            isUnique: true,
                            isNullable: false
                        },

                        {
                            name: "password",
                            type: "varchar",
                            isNullable: false

                        },

                        {
                            name: "driverLicense",
                            type: "varchar",
                            isNullable: false,
                            isUnique: true

                        },

                        {
                            name: "isAdmin",
                            type: "boolean",
                            default: false
                        },

                        {
                            name: "createdAt",
                            type: "timestamp",
                            default: "now()"
                        },
                    ]
                }

            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
