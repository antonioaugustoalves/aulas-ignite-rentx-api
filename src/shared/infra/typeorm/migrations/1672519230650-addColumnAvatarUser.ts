import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addColumnAvatarUser1672519230650 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users",
            new TableColumn({
                name:"avatarUrl",
                type:"varchar",
                isNullable: true
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "avatarUrl");
    }

}
