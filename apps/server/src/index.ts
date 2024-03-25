import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import http from "http";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { readFileSync } from "fs";
import { Server } from "socket.io";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import config from "./config/index.js";
import context from "./graphql/context/index.js";

import { resolvers } from "./graphql/resolvers/index.js";
import { PaymentRoutes } from "./routes/payment.js";
import { NewsRoutes } from "./routes/news.js";

const app = express();
const httpServer = http.createServer(app);

const { cloud_name, api_key, api_secret } = config.cloud;
cloudinary.v2.config({ cloud_name, api_key, api_secret });

const server = new ApolloServer({
    typeDefs: readFileSync("./schema.graphql", { encoding: "utf-8" }),
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
await mongoose.connect(config.mongodb_url!);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(PaymentRoutes);
app.use(NewsRoutes);

app.use("/graphql", expressMiddleware(server, { context }));

const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    socket.on("new message", ({ room, message }) => {
        socket.broadcast.emit(room, message);
    });
});

await new Promise<void>((resolve) => httpServer.listen({ port: config.port }, resolve));
console.log(`🚀 Server Running On http://localhost:${config.port}/graphql`);
