// import swaggerAutogen from "swagger-autogen";
import swaggerAutogen from 'swagger-autogen';
import dotEnv from 'dotenv';

dotEnv.config();
const PORT = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const doc = {
   info: {
      version: '1.0.0',
      title: 'RCA Library Management',
      description: 'Api Documentation for library management',
   },
   host: `${host}:${PORT}`,
   basePath: '/',
   schemes: ['http', 'https'],
   consumes: ['application/json'],
   produces: ['application/json'],
   tags: [
      {
         name: 'Auth',
         description: 'Authentication routes',
      },
      {
         name: 'Book',
         description: 'Book routes',
      },
   ],
   securityDefinitions: {
      authToken: {
         type: 'apiKey',
         in: 'header',
         name: 'Authorization',
         description: 'Bearer Authorization token',
      },
   },
   definitions: {
      Parents: {
         father: 'Simon Doe',
         mother: 'Marie Doe',
      },
      User: {
         name: 'Jhon Doe',
         age: 29,
         parents: {
            $ref: '#/definitions/Parents',
         },
         diplomas: [
            {
               school: 'XYZ University',
               year: 2020,
               completed: true,
               internship: {
                  hours: 290,
                  location: 'XYZ Company',
               },
            },
         ],
      },
      AddUser: {
         $name: 'Jhon Doe',
         $age: 29,
         about: '',
      },
   },
};

const outputFile = '../swagger-output.json';
const endpointsFiles = ['./app'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

// export default swaggerAutogen()(outputFile, endpointsFiles, doc);
export default swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
