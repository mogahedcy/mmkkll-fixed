import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function IndexPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/10">
          <div className="container py-20 md:py-28">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-primary leading-snug">
                  محترفين الديار العالمية
                  <span className="block text-muted-foreground text-2xl md:text-3xl mt-3">
                    مظلات • برجولات • سواتر • ساندوتش بانل • تنسيق حدائق
                  </span>
                </h1>
                <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                  15 عاماً من الخبرة ف�� جدة. تنفيذ احترافي، ضمان 10 سنوات، واستشارة مجانية مع زيارة لقياس الموقع.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="tel:+966553719009" className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-white font-semibold hover:opacity-90">
                    اتصال مباشر: 966553719009+
                  </Link>
                  <Link href="https://wa.me/+966553719009?text=%D8%A7%D8%B1%D9%8A%D8%AF%20%D8%B9%D8%B1%D8%B6%20%D8%B3%D8%B9%D8%B1" className="inline-flex items-center rounded-xl border px-5 py-3 font-semibold hover:bg-accent/10">
                    تواصل واتساب
                  </Link>
                </div>
                <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <li className="bg-white rounded-xl p-3 border">+15 سنة خبرة</li>
                  <li className="bg-white rounded-xl p-3 border">ضمان 10 سنوات</li>
                  <li className="bg-white rounded-xl p-3 border">تركيب احترافي</li>
                  <li className="bg-white rounded-xl p-3 border">زيارات وقياسات مجانية</li>
                </ul>
              </div>
              <div className="relative aspect-[4/3] rounded-3xl border bg-white shadow-xl overflow-hidden">
                <img src="/images/slider1.webp" alt="مشاريع مظلات وبرجولات في جدة" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">خدماتنا الرئيسية</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'مظلات سيارات', href: '/services/mazallat', desc: 'حماية كاملة للمركبات' },
                { name: 'برجولات حدائق', href: '/services/pergolas', desc: 'جمال وظل للحديقة' },
                { name: 'سواتر خصوصية', href: '/services/sawater', desc: 'أمان وخصوصية' },
                { name: 'ساندوتش بانل', href: '/services/sandwich-panel', desc: 'عزل حراري وصوتي' },
                { name: 'ترميم ملحقات', href: '/services/renovation', desc: 'تجديد احترافي' },
                { name: 'تنسيق حدا��ق', href: '/services/landscaping', desc: 'تصميم ومساحات خضراء' },
                { name: 'بيوت شعر', href: '/services/byoot-shaar', desc: 'طابع تراثي فاخر' },
                { name: 'خيام ملكية', href: '/services/khayyam', desc: 'مناسبات فاخرة' },
              ].map((s) => (
                <Link key={s.href} href={s.href} className="group rounded-2xl border bg-white p-5 hover:shadow-lg transition-shadow">
                  <div className="text-lg font-bold text-primary">{s.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.desc}</div>
                  <div className="mt-3 inline-flex text-accent font-semibold">تفاصيل الخدمة →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & CTA */}
        <section className="py-16 bg-gradient-to-br from-accent/10 to-primary/10">
          <div className="container grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-bold text-primary">لماذا نحن؟</h3>
              <ul className="grid grid-cols-2 gap-3 text-sm">
                <li className="rounded-xl bg-white border p-3">+5000 عميل راضٍ</li>
                <li className="rounded-xl bg-white border p-3">خدمة 24/7</li>
                <li className="rounded-xl bg-white border p-3">مواد عالية الجودة</li>
                <li className="rounded-xl bg-white border p-3">أسعار منافسة</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white border p-6">
              <h4 className="text-lg font-bold text-primary mb-3">احصل على عرض سعر مجاني الآن</h4>
              <form className="grid gap-3">
                <input className="border rounded-lg p-3" name="service" placeholder="نوع الخدمة (مثال: مظلات سيارات)" required />
                <input className="border rounded-lg p-3" name="area" placeholder="المنطقة (مثال: شمال جدة)" required />
                <input className="border rounded-lg p-3" name="phone" placeholder="رقم الجوال" required />
                <button type="submit" className="rounded-lg bg-primary text-white font-semibold py-3">
                  إرسال الطلب
                </button>
              </form>
              <div className="text-xs text-muted-foreground mt-2">لن نشارك بياناتك مع أي طرف ثالث.</div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
