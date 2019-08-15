const { GraphQLServer } = require('graphql-yoga')

let post = [{
  id: 'post-0',
  content: 'dummy post'
}]

const typeDefs = `
type Query {
  info: String!
  feed: [Post!]!
}

type Post {
  id: ID!
  content: String!
  deleted: Boolean!
}
`

const resolvers = {
  Query: {
    info: () => 'This is the API'
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log('Server is running on http://localhost:4000'))
