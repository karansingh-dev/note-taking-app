-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "verify_code" DROP NOT NULL,
ALTER COLUMN "verify_code_expires_at" DROP NOT NULL;
