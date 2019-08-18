const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.createUser({ ...args, password })

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ name: args.name })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

function post(parent, args, context, info) {
  const userId = getUserId(context)
  return context.prisma.createPost({
    content: args.content,
    deleted: args.deleted,
    postedBy: { connect: { id: userId } },
  })
}

function updatePost(parent, args, context, info) {
  console.log("ARGS:", args)
  return context.prisma.updatePost({
    data: {
      content: args.content,
      deleted: args.deleted
    },
    where: {
      id: args.postId
    }
  })
}


module.exports = {
  signup,
  login,
  post,
  updatePost
}
