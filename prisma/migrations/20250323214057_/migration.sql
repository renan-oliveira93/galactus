/*
  Warnings:

  - Made the column `negativeTime` on table `Child` required. This step will fail if there are existing NULL values in that column.
  - Made the column `positiveTime` on table `Child` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Child" ALTER COLUMN "negativeTime" SET NOT NULL,
ALTER COLUMN "negativeTime" SET DEFAULT 0,
ALTER COLUMN "positiveTime" SET NOT NULL,
ALTER COLUMN "positiveTime" SET DEFAULT 0;
