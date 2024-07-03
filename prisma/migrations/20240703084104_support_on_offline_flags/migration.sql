/*
  Warnings:

  - Added the required column `isOffline` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isOnline` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "isOffline" BOOLEAN NOT NULL,
ADD COLUMN     "isOnline" BOOLEAN NOT NULL;
