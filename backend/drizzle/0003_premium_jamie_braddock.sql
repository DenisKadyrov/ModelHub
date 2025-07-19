ALTER TABLE "models" ADD COLUMN "size" integer;--> statement-breakpoint
ALTER TABLE "models" ADD COLUMN "readme" text;--> statement-breakpoint
ALTER TABLE "models" ADD COLUMN "tags" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "about" text;