import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCarImages1673960986584 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "car_images",
                    columns: [
                        {name: "id", type: "uuid", isPrimary: true},
                        {name: "carId", type: "uuid"},
                        {name: "imageName", type: "varchar"},
                        {name: "createdAt", type: "timestamp", default: "now()"}
                    ],
                    foreignKeys:[
                        {
                            name: "fk_car_image",
                            referencedTableName: "cars",
                            referencedColumnNames:["id"],
                            columnNames:["carId"],
                            onDelete: "SET NULL",
                            onUpdate: "SET NULL",


                        }
                    ]
                }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("car_images");
    }

}
