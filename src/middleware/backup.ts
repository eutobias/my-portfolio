/**
 * Starts the periodic database/assets backup routine.
 *
 * Waku auto-loads every module in `src/middleware`. The scheduler itself is
 * idempotent, so importing it here is enough to boot it once per process.
 */
import type { MiddlewareHandler } from "hono";

import { startBackupScheduler } from "@/admin/backup.server";

startBackupScheduler();

const scheduler = (): MiddlewareHandler => {
  return async (_c, next) => {
    await next();
  };
};

export default scheduler;
