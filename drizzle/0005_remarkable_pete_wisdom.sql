CREATE TABLE "experiences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company" text NOT NULL,
	"position" text NOT NULL,
	"period" text NOT NULL,
	"description" text NOT NULL,
	"responsibilities" text[] NOT NULL,
	"created_at" timestamp DEFAULT now()
);
