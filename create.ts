import { Config, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  var configs = [ {
      "name": "Config1","desc":"first","children":[{"name":"Child1","desc":"firstkid"}]
      }, {
      "name": "Config2","desc":"second","children":[
          {"name":"Child1","desc":"firstkid"},
          {"name":"Child2","desc":"firstkid","children":[
            {"name":"Grandkid1","desc":"firstgrandkid"}]}]
      }
  ]

  function gatherConfigurations(c: any): any {
    return {"name":c.name, "desc":c.desc, "children": c.children ? { create: c.children.map(ch => {return gatherConfigurations(ch);})} : undefined};
  }

  const user = await prisma.asset.create({
    data: {
      name: 'Asset5',
      desc: 'Fifth Asset',
      configs: 
        {
          create: configs.map(c => {return gatherConfigurations(c);})
          /**
          create: configs.map(c => {return {"name":c.name, "desc":c.desc,
              "children": { create:  c.children.map(ch => {return {"name":ch.name,"desc":ch.desc};}) } };})
              **/
        }
    },
    include: {
      configs: true
    }
  })
  console.log(user)
}

  /*
  const user = await prisma.asset.create({
    data: {
      name: 'Asset2',
      desc: 'Second Asset',
      configs: 
        {
          create: [ {
            name: "Config 1",
            desc: "First Config",
            children: {
              create: [
                {
                  name: "Subconfig 1",
                  desc: "First subconfig"
                },
                {
                  name: "Subconfig 2",
                  desc: "Second subconfig",
                  children: {
                    create: [
                      {
                        name: "Deeper Subconfig 1",
                        desc: "First deeper subconfig"
                      },
                      {
                        name: "Deeper Subconfig 2",
                        desc: "Second deeper subconfig"
                      }
                    ]
                  }      
                }
              ]
            }
          }
          ]  
        }
    },
    include: {
      configs: true
    }
  })
  console.log(user)
}
*/

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
