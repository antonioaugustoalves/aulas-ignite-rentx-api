import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class RefreshToken1674952245013 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users_tokens",
            columns:[
                {name: "id", type:"uuid", isPrimary: true},
                {name:"refreshToken", type:"varchar"},
                {name:"userId", type:"uuid"},
                {name:"expirationDate", type:"timestamp"},
                {
                    name:"createdAt", 
                    type:"timestamp",
                    default: "now()"
                }
            ],
            foreignKeys:[
                {
                    name: "FK_USER_TOKEN",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames:["userId"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",

                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users_tokens");
    }

}
