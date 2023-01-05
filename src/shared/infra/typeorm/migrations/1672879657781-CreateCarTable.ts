import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCarTable1672879657781 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "cars",
                    columns: [
                        {name:"id", type:"uuid", isPrimary: true},
                        {name:"name", type:"varchar"},
                        {name:"description", type:"varchar"},
                        {name:"dailyRate", type:"numeric"},
                        {
                            name:"avaliable", 
                            type:"boolean", 
                            default: true
                        },
                        {
                            name:"licensePlate", 
                            type:"varchar", 
                            isUnique: true
                        },
                        {
                            name:"fineAmount", 
                            type:"numeric"
        
                        },
                        {
                            name:"brand", 
                            type:"varchar"
        
                        },
                        {
                            name:"categoryId", 
                            type:"uuid",
                            isNullable: true
        
                        },
                        {
                            name:"createdAt", 
                            type:"timestamp",
                            default: "now()"
        
                        },
                        
                    ],
                    foreignKeys: [
                        {
                            name:"fkCarCategoryId",
                            referencedTableName: "categories",
                            referencedColumnNames:["id"],
                            columnNames:["categoryId"],
                            onDelete: "SET NULL",
                            onUpdate: "SET NULL"
                        }
                    ]
                }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cars");
    }

}
