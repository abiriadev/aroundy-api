/*
  Warnings:

  - You are about to drop the column `isOffline` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `isOnline` on the `Post` table. All the data in the column will be lost.
  - Added the required column `channel` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Channel" AS ENUM ('ONLINE', 'OFFLINE', 'BOTH', 'BRANCH', 'ONLINE_BRANCH');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "isOffline",
DROP COLUMN "isOnline",
ADD COLUMN     "channel" "Channel" NOT NULL,
ADD COLUMN     "locationText" TEXT;
