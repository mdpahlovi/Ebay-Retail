import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import config from "./config/index.js";
import { v2 as cloudinary } from "cloudinary";

import { typeDefs } from "./graphql/schemas/index.js";
import { resolvers } from "./graphql/resolvers/index.js";
import { context } from "./graphql/context/index.js";
import corsOptions from "./utils/corsOptions.js";
import { PaymentRoutes } from "./routes/payment.js";
import { NewsRoutes } from "./routes/news.js";

const app = express();
const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });
const wsServer = new WebSocketServer({ server: httpServer, path: "/subscription" });
const serverCleanup = useServer({ schema }, wsServer);
const server = new ApolloServer({
    schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});

await server.start();
await mongoose.connect(config.mongodb_url!);

const { cloud_name, api_key, api_secret } = config.cloud;
cloudinary.config({ cloud_name, api_key, api_secret });

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json({ limit: "64mb" }));
app.use(PaymentRoutes);
app.use(NewsRoutes);

app.use("/graphql", expressMiddleware(server, { context }));

httpServer.listen(config.port, () => console.log(`🚀 Server Running On http://localhost:${config.port}/graphql`));
