import { ApolloServer } from "apollo-server-express";
import cors from 'cors';
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { ClassResolver } from "./resolvers/ClassResolver";
import { OperationResolver } from "./resolvers/OperationResolver";
import { SchedulingResolver } from "./resolvers/SchedulingResolver";
import { StudentResolver } from "./resolvers/StudentResolver";
import { SummaryResolver } from "./resolvers/SummaryResolver";
import { TeacherResolver } from "./resolvers/TeacherResolver";
(async () => {
  const app = express();


  await createConnection();
  
  app.use(cors())

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [OperationResolver, SchedulingResolver, ClassResolver, StudentResolver, SummaryResolver, TeacherResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });


  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("http://localhost:4000/graphql");
  });
})();
