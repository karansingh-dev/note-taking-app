/*
  Warnings:

  - You are about to drop the column `is_email_verified` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "is_email_verified",
ADD COLUMN     "is_registered" BOOLEAN NOT NULL DEFAULT false;
