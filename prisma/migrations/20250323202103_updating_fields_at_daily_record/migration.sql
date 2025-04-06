/*
  Warnings:

  - You are about to drop the column `negativeMinutes` on the `DailyRecord` table. All the data in the column will be lost.
  - You are about to drop the column `positiveMinutes` on the `DailyRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DailyRecord" DROP COLUMN "negativeMinutes",
DROP COLUMN "positiveMinutes",
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "negativeActionId" INTEGER,
ADD COLUMN     "positiveActionId" INTEGER;

-- AddForeignKey
ALTER TABLE "DailyRecord" ADD CONSTRAINT "DailyRecord_positiveActionId_fkey" FOREIGN KEY ("positiveActionId") REFERENCES "PositiveAction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyRecord" ADD CONSTRAINT "DailyRecord_negativeActionId_fkey" FOREIGN KEY ("negativeActionId") REFERENCES "NegativeAction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
