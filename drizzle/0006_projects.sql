CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"href" text,
	"techs" text[] NOT NULL,
	"year" text,
	"completed" boolean DEFAULT false,
	"features" text[] NOT NULL,
	"challenges" text[] NOT NULL,
	"learnings" text[] NOT NULL,
	"screenshots" text[] NOT NULL,
	"created_at" timestamp DEFAULT now()
); 