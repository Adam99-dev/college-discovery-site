import {PrismaClient} from "@prisma/client";

// creating prisma client
const prisma = new PrismaClient();

// eporting client to use everything
export default prisma;