import { prisma } from "./lib/prisma";
import bcrypt from 'bcrypt'

async function add_user(){
    const password = "P123"
    const CrypPass = await bcrypt.hash(password, 10);

    const users = [];

    for (let id = 0; id < 6; id++) {
        users.push({
            pseudo: `name${id}`,
            email: `tr${id}@yopmail.com`,
            password: CrypPass
        });
    }

    await prisma.core_user.createMany({
        data: users
    });
}

export default async function add_db(){
    await add_user()
}