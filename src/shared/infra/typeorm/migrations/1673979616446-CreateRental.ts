import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateRental1673979616446 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Rentals",
                columns: [
                    {name: "id", type: "uuid", isPrimary: true},
                    {name: "carId", type: "uuid"},
                    {name: "userId", type: "uuid"},
                    {
                        name: "startDate", 
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "endDate", 
                        type: "timestamp"
                    },
                    {
                        name: "expectReturnDate", 
                        type: "timestamp"
                    },
                    {
                        name: "total", 
                        type: "numeric"
                    },
                    {
                        name: "createdAt", 
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updatedAt", 
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_car_rental",
                        referencedTableName: "cars",
                        referencedColumnNames: ["id"],
                        columnNames: ["carId"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"

                    },
                    {
                        name: "fk_user_rental",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["userId"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"

                    }

                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await   queryRunner.dropTable("rentals");
    }

}
