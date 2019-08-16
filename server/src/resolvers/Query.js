async function feed(parent, args, context, info) {
  const where = args.filter ? {
   OR: [
     { content_contains: args.filter },
     { deleted: false },
   ],
 } :
 {OR: [
    { deleted: false },
  ],
}

 const posts = await context.prisma.posts({where})

 return posts
}

function currentUser(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.user({id: userId})
}

module.exports = {
  feed,
}
