'use client';

import { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

const sampleReviews: Review[] = [
  {
    id: '1',
    name: 'محمد السالم',
    rating: 5,
    comment: 'خدمة ممتازة وفريق احترافي جداً. أنصح الجميع بهم!',
    date: '2024-11-21',
    verified: true,
  },
  {
    id: '2',
    name: 'فاطمة الشهري',
    rating: 5,
    comment: 'تركيب سريع وجودة عالية. ضمان ممتاز وخدمة ما بعد البيع الأفضل.',
    date: '2024-11-20',
    verified: true,
  },
  {
    id: '3',
    name: 'علي الدعجاني',
    rating: 4,
    comment: 'رائع جداً. السعر مناسب والتنفيذ احترافي.',
    date: '2024-11-19',
    verified: true,
  },
];

export function ReviewSystem() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({ name: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const avgRating = (
    sampleReviews.reduce((sum, r) => sum + r.rating, 0) / sampleReviews.length
  ).toFixed(1);

  const handleSubmit = () => {
    if (rating > 0 && formData.name && formData.comment) {
      setSubmitted(true);
      setTimeout(() => {
        setRating(0);
        setFormData({ name: '', comment: '' });
        setSubmitted(false);
      }, 2000);
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">تقييمات العملاء</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-lg text-center"
          >
            <div className="text-4xl font-bold text-primary mb-2">{avgRating}</div>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(parseFloat(avgRating))
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">بناءً على {sampleReviews.length}+ تقييم</p>
          </motion.div>

          {/* Add Review Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700"
          >
            <h3 className="font-bold mb-4">شارك تقييمك معنا</h3>

            {/* Rating Stars */}
            <div className="flex gap-3 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Star
                    className={`w-8 h-8 transition-all ${
                      star <= (hoveredRating || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                </motion.button>
              ))}
            </div>

            {/* Form Fields */}
            <input
              type="text"
              placeholder="اسمك"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg mb-3 dark:bg-gray-700"
            />

            <textarea
              placeholder="تقييمك"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg mb-3 dark:bg-gray-700"
            />

            <motion.button
              onClick={handleSubmit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-primary text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition"
            >
              <Send className="w-4 h-4" />
              إرسال التقييم
            </motion.button>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg"
              >
                شكراً على تقييمك! ✨
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Reviews List */}
        <div className="mt-12 space-y-4">
          <h3 className="text-xl font-bold mb-6">آخر التقييمات</h3>
          {sampleReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-primary"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
              {review.verified && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-3">✓ تم التحقق من الشراء</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
