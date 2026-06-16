import { prisma } from "./lib/prisma";
import bcrypt from 'bcrypt'

async function add_user(){
    const password = "P123"
    const CrypPass = await bcrypt.hash(password, 10);
    const name = "name"

    for(let id = 0; id < 6 ; id++){
        const email = `tr${id}@yopmail.com`
        const nam = name+id
        await prisma.core_user.create({data:{name: nam, email: email, password: CrypPass}})
    }

}

export default async function add_db(){
    await add_user()
}