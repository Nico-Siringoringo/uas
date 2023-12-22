-- CreateTable
CREATE TABLE "Api" (
    "email" TEXT NOT NULL,
    "openai" TEXT NOT NULL,
    "replicateai" TEXT NOT NULL,

    CONSTRAINT "Api_pkey" PRIMARY KEY ("email")
);
