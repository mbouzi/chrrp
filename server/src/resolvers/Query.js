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

module.exports = {
  feed,
}
