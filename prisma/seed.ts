import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { v4 } from "uuid";

const prisma = new PrismaClient()

async function main(){
    const password = await hash('admin', 8);

    await prisma.users.create({
        data: {
            id: v4(),
            name: 'admin',
            password,
            email: 'admin@rentx.com',
            driver_license: '000.000.000-00',
            isAdmin: true,
            created_at: new Date(),
            avatar: null
        },
    });
}

main().catch((e) => {
    console.log(e);
    process.exit(1);
    }).finally(() => {
    prisma.$disconnect();
    });