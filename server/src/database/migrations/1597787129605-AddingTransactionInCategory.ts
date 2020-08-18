import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddingTransactionInCategory1597787129605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn(
            'categories',
            new TableColumn({
                name: 'transaction_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'categories', 
            new TableForeignKey({
                columnNames: ['transaction_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'transactions',
                name: 'CategoryTransaction',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            })
            )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('categories', 'CategoryTransaction');
        await queryRunner.dropColumn('categories', 'transaction_id');
    }

}
