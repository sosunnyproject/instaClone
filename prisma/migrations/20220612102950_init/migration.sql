-- CreateTable
CREATE TABLE "Webtoon" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "genre" TEXT,

    CONSTRAINT "Webtoon_pkey" PRIMARY KEY ("id")
);
