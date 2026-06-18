import { motion } from 'framer-motion'

const SMOOTHIE_IMG = 'https://res.cloudinary.com/dazv72mhz/image/upload/v1781722506/smoothie_ff99dn.jpg'
const LEMONADE1_IMG = 'https://res.cloudinary.com/dazv72mhz/image/upload/v1781722506/lemonad_it30xy.jpg'
const LEMONADE2_IMG = 'https://res.cloudinary.com/dazv72mhz/image/upload/v1781722505/lemonad2_mxnvux.jpg'
const STICKER_IMG = 'https://res.cloudinary.com/dazv72mhz/image/upload/v1781722506/kcblendz_sticker_ffhzop.jpg'

const PRODUCTS = [
  {
    name: 'Zobo Blend',
    description: 'A bold, naturally sweetened hibiscus refresher.',
    image: SMOOTHIE_IMG,
  },
  {
    name: 'Tiger Nut Delight',
    description: 'Creamy, nutty, and packed with natural energy.',
    image: LEMONADE1_IMG,
  },
  {
    name: 'Green Detox',
    description: 'Fresh greens and fruit blended for a clean reset.',
    image: LEMONADE2_IMG,
  },
  {
    name: 'Tropical Fusion',
    description: 'A vibrant mix of tropical fruits in every sip.',
    image: STICKER_IMG,
  },
]

export default function ProductShowcase() {
  return (
    <section id="blends" className="max-w-6xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <p className="font-display font-semibold text-lime uppercase text-sm tracking-wide">
          The Blends
        </p>
        <h2 className="font-display font-bold text-3xl text-ink mt-1">
          Freshly crafted, naturally bold
        </h2>
        <p className="text-neutral mt-2 max-w-xl mx-auto">
          Every KcBlendz drink is made from real fruit and natural ingredients. Here's what you'll
          be tasting on the day.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTS.map((product, i) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-elevated transition-shadow duration-300"
          >
            <div className="h-1 bg-lime" />
            <div className="overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.4 }}
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="font-display font-semibold text-ink">{product.name}</h3>
              <p className="text-neutral text-sm mt-1">{product.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
