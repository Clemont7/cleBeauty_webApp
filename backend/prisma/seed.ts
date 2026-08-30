import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const img = (seed: string, w = 800, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.product.deleteMany();

  // ---- Products -------------------------------------------------------------
  await prisma.product.createMany({
    data: [
      {
        name: "Batom Matte Terracota 04",
        description:
          "Batom matte de longa duração, acabamento aveludado, tom terracota quente. Não resseca os lábios.",
        priceCents: 89000,
        category: "makeup",
        filterType: "lipstick",
        filterColor: "#a63a2b",
        shade: "Terracota 04",
        imageUrl: img("lipstick-terracota"),
        featured: true,
      },
      {
        name: "Batom Cremoso Rosa Antigo",
        description: "Cor rosa suave, hidratante, ideal para o dia a dia.",
        priceCents: 79000,
        category: "makeup",
        filterType: "lipstick",
        filterColor: "#c96a7a",
        shade: "Rosa Antigo",
        imageUrl: img("lipstick-rose"),
      },
      {
        name: "Batom Líquido Vinho Noite",
        description: "Pigmento intenso vinho escuro, efeito segunda pele.",
        priceCents: 95000,
        category: "makeup",
        filterType: "lipstick",
        filterColor: "#6e1e2f",
        shade: "Vinho Noite",
        imageUrl: img("lipstick-wine"),
      },
      {
        name: "Batom Nude Caramelo",
        description: "Nude quente universal, acabamento satinado.",
        priceCents: 82000,
        category: "makeup",
        filterType: "lipstick",
        filterColor: "#8d5a45",
        shade: "Nude Caramelo",
        imageUrl: img("lipstick-nude"),
      },
      {
        name: "Blush Compacto Pêssego",
        description: "Blush em pó sedoso, tom pêssego luminoso, fixação prolongada.",
        priceCents: 65000,
        category: "makeup",
        filterType: "blush",
        filterColor: "#e88d7d",
        shade: "Pêssego",
        imageUrl: img("blush-peach"),
        featured: true,
      },
      {
        name: "Blush Cremoso Rosa Vibrante",
        description: "Textura cremosa, efeito natural de rubor, buildable.",
        priceCents: 68000,
        category: "makeup",
        filterType: "blush",
        filterColor: "#e06c8b",
        shade: "Rosa Vibrante",
        imageUrl: img("blush-pink"),
      },
      {
        name: "Blush Terracota Bronze",
        description: "Tom quente bronzeado, ideal para peles médias a escuras.",
        priceCents: 68000,
        category: "makeup",
        filterType: "blush",
        filterColor: "#b5654a",
        shade: "Bronze",
        imageUrl: img("blush-bronze"),
      },
      {
        name: "Gel para Sobrancelhas Castanho",
        description: "Gel fixador com micro-fibras, penteia e define os pelos.",
        priceCents: 55000,
        category: "makeup",
        filterType: "brow",
        filterColor: "#4b3220",
        shade: "Castanho Médio",
        imageUrl: img("brow-brown"),
      },
      {
        name: "Pomada de Sobrancelhas Ébano",
        description: "Pomada de alta pigmentação para um desenho marcado.",
        priceCents: 60000,
        category: "makeup",
        filterType: "brow",
        filterColor: "#2b1c12",
        shade: "Ébano",
        imageUrl: img("brow-ebony"),
      },
      {
        name: "Óleo Capilar Nutritivo",
        description: "Óleo leve de argão e coco para brilho e controlo de frizz.",
        priceCents: 120000,
        category: "hair",
        imageUrl: img("hair-oil"),
        featured: true,
      },
      {
        name: "Máscara de Hidratação Profunda",
        description: "Tratamento semanal para cabelos secos e quimicamente tratados.",
        priceCents: 150000,
        category: "hair",
        imageUrl: img("hair-mask"),
      },
      {
        name: "Creme de Pentear Cachos",
        description: "Define cachos sem efeito rígido, com manteiga de karité.",
        priceCents: 110000,
        category: "hair",
        imageUrl: img("hair-curl"),
      },
    ],
  });

  // ---- Courses -------------------------------------------------------------
  const autoMaquiagem = await prisma.course.create({
    data: {
      slug: "automaquiagem-do-zero",
      title: "Automaquiagem do Zero",
      summary:
        "Aprende a fazer a tua maquilhagem completa em casa, do preparo de pele ao acabamento, mesmo sem experiência.",
      description:
        "Um curso passo a passo pensado para quem nunca se maquilhou. Vais aprender a conhecer o teu formato de rosto, escolher os tons certos para a tua pele, preparar a pele, aplicar base, corretor, pó, blush, sobrancelhas, olhos e boca. No final tens uma rotina de 10 minutos para o dia a dia e um look completo para eventos.",
      priceCents: 250000,
      coverUrl: img("course-basics", 1200, 800),
      level: "Iniciante",
      lessons: {
        create: [
          { title: "Boas-vindas e materiais essenciais", durationLabel: "06:12", order: 1, freePreview: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { title: "Conhecer o teu tipo de pele e subtom", durationLabel: "11:40", order: 2, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { title: "Preparo de pele e skincare pré-make", durationLabel: "14:05", order: 3, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { title: "Base, corretor e como não craquelar", durationLabel: "18:22", order: 4, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { title: "Sobrancelhas naturais para iniciantes", durationLabel: "12:50", order: 5, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { title: "Blush, iluminador e contorno leve", durationLabel: "10:31", order: 6, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { title: "Olho básico e boca — o look final", durationLabel: "16:09", order: 7, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
        ],
      },
    },
  });

  await prisma.course.create({
    data: {
      slug: "sobrancelhas-perfeitas",
      title: "Sobrancelhas Perfeitas em Casa",
      summary:
        "Design, preenchimento e fixação: encontra o formato que valoriza o teu olhar e aprende a repeti-lo todos os dias.",
      description:
        "Curso focado só em sobrancelhas. Medição e mapeamento do formato ideal, correção de falhas, técnicas de preenchimento com lápis, sombra e pomada, penteado e fixação com gel, e manutenção entre visitas ao salão.",
      priceCents: 120000,
      coverUrl: img("course-brows", 1200, 800),
      level: "Iniciante",
      lessons: {
        create: [
          { title: "Anatomia e mapeamento da sobrancelha", durationLabel: "09:15", order: 1, freePreview: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { title: "Escolher a cor certa", durationLabel: "07:44", order: 2, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { title: "Preenchimento fio a fio", durationLabel: "13:20", order: 3, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { title: "Fixação e efeito soap brows", durationLabel: "08:05", order: 4, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
        ],
      },
    },
  });

  await prisma.course.create({
    data: {
      slug: "penteados-naturais-eventos",
      title: "Penteados Naturais para Eventos",
      summary:
        "Cinco penteados versáteis para cabelo natural e cacheado, do casual ao festa, com produtos que já tens.",
      description:
        "Aprende a preparar o cabelo, hidratar, definir cachos e montar cinco penteados: puff alto, tranças laterais, meio preso, coque volumoso e twist-out para eventos. Inclui lista de produtos e dicas de finalização.",
      priceCents: 180000,
      coverUrl: img("course-hair", 1200, 800),
      level: "Intermédio",
      lessons: {
        create: [
          { title: "Preparação e hidratação da base", durationLabel: "10:00", order: 1, freePreview: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { title: "Puff alto volumoso", durationLabel: "12:30", order: 2, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { title: "Meio preso com tranças", durationLabel: "15:10", order: 3, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { title: "Coque volumoso para festa", durationLabel: "11:48", order: 4, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { title: "Twist-out e finalização", durationLabel: "13:55", order: 5, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
        ],
      },
    },
  });

  // ---- Demo user ----------------------------------------------------------
  const passwordHash = await bcrypt.hash("clebeauty123", 10);
  const demo = await prisma.user.upsert({
    where: { email: "demo@clebeauty.com" },
    update: {},
    create: { email: "demo@clebeauty.com", name: "Demo Clé", passwordHash },
  });
  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: demo.id, courseId: autoMaquiagem.id } },
    create: { userId: demo.id, courseId: autoMaquiagem.id },
    update: {},
  });

  console.log("Seed completo. Login demo: demo@clebeauty.com / clebeauty123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
