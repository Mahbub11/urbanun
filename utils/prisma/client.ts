// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // In production, create a single instance
  prisma = new PrismaClient();
} else {
  // In development, avoid creating multiple instances
  // PrismaClient uses global to avoid hot-reloading issues
  if (!(global as any).__prisma) {
    (global as any).__prisma = new PrismaClient();
  }
  prisma = (global as any).__prisma;
}

export default prisma;
