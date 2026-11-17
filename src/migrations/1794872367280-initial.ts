import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1794872367280 implements MigrationInterface {
    name = 'Initial1794872367280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categoria\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`nombre\` varchar(50) NOT NULL, \`descripcion\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pais\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`nombre\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`municipio\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`nombre\` varchar(50) NOT NULL, \`pais_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ciudad\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`nombre\` varchar(50) NOT NULL, \`municipio_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rol\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`rol_name\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`nombres\` varchar(50) NOT NULL, \`apellidos\` varchar(50) NOT NULL, \`telefono\` int NOT NULL, \`correo\` varchar(50) NOT NULL, \`ciudad_id\` int NULL, \`rol_id\` int NULL, UNIQUE INDEX \`IDX_349ecb64acc4355db443ca17cb\` (\`correo\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cliente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`estado_cliente\` tinyint NOT NULL, \`usuario_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`direccion_cliente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`direccion_cliente\` varchar(50) NOT NULL, \`cliente_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`estado_pedido\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`nombre_estado\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`metodo_pago\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`nombre_metodo\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pago_factura\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`fecha_pago\` timestamp(6) NOT NULL, \`valor_pago\` decimal(12,2) NOT NULL, \`cliente_id\` int NULL, \`metodo_pago_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pedido\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`esta_pagado\` tinyint NOT NULL, \`fecha_entrega_estimada\` timestamp(6) NOT NULL, \`fecha_entrega_real\` timestamp(6) NULL, \`cliente_id\` int NULL, \`estado_pedido_id\` int NULL, \`pago_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`producto\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`nombre\` varchar(50) NOT NULL, \`descripcion\` varchar(50) NOT NULL, \`stock\` int NOT NULL, \`precio\` decimal(12,2) NOT NULL, \`categoria_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`producto_pedido\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`cantidad\` int NOT NULL, \`precio_unitario\` decimal(12,2) NOT NULL, \`producto_id\` int NULL, \`pedido_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`municipio\` ADD CONSTRAINT \`FK_be2f8caa235a8463bd4fac75dae\` FOREIGN KEY (\`pais_id\`) REFERENCES \`pais\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ciudad\` ADD CONSTRAINT \`FK_d217238693f43e91b11f91812b5\` FOREIGN KEY (\`municipio_id\`) REFERENCES \`municipio\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_ff56276410c1f4473a8f58424b8\` FOREIGN KEY (\`ciudad_id\`) REFERENCES \`ciudad\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_6c336b0a51b5c4d22614cb02533\` FOREIGN KEY (\`rol_id\`) REFERENCES \`rol\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD CONSTRAINT \`FK_51a4d9370abe0523f208ef3f43d\` FOREIGN KEY (\`usuario_id\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`direccion_cliente\` ADD CONSTRAINT \`FK_5155918f5431c62d71dc9e59740\` FOREIGN KEY (\`cliente_id\`) REFERENCES \`cliente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pago_factura\` ADD CONSTRAINT \`FK_e42990b27e1332edb1be1c27b1a\` FOREIGN KEY (\`cliente_id\`) REFERENCES \`cliente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pago_factura\` ADD CONSTRAINT \`FK_1d01223f0d82e9cea959555d575\` FOREIGN KEY (\`metodo_pago_id\`) REFERENCES \`metodo_pago\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pedido\` ADD CONSTRAINT \`FK_ab19fb380d17682f87649eded89\` FOREIGN KEY (\`cliente_id\`) REFERENCES \`cliente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pedido\` ADD CONSTRAINT \`FK_90c018382e72f3bbc66d1c8751b\` FOREIGN KEY (\`estado_pedido_id\`) REFERENCES \`estado_pedido\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pedido\` ADD CONSTRAINT \`FK_cc74d072b030fcf888a251160e7\` FOREIGN KEY (\`pago_id\`) REFERENCES \`pago_factura\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`producto\` ADD CONSTRAINT \`FK_1ae19a0cb542cf735d454bab0b5\` FOREIGN KEY (\`categoria_id\`) REFERENCES \`categoria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`producto_pedido\` ADD CONSTRAINT \`FK_939c3bd2cf3d19b7fde97c9d426\` FOREIGN KEY (\`producto_id\`) REFERENCES \`producto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`producto_pedido\` ADD CONSTRAINT \`FK_50e3639e272ff206f356eee4b4a\` FOREIGN KEY (\`pedido_id\`) REFERENCES \`pedido\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`producto_pedido\` DROP FOREIGN KEY \`FK_50e3639e272ff206f356eee4b4a\``);
        await queryRunner.query(`ALTER TABLE \`producto_pedido\` DROP FOREIGN KEY \`FK_939c3bd2cf3d19b7fde97c9d426\``);
        await queryRunner.query(`ALTER TABLE \`producto\` DROP FOREIGN KEY \`FK_1ae19a0cb542cf735d454bab0b5\``);
        await queryRunner.query(`ALTER TABLE \`pedido\` DROP FOREIGN KEY \`FK_cc74d072b030fcf888a251160e7\``);
        await queryRunner.query(`ALTER TABLE \`pedido\` DROP FOREIGN KEY \`FK_90c018382e72f3bbc66d1c8751b\``);
        await queryRunner.query(`ALTER TABLE \`pedido\` DROP FOREIGN KEY \`FK_ab19fb380d17682f87649eded89\``);
        await queryRunner.query(`ALTER TABLE \`pago_factura\` DROP FOREIGN KEY \`FK_1d01223f0d82e9cea959555d575\``);
        await queryRunner.query(`ALTER TABLE \`pago_factura\` DROP FOREIGN KEY \`FK_e42990b27e1332edb1be1c27b1a\``);
        await queryRunner.query(`ALTER TABLE \`direccion_cliente\` DROP FOREIGN KEY \`FK_5155918f5431c62d71dc9e59740\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP FOREIGN KEY \`FK_51a4d9370abe0523f208ef3f43d\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_6c336b0a51b5c4d22614cb02533\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_ff56276410c1f4473a8f58424b8\``);
        await queryRunner.query(`ALTER TABLE \`ciudad\` DROP FOREIGN KEY \`FK_d217238693f43e91b11f91812b5\``);
        await queryRunner.query(`ALTER TABLE \`municipio\` DROP FOREIGN KEY \`FK_be2f8caa235a8463bd4fac75dae\``);
        await queryRunner.query(`DROP TABLE \`producto_pedido\``);
        await queryRunner.query(`DROP TABLE \`producto\``);
        await queryRunner.query(`DROP TABLE \`pedido\``);
        await queryRunner.query(`DROP TABLE \`pago_factura\``);
        await queryRunner.query(`DROP TABLE \`metodo_pago\``);
        await queryRunner.query(`DROP TABLE \`estado_pedido\``);
        await queryRunner.query(`DROP TABLE \`direccion_cliente\``);
        await queryRunner.query(`DROP TABLE \`cliente\``);
        await queryRunner.query(`DROP INDEX \`IDX_349ecb64acc4355db443ca17cb\` ON \`usuario\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
        await queryRunner.query(`DROP TABLE \`rol\``);
        await queryRunner.query(`DROP TABLE \`ciudad\``);
        await queryRunner.query(`DROP TABLE \`municipio\``);
        await queryRunner.query(`DROP TABLE \`pais\``);
        await queryRunner.query(`DROP TABLE \`categoria\``);
    }

}
