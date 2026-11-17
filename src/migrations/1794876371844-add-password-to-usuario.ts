import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordToUsuario1794876371844 implements MigrationInterface {
    name = 'AddPasswordToUsuario1794876371844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD \`password\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`password\``);
    }

}
