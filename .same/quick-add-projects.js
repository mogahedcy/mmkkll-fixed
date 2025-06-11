// سكريبت لإضافة مشاريع تجريبية سريعة
// يمكن تشغيله في console المتصفح في صفحة الموقع

async function addSampleProjects() {
  const projects = [
    {
      title: "مظلة سيارات عصرية - فيلا المهندس أحمد",
      description: "تركيب مظلة سيارات أنيقة ومتينة بتصميم عصري، تتسع لسيارتين بمساحة 6×8 متر، مصنوعة من أجود أنواع الحديد المجلفن وقماش PVC عالي الجودة. تم تنفيذ المشروع خلال 3 أيام مع ضمان 5 سنوات.",
      category: "مظلات سيارات",
      location: "جدة - حي الشاطئ",
      completionDate: "2024-12-01",
      client: "المهندس أحمد محمد",
      featured: true,
      projectDuration: "3 أيام",
      projectCost: "15,000 ريال",
      tags: ["مظلة", "سيارات", "حديثة", "متينة"],
      materials: ["حديد مجلفن", "قماش PVC", "براغي ستانلس"],
      mediaItems: [
        {
          type: "IMAGE",
          src: "/uploads/mazallat-1.webp",
          title: "المظلة النهائية",
          order: 0
        },
        {
          type: "IMAGE",
          src: "/uploads/mazallat-2.webp",
          title: "منظر جانبي",
          order: 1
        }
      ]
    },
    {
      title: "برجولا خشبية للحديقة - فيلا الأستاذ محمد",
      description: "تصميم وتنفيذ برجولا خشبية أنيقة بمساحة 4×6 متر للحديقة، مصنوعة من خشب الصنوبر المعالج مع إضاءة LED مدمجة وإمكانية تركيب نباتات متسلقة.",
      category: "برجولات",
      location: "جدة - حي النعيم",
      completionDate: "2024-11-15",
      client: "الأستاذ محمد عبدالله",
      featured: false,
      projectDuration: "5 أيام",
      projectCost: "25,000 ريال",
      tags: ["برجولا", "خشب", "حديقة", "إضاءة"],
      materials: ["خشب صنوبر معالج", "إضاءة LED", "براغي ستانلس"],
      mediaItems: [
        {
          type: "IMAGE",
          src: "/uploads/pergola-1.jpg",
          title: "البرجولا مكتملة",
          order: 0
        },
        {
          type: "IMAGE",
          src: "/uploads/pergola-2.jpg",
          title: "تفاصيل الإضاءة",
          order: 1
        }
      ]
    },
    {
      title: "واجهة ساندوتش بانل لمستودع تجاري",
      description: "تركيب واجهة ساندوتش بانل عازل للحرارة والصوت لمستودع تجاري بمساحة 200 متر مربع، مع نظام تهوية متقدم وأبواب أوتوماتيكية.",
      category: "ساندوتش بانل",
      location: "جدة - المنطقة الصناعية",
      completionDate: "2024-10-20",
      client: "شركة النور التجارية",
      featured: true,
      projectDuration: "10 أيام",
      projectCost: "80,000 ريال",
      tags: ["ساندوتش بانل", "عزل", "مستودع", "تجاري"],
      materials: ["ساندوتش بانل 10 سم", "هيكل حديدي", "أبواب أوتوماتيكية"],
      mediaItems: [
        {
          type: "IMAGE",
          src: "/uploads/sandwich-panel-1.jpg",
          title: "الواجهة النهائية",
          order: 0
        },
        {
          type: "IMAGE",
          src: "/uploads/sandwich-panel-2.jpg",
          title: "التفاصيل الداخلية",
          order: 1
        }
      ]
    },
    {
      title: "تنسيق حديقة منزلية متكاملة",
      description: "تصميم وتنفيذ مشروع تنسيق حدائق متكامل يشمل زراعة النباتات المحلية وتركيب نظام ري أوتوماتيكي وإنشاء ممرات حجرية وإضافة نافورة مياه.",
      category: "تنسيق حدائق",
      location: "جدة - حي الفيحاء",
      completionDate: "2024-11-30",
      client: "عائلة الأستاذ سعد",
      featured: true,
      projectDuration: "15 يوم",
      projectCost: "45,000 ريال",
      tags: ["تنسيق", "حدائق", "نباتات", "نافورة"],
      materials: ["نباتات محلية", "نظام ري", "أحجار طبيعية", "نافورة مياه"],
      mediaItems: [
        {
          type: "IMAGE",
          src: "/uploads/landscaping-1.webp",
          title: "الحديقة بعد التنسيق",
          order: 0
        }
      ]
    },
    {
      title: "ساتر خشبي للخصوصية - فيلا العائلة الكريمة",
      description: "تركيب ساتر خشبي عالي الجودة لضمان الخصوصية وتجميل المكان، بارتفاع 3 أمتار وطول 25 متر، مصنوع من خشب الصنوبر المعالج ضد العوامل الجوية.",
      category: "سواتر",
      location: "جدة - حي الروضة",
      completionDate: "2024-11-10",
      client: "الأستاذ خالد العمري",
      featured: false,
      projectDuration: "4 أيام",
      projectCost: "18,000 ريال",
      tags: ["ساتر", "خشبي", "خصوصية", "معالج"],
      materials: ["خشب صنوبر معالج", "براغي مجلفنة", "مواد عزل"],
      mediaItems: [
        {
          type: "IMAGE",
          src: "/uploads/sawater-1.webp",
          title: "الساتر النهائي",
          order: 0
        },
        {
          type: "IMAGE",
          src: "/uploads/sawater-2.webp",
          title: "تفاصيل التشطيب",
          order: 1
        }
      ]
    },
    {
      title: "خيمة ملكية فاخرة للمناسبات",
      description: "تأجير وتركيب خيمة ملكية فاخرة بمساحة 12×20 متر لحفل زفاف، مع كامل التشطيبات الداخلية والإضاءة الملكية والتكييف، تصميم كلاسيكي أنيق.",
      category: "خيام ملكية",
      location: "جدة - قاعة الأفراح الذهبية",
      completionDate: "2024-11-25",
      client: "عائلة المهندس فهد",
      featured: true,
      projectDuration: "يومين",
      projectCost: "35,000 ريال",
      tags: ["خيمة", "ملكية", "زفاف", "فاخرة"],
      materials: ["قماش ملكي فاخر", "إضاءة كريستال", "تكييف", "موكيت فاخر"],
      mediaItems: [
        {
          type: "IMAGE",
          src: "/uploads/khayyam-1.webp",
          title: "الخيمة الملكية",
          order: 0
        }
      ]
    },
    {
      title: "بيت شعر تراثي أصيل للاستراحة",
      description: "بناء وتأسيس بيت شعر تراثي أصيل للاستراحة بمساحة 8×12 متر، مصنوع من أجود أنواع الشعر الطبيعي مع الحفاظ على الطابع التراثي الأصيل.",
      category: "بيوت شعر",
      location: "منطقة الطائف - طريق المدينة",
      completionDate: "2024-10-15",
      client: "الشيخ عبدالعزيز النميري",
      featured: false,
      projectDuration: "7 أيام",
      projectCost: "40,000 ريال",
      tags: ["بيت شعر", "تراثي", "أصيل", "استراحة"],
      materials: ["شعر طبيعي", "أعمدة خشبية", "حبال قوية", "أوتاد حديدية"],
      mediaItems: [
        {
          type: "IMAGE",
          src: "/uploads/byoot-shaar-1.webp",
          title: "بيت الشعر التراثي",
          order: 0
        }
      ]
    }
  ];

  console.log('🚀 بدء إضافة المشاريع...');

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    try {
      console.log(`📤 إضافة المشروع ${i + 1}/${projects.length}: ${project.title}`);

      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ تم إضافة: ${result.title}`);
      } else {
        const error = await response.json();
        console.error(`❌ فشل في إضافة ${project.title}:`, error);
      }

      // انتظار قصير بين الطلبات
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.error(`❌ خطأ في إضافة ${project.title}:`, error);
    }
  }

  console.log('🎉 انتهى من إضافة جميع المشاريع!');
}

// دالة لإضافة مشروع واحد فقط
async function addSingleProject(projectData) {
  try {
    console.log(`📤 إضافة مشروع: ${projectData.title}`);

    const response = await fetch('/api/portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`✅ تم إضافة المشروع بنجاح:`, result);
      return result;
    } else {
      const error = await response.json();
      console.error(`❌ فشل في إضافة المشروع:`, error);
      throw error;
    }
  } catch (error) {
    console.error(`❌ خطأ في إضافة المشروع:`, error);
    throw error;
  }
}

// مثال لاستخدام الدوال:
// addSampleProjects(); // لإضافة جميع المشاريع
// أو
// addSingleProject(projectData); // لإضافة مشروع واحد

console.log('📋 السكريبت جاهز! استخدم:');
console.log('- addSampleProjects() لإضافة جميع المشاريع التجريبية');
console.log('- addSingleProject(data) لإضافة مشروع واحد');
