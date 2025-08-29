/*
  Warnings:

  - Made the column `verify_code` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `verify_code_expires_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "verify_code" SET NOT NULL,
ALTER COLUMN "verify_code_expires_at" SET NOT NULL;
