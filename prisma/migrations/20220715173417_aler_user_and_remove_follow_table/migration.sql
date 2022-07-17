/*
  Warnings:

  - You are about to drop the `follower` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "follower" DROP CONSTRAINT "follower_follower_user_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "followers" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "following" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "follower";
