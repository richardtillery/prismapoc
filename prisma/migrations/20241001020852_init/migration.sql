-- CreateTable
CREATE TABLE "Asset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Config" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "assetId" INTEGER NOT NULL,
    "parentConfigId" INTEGER,
    CONSTRAINT "Config_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Config_parentConfigId_fkey" FOREIGN KEY ("parentConfigId") REFERENCES "Config" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
