/*
  Warnings:

  - You are about to drop the column `user_following` on the `follower` table. All the data in the column will be lost.
  - Added the required column `follower_user` to the `follower` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "follower" DROP CONSTRAINT "follower_user_following_fkey";

-- AlterTable
ALTER TABLE "follower" DROP COLUMN "user_following",
ADD COLUMN     "follower_user" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "follower" ADD CONSTRAINT "follower_follower_user_fkey" FOREIGN KEY ("follower_user") REFERENCES "user"("nick_name") ON DELETE CASCADE ON UPDATE CASCADE;
