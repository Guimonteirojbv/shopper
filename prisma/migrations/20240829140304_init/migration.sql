-- CreateTable
CREATE TABLE "Measure" (
    "id" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    "measure_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "measure_type" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Measure_id_key" ON "Measure"("id");
