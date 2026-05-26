/*
  Warnings:

  - Made the column `date` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maxParticipants` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "maxParticipants" SET NOT NULL;
