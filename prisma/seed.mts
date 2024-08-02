import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const fetchCompaniesSeeds = async () =>
  (
    await (
      await fetch(
        'https://gist.githubusercontent.com/abiriadev/a3cbd55c8a73a5927c08aa28aa1dad1a/raw/8fc033bc59230398779ebb15d1b3d98c68aff4f8/companies-seed.ndjson',
      )
    ).text()
  )
    .trim()
    .split('\n')
    .map((v) => JSON.parse(v) as { name: string; logo: string });

async function main() {
  const categories = ['팝업스토어', '뷰티', '식품', '축제', '서비스'];
  const tags = ['New', '할인'];

  const companies = await fetchCompaniesSeeds();

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
    ...companies.map((company) =>
      prisma.company.upsert({
        where: { name: company.name },
        update: company,
        create: company,
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
