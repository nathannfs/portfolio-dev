CREATE TABLE "certifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"institution" text NOT NULL,
	"hours" integer NOT NULL,
	"status" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now()
);
