/*
  Warnings:

  - You are about to drop the column `duration` on the `DailyRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Child" ADD COLUMN     "negativeTime" INTEGER,
ADD COLUMN     "positiveTime" INTEGER;

-- AlterTable
ALTER TABLE "DailyRecord" DROP COLUMN "duration";
