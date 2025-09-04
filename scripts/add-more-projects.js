
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const newProjects = [
  {
    title: 'مظلة سيارات فاخرة - فيلا الياسمين',
    description: 'تركيب مظلة سيارات عصرية لفيلا فاخرة في شمال جدة بتصميم معاصر يتناسب مع الطراز المعماري للفيلا',
    excerpt: 'مظلة سيارات بتصميم عصري مع إضاءة LED وأنظمة تصريف مياه متطورة',
    category: 'مظلات',
    location: 'شمال جدة - حي الياسمين',
    completionDate: '2024-01-15',
    client: 'عائلة الأحمد',
    featured: true,
    projectDuration: '5 أيام',
    projectCost: '25000',
    media_items: {
      create: [
        {
          type: 'IMAGE',
          src: '/uploads/mazallat-1.webp',
          title: 'مظلة السيارات المكتملة',
          description: 'المنظر النهائي للمظلة مع الإضاءة',
          order: 1
        }
      ]
    },
    project_tags: {
      create: [
        { name: 'مظلات-فاخرة' },
        { name: 'إضاءة-LED' },
        { name: 'تصميم-عصري' }
      ]
    },
    project_materials: {
      create: [
        { name: 'قماش-PVC-مقاوم' },
        { name: 'هيكل-حديدي-مجلفن' },
        { name: 'إضاءة-LED' }
      ]
    }
  },
  {
    title: 'برجولة خشبية - استراحة الواحة',
    description: 'تصميم وتنفيذ برجولة خشبية فاخرة لاستراحة عائلية مع منطقة جلوس مريحة ونظام تكييف طبيعي',
    excerpt: 'برجولة خشبية بتصميم مميز مع مقاعد مدمجة ونباتات متسلقة',
    category: 'برجولات',
    location: 'شرق جدة - طريق الملك عبدالله',
    completionDate: '2024-02-20',
    client: 'استراحة الواحة',
    featured: true,
    projectDuration: '8 أيام',
    projectCost: '45000',
    media_items: {
      create: [
        {
          type: 'IMAGE',
          src: '/uploads/pergola-1.jpg',
          title: 'البرجولة الخشبية',
          description: 'التصميم النهائي مع النباتات',
          order: 1
        }
      ]
    },
    project_tags: {
      create: [
        { name: 'برجولة-خشبية' },
        { name: 'تصميم-طبيعي' },
        { name: 'استراحات' }
      ]
    },
    project_materials: {
      create: [
        { name: 'خشب-الأرز-المعالج' },
        { name: 'مسامير-مقاومة-للصدأ' },
        { name: 'دهان-حماية-خشب' }
      ]
    }
  },
  {
    title: 'ساتر خصوصية متحرك - مجمع النخيل',
    description: 'تركيب ساتر خصوصية متحرك لمجمع سكني مع نظام تحكم آلي وخامات عالية الجودة مقاومة للعوامل الجوية',
    excerpt: 'ساتر متحرك بنظام تحكم إلكتروني لضمان الخصوصية والحماية',
    category: 'سواتر',
    location: 'غرب جدة - مجمع النخيل السكني',
    completionDate: '2024-03-10',
    client: 'شركة النخيل العقارية',
    featured: false,
    projectDuration: '6 أيام',
    projectCost: '35000',
    media_items: {
      create: [
        {
          type: 'IMAGE',
          src: '/uploads/sawater-1.webp',
          title: 'الساتر المتحرك',
          description: 'نظام الساتر المتحرك مع التحكم الآلي',
          order: 1
        }
      ]
    },
    project_tags: {
      create: [
        { name: 'ساتر-متحرك' },
        { name: 'تحكم-آلي' },
        { name: 'خصوصية' }
      ]
    },
    project_materials: {
      create: [
        { name: 'ألواح-PVC-مقوى' },
        { name: 'نظام-تحكم-كهربائي' },
        { name: 'قوائم-معدنية-مجلفنة' }
      ]
    }
  },
  {
    title: 'ساندوتش بانل - مصنع الأجهزة',
    description: 'تركيب ساندوتش بانل عازل للحرارة والصوت لمصنع الأجهزة الإلكترونية مع نظام عزل متقدم وحماية من الحريق',
    excerpt: 'ساندوتش بانل بمواصفات صناعية عالية مع عزل حراري وصوتي ممتاز',
    category: 'ساندوتش بانل',
    location: 'المدينة الصناعية - جدة',
    completionDate: '2024-04-05',
    client: 'مصنع الأجهزة المتطورة',
    featured: true,
    projectDuration: '12 يوم',
    projectCost: '85000',
    media_items: {
      create: [
        {
          type: 'IMAGE',
          src: '/uploads/sandwich-panel-1.jpg',
          title: 'واجهة المصنع',
          description: 'الساندوتش بانل المركب على واجهة المصنع',
          order: 1
        }
      ]
    },
    project_tags: {
      create: [
        { name: 'ساندوتش-بانل' },
        { name: 'عزل-حراري' },
        { name: 'مصانع' },
        { name: 'حماية-حريق' }
      ]
    },
    project_materials: {
      create: [
        { name: 'ساندوتش-بانل-50مم' },
        { name: 'عازل-البولي-يوريثان' },
        { name: 'ألواح-فولاذية-مطلية' }
      ]
    }
  },
  {
    title: 'تنسيق حديقة منزلية - فيلا الورود',
    description: 'تصميم وتنفيذ حديقة منزلية متكاملة مع نظام ري ذكي ومناطق جلوس وألعاب أطفال ونباتات مناسبة للمناخ المحلي',
    excerpt: 'حديقة عائلية شاملة مع نظام ري ذكي ومناطق ترفيهية متنوعة',
    category: 'تنسيق حدائق',
    location: 'شمال جدة - حي الروضة',
    completionDate: '2024-04-25',
    client: 'عائلة الزهراني',
    featured: false,
    projectDuration: '15 يوم',
    projectCost: '55000',
    media_items: {
      create: [
        {
          type: 'IMAGE',
          src: '/uploads/landscaping-1.webp',
          title: 'الحديقة المنزلية',
          description: 'التصميم النهائي للحديقة مع المناطق المختلفة',
          order: 1
        }
      ]
    },
    project_tags: {
      create: [
        { name: 'تنسيق-حدائق' },
        { name: 'ري-ذكي' },
        { name: 'ألعاب-أطفال' },
        { name: 'نباتات-محلية' }
      ]
    },
    project_materials: {
      create: [
        { name: 'نباتات-زينة-متنوعة' },
        { name: 'نظام-ري-تلقائي' },
        { name: 'أحجار-زينة-طبيعية' },
        { name: 'إضاءة-حدائق-LED' }
      ]
    }
  }
];

async function addProjects() {
  try {
    console.log('🚀 بدء إضافة المشاريع الجديدة...');

    for (const project of newProjects) {
      const createdProject = await prisma.projects.create({
        data: project,
        include: {
          media_items: true,
          project_tags: true,
          project_materials: true
        }
      });
      
      console.log(`✅ تم إضافة المشروع: ${createdProject.title}`);
    }

    const totalProjects = await prisma.projects.count();
    console.log(`🎉 تم الانتهاء! إجمالي المشاريع: ${totalProjects}`);

  } catch (error) {
    console.error('❌ خطأ في إضافة المشاريع:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addProjects();
