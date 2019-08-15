const { GraphQLServer } = require('graphql-yoga')

let posts = [{
  id: 'post-0',
  content: 'dummy post'
}]

let idCount = posts.length

const resolvers = {
  Query: {
    info: () => 'This is the API',
    feed: () => posts
  },
  Mutation: {
    post: (parent, args) => {
      const post = {
        id: `post-${idCount++}`,
        content: args.content,
        deleted: args.deleted
      }
      posts.push(post)
      return post
    }
  },
  Post: {
    id: (parent) => parent.id,
    content: (parent) => parent.content,
    deleted: (parent) => parent.deleted
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log('Server is running on http://localhost:4000'))
