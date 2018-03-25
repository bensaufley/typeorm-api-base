import {MigrationInterface, QueryRunner} from "typeorm";

export class ExtendedUserMigration1521778827506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE UNIQUE INDEX "ind_dd04db4eb8c1f9957148b81f65" ON "public"."users"("username")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "ind_bc39bac2007de207226547310c" ON "public"."users"("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`-- TODO: revert CREATE UNIQUE INDEX "ind_bc39bac2007de207226547310c" ON "public"."users"("email")`);
        await queryRunner.query(`-- TODO: revert CREATE UNIQUE INDEX "ind_dd04db4eb8c1f9957148b81f65" ON "public"."users"("username")`);
    }

}
