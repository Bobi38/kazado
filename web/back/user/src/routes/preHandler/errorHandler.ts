import { AppError } from "./AppError";

export function errorHandler(error, request, reply) {
  const route = request.routerPath || request.url;
  console.log(`DANS ERRORHANDLER DE USER ${route}`)

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      success: false,
      message: error.message
    });
  }

  if (error.validation) {
    console.log("dans error validation")
    for (const err of error.validation) {
      const field = err.instancePath.replace('/', '');

      if (route === '/user/register') {

        if (field === 'username')
          return reply.status(400).send({success: false,message: "Le username doit contenir uniquement lettres, chiffres et underscore"});

        if (field === 'password')
          return reply.status(400).send({success: false,message: "Le mot de passe doit contenir au moins une majuscule et un chiffre"});

        if (field === 'email') 
          return reply.status(400).send({success: false,message: "Email invalide"});
      }
    }
    return reply.status(400).send({success: false,message: error.validation[0]?.message || "Validation error"});
  }

  reply.send(error);
}