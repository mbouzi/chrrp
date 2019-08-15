const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

let posts = [{
  id: 'post-0',
  content: 'dummy post'
}]

let idCount = posts.length

const resolvers = {
  Query: {
    info: () => 'This is the API',
    feed: (root, args, context, info) => {
      return context.prisma.posts()
    }
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createPost({
        content: args.content,
        deleted: args.deleted
      })
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
})

server.start(() => console.log('Server is running on http://localhost:4000'))
