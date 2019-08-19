const { getUserId } = require('../utils')


async function feed(parent, args, context, info) {
  const where = args.filter ? {
   AND: [
     { content_contains: args.filter },
     { deleted: false },
   ],
 } :
 {OR: [
    { deleted: false },
  ],
}


let orderBy = "createdAt_DESC"

if(args.orderBy && args.orderBy === "oldest") {
  orderBy = "createdAt_ASC"
}

 const posts = await context.prisma.posts({orderBy: orderBy, where})

 return posts
}

function currentUser(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.user({id: userId})
}

module.exports = {
  feed,
  currentUser
}
