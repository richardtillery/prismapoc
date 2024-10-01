-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Config" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "assetId" INTEGER,
    "parentConfigId" INTEGER,
    CONSTRAINT "Config_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Config_parentConfigId_fkey" FOREIGN KEY ("parentConfigId") REFERENCES "Config" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Config" ("assetId", "desc", "id", "name", "parentConfigId") SELECT "assetId", "desc", "id", "name", "parentConfigId" FROM "Config";
DROP TABLE "Config";
ALTER TABLE "new_Config" RENAME TO "Config";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
