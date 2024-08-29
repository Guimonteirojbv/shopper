/*
  Warnings:

  - You are about to drop the column `id` on the `Measure` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[measure_uuid]` on the table `Measure` will be added. If there are existing duplicate values, this will fail.
  - The required column `measure_uuid` was added to the `Measure` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Measure_id_key";

-- AlterTable
ALTER TABLE "Measure" DROP COLUMN "id",
ADD COLUMN     "measure_uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Measure_measure_uuid_key" ON "Measure"("measure_uuid");
