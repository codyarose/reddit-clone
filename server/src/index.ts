import "reflect-metadata"
import { MikroORM } from "@mikro-orm/core"
import { buildSchema } from "type-graphql"
import express from "express"
import { ApolloServer } from "apollo-server-express"
import redis from "redis"
import session from "express-session"
import connectRedis from "connect-redis"
import cors from "cors"

import { __prod__ } from "./contants"
import mikroConfig from "./mikro-orm.config"
import { HelloResolver } from "./resolvers/hello"
import { PostResolver } from "./resolvers/post"
import { UserResolver } from "./resolvers/user"
import { MyContext } from "./types"

const main = async () => {
	const orm = await MikroORM.init(mikroConfig)
	await orm.getMigrator().up()

	const app = express()

	const RedisStore = connectRedis(session)
	const redisClient = redis.createClient()

	app.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true,
		})
	)

	app.use(
		session({
			name: "qid",
			store: new RedisStore({ client: redisClient, disableTouch: true }),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
				httpOnly: true,
				sameSite: "lax",
				secure: __prod__,
			},
			saveUninitialized: false,
			secret: "alksddfi3ii3ifjk",
			resave: false,
		})
	)

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, PostResolver, UserResolver],
			validate: false,
		}),
		context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
	})

	apolloServer.applyMiddleware({
		app,
		cors: {
			origin: "http://localhost:3000",
			credentials: true,
		},
	})

	app.listen(4000, () => {
		console.log("server started on http://localhost:4000")
	})
}

main().catch((error) => {
	console.error(error)
})
