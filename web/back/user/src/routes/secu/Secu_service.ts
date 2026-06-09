import  {prisma} from "../../lib/prisma";


export class SecuService{

    async checko(userId:number){
        try{
            const rep = await prisma.core_user.findUnique({where:{id: userId}})
            if (!rep)
                return {success:false, message:"id doesn't exist"}
            return {success:true, message:"checko GOOD"}
        }catch(err){
            return {success: false, message: "back err catch checko " + err}
        }
    }
}