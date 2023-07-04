import { PrismaClient } from "@prisma/client";

const client = globalThis.prisma || new PrismaClient(); // If there is no global client, create one client
if (process.env.NODE_ENV !== "production") globalThis.prisma = client; // if in development, use the global client

export default client;