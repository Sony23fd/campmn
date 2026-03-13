import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding demo data...')

  // 1. Ensure at least one user exists for authorship
  let user = await prisma.user.findFirst()
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'admin@zuslan.mn',
        password: 'hashedpassword_placeholder',
        name: 'Админ',
        role: 'SUPERADMIN',
      },
    })
  }

  // 2. Clear existing demo data (optional, but let's just create new if empty)
  // We'll just upsert or create to avoid duplicates

  // 3. Create Settings
  const settings = [
    { key: 'heroTitle', value: 'Монголын Зуслангийн Салбарын 100 Жилийн Ой' },
    { key: 'heroSubtitle', value: 'Хүүхдийн хөгжил, хамгаалал, оролцоонд суурилсан зуслангийн хөгжлийн үндэсний тогтолцоо.' },
    { key: 'stat1Year', value: '1925' },
    { key: 'stat1Label', value: 'Байгуулагдсан он' },
    { key: 'stat2Number', value: '100+' },
    { key: 'stat2Label', value: 'Бүртгэлтэй Зуслан' },
    { key: 'stat3Year', value: '2012' },
    { key: 'stat3Label', value: 'ОУЗХ-ны гишүүн' },
    { key: 'stat4Number', value: '15+' },
    { key: 'stat4Label', value: 'ОУ-ын түншлэл' },
    { key: 'anniversary_hero_badge', value: '1925 - 2025' },
    { key: 'anniversary_hero_title', value: 'Түүхт 100 Жилийн Ой' },
    { key: 'anniversary_hero_text', value: 'Монголын Үндэсний Зуслангуудын Холбооны баялаг түүхээр аялж, зуслангийн хөгжилд оруулсан хувь нэмэр, цаашдын алсын хараатай танилцана уу. Бид бүтэн зууны турш хүүхэд багачуудын хөгжлийн төлөө тасралтгүй ажиллаж байна.' },
    { key: 'about_hero_title', value: 'БИДНИЙ ТУХАЙ' },
    { key: 'about_mission_text', value: 'Монголын Үндэсний Зуслангуудын Холбоо (МҮЗХ) нь үүсгэн байгуулагч гишүүдийн санаачилгаар 2006 онд байгуулагдсан үндэсний хэмжээний гишүүддээ үйлчилдэг төрийн бус байгууллага юм. Бид Монгол улс дахь зуслангийн стандартыг сайжруулах, хүүхдийн аюулгүй байдлыг хангах, орчин үеийн хөтөлбөрүүдийг нэвтрүүлэх чиглэлээр олон улсын байгууллагуудтай хамтран ажилладаг.' },
    { key: 'about_hero_image', value: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=2074&auto=format&fit=crop' },
  ]

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value, description: 'Demo data' },
    })
  }

  // 4. Create Camps
  const camps = [
    {
      name: 'Олон Улсын Хүүхдийн Найрамдал Цогцолбор',
      description: 'Монгол Улсын бахархал болсон олон улсын хэмжээний хүүхдийн зуслан. Хүүхдийн хөгжил, авьяасыг дэмжих олон талт хөтөлбөрүүдтэй.',
      location: 'Сонгинохайрхан дүүрэг, Улаанбаатар',
      imageUrl: 'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?w=800&q=80',
      isActive: true,
      establishedAt: 1978
    },
    {
      name: 'Шонхор Зуслан',
      description: 'Эрүүл агаар, байгалийн сайханд байрлах спортын чиглэлийн зуслан. Сагсан бөмбөг, хөл бөмбөг, усан бассейнтай.',
      location: 'Хандгайт, Сүхбаатар дүүрэг',
      imageUrl: 'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?w=800&q=80',
      isActive: true,
      establishedAt: 2005
    },
    {
      name: 'Мөрөөдөл Зуслан',
      description: 'Шинжлэх ухаан, технологи, байгаль орчны танин мэдэхүйд чиглэсэн орчин үеийн хөтөлбөртэй зуслан.',
      location: 'Тэрэлжийн байгалийн цогцолборт газар',
      imageUrl: 'https://images.unsplash.com/photo-1533240332313-05dbad3ce392?w=800&q=80',
      isActive: true,
      establishedAt: 2010
    },
    {
      name: 'Эрдэнэс Хүүхдийн Зуслан',
      description: 'Говийн бүсийн хүүхдүүдэд зориулсан шилдэг зуслан. Орон нутгийн онцлогийг шингээсэн хөтөлбөртэй.',
      location: 'Өмнөговь аймаг',
      imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80',
      isActive: true,
      establishedAt: 2015
    }
  ]

  for (const c of camps) {
    const existing = await prisma.camp.findUnique({ where: { name: c.name } })
    if (!existing) {
      await prisma.camp.create({ data: c })
    }
  }

  // 5. Create News Posts
  const news = [
    {
      title: 'Олон улсын зуслангийн эрдэмтэн судлаачдын 3 дахь хурал болно',
      slug: 'international-camp-conference-2024',
      content: '<p>Ази номхон далайн орнуудын болон бусад олон улсын судлаачид оролцох уг хурлын бүртгэл эхэллээ. Хурал 2024 оны 10 сард Улаанбаатар хотноо зохион байгуулагдах юм. Тус хурлаар зуслангийн хөгжил, хүүхдийн эрх, аюулгүй байдал зэрэг олон чухал сэдвүүдийг хэлэлцэнэ.</p>',
      excerpt: 'Ази номхон далайн орнуудын болон бусад олон улсын судлаачид оролцох уг хурлын бүртгэл эхэллээ...',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      type: 'NEWS' as const,
      published: true,
      authorId: user.id
    },
    {
      title: 'ОХУ-ын "Артек" Олон Улсын Хүүхдийн Төвтэй хамтран ажиллах санамж бичиг зурлаа',
      slug: 'artek-memorandum-2024',
      content: '<p>Монголын хүүхэд багачуудыг ОХУ-ын Хар тэнгисийн эрэгт байрлах дэлхийд танигдсан Артек зусланд амраах хөтөлбөрийг албан ёсоор эхлүүллээ. Энэхүү хөтөлбөрийн хүрээнд Монголоос жил бүр зорилтот хүүхдүүд үнэ төлбөргүй амрах боломжтой болж байна.</p>',
      excerpt: 'Монголын хүүхэд багачуудыг ОХУ-ын Хар тэнгисийн эрэгт байрлах дэлхийд танигдсан Артек зусланд амраах хөтөлбөрийг албан ёсоор эхлүүллээ.',
      imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80',
      type: 'NEWS' as const,
      published: true,
      authorId: user.id
    },
    {
      title: 'Зуслангийн удирдлага, багш нарын нэгдсэн сургалт амжилттай болж өндөрлөлөө',
      slug: 'camp-leaders-training-2024',
      content: '<p>Зуны амралт эхлэхээс өмнө зуслангийн багш, ажилчдад зориулсан "Хүүхэд хамгаалал-Аюулгүй байдал" сэдэвт 3 өдрийн сургалтыг МҮЗХ-оос амжилттай зохион байгууллаа. Сургалтад нийт 150 гаруй багш, арга зүйч нар хамрагдлаа.</p>',
      excerpt: 'Зуны амралт эхлэхээс өмнө зуслангийн багш, ажилчдад зориулсан "Хүүхэд хамгаалал-Аюулгүй байдал" сэдэвт 3 өдрийн сургалтыг МҮЗХ-оос зохион байгууллаа.',
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
      type: 'NEWS' as const,
      published: true,
      authorId: user.id
    }
  ]

  for (const n of news) {
    const existing = await prisma.post.findUnique({ where: { slug: n.slug } })
    if (!existing) {
      await prisma.post.create({ data: n })
    }
  }

  console.log('Demo data seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
