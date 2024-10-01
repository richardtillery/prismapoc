import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  function childrenToDepth(n: number) : any {
    return ((n=n-1) == 0) ?  true : {children : {include: childrenToDepth(n)}};
  }
  
  var depth = 2;
  var findQuery = {include: {configs : {include: childrenToDepth(depth) }}};
  console.dir(findQuery, {depth: Infinity})

  const assets = await prisma.asset.findMany(findQuery);
  console.dir(assets, {depth: Infinity})
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
