import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from './prisma.config';

// not a custom provider, we inject our custom PrismaClient into `nestjs-prisma`'s `CustomPrismaService`.
// well, at least we can import this type just like service class.
export type ExtendedPrismaService = CustomPrismaService<ExtendedPrismaClient>;
