import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCarsSpecifications1673742484553 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: "specifications_car",
                columns: [
                {name: "carId", type: "uuid"},
                {name: "specificationId", type: "uuid"},
                {
                    name: "createdAt", 
                    type: "timestamp", 
                    default:"now()"
                }
                ]
            }
        ));

        //Segunda forma d criar foreign keys
        await queryRunner.createForeignKey(
         "specifications_car",
         new TableForeignKey({
            name: "fk_specification_cars",
            referencedTableName: "specifications",
            referencedColumnNames: ["id"],
            columnNames: ["specificationId"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL"
         })
        );

        await queryRunner.createForeignKey(
            "specifications_car",
            new TableForeignKey({
               name: "fk_cars_specifications",
               referencedTableName: "cars",
               referencedColumnNames: ["id"],
               columnNames: ["carId"],
               onDelete: "SET NULL",
               onUpdate: "SET NULL"
            })
           );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            "specifications_car",
            "fk_cars_specifications"
        );

        await queryRunner.dropForeignKey(
            "specifications_car",
            "fk_specification_cars"
        );

        await queryRunner.dropTable( "specifications_car");
    }

}
