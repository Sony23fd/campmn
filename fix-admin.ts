import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@zus.mn' },
    update: { password: 'admin123', role: 'SUPERADMIN' },
    create: { email: 'admin@zus.mn', password: 'admin123', name: 'Super Admin', role: 'SUPERADMIN' },
  })
  console.log("Admin account reset to: admin@zus.mn / admin123")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
