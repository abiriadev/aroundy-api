import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = ['팝업스토어', '뷰티', '식품', '축제', '서비스'];
  const tags = ['New', '이벤트', '할인'];

  await prisma.$transaction([
    ...categories.map((name) =>
      prisma.category.upsert({
        where: { name },
        update: { name },
        create: { name },
      }),
    ),
    ...tags.map((name) =>
      prisma.tag.upsert({
        where: { name },
        update: { name },
        create: { name },
      }),
    ),
  ]);
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
