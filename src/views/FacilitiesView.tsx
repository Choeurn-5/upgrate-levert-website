import React from 'react';
import { motion } from 'motion/react';
import { 
  Waves, 
  Sun, 
  Clock, 
  Sparkles, 
  Wine, 
  ShieldCheck, 
  Check, 
  Droplets, 
  Sunset, 
  Moon, 
  GlassWater,
  BedDouble,
  Award
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { HeroConfig, AppRoute } from '../types';

interface FacilitiesViewProps {
  heroConfig: HeroConfig;
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: () => void;
  onOpenHeroManager: () => void;
}

const POOL_SPECS = [
  {
    icon: Clock,
    label: 'Opening Hours',
    value: '6:30 AM – 10:00 PM',
    sub: 'Open 7 days a week',
  },
  {
    icon: Waves,
    label: 'Pool Setting',
    value: 'Rooftop Sky Deck',
    sub: 'Panoramic Siem Reap views',
  },
  {
    icon: Droplets,
    label: 'Water & Depth',
    value: '1.2m – 1.6m Depth',
    sub: 'Gentle shallow sun shelf',
  },
  {
    icon: GlassWater,
    label: 'Guest Amenities',
    value: 'Towels & Chilled Water',
    sub: 'Complimentary on pool deck',
  },
];

const POOL_HIGHLIGHTS = [
  {
    title: 'Crystalline Freshwater Pool',
    desc: 'Maintained at the perfect refreshing temperature to revive your body after hours of exploring Angkor Wat and jungle temples.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=85',
    features: [
      'Crystal-clear treated freshwater',
      'Gentle entry steps with handrails',
      'Shallow lounging ledge for relaxing dips',
    ],
  },
  {
    title: 'Teakwood Sun Deck & Daybeds',
    desc: 'Lounge in comfort on handcrafted wooden loungers fitted with plush weather-resistant cushions and wide canvas shade umbrellas.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=85',
    features: [
      'Plush padded sun loungers with adjustable backs',
      'Generous shading umbrellas & tropical potted palms',
      'Dedicated fresh towel station with unlimited supply',
    ],
  },
  {
    title: 'Poolside Bar & Dining Service',
    desc: 'Enjoy refreshing tropical cocktails, fresh young coconuts, chilled draft beers, and Khmer light bites delivered straight to your lounger.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85',
    features: [
      'Freshly cracked organic young coconuts',
      'Artisanal tropical cocktails and local beers',
      'Crispy spring rolls, fruit platters, and light salads',
    ],
  },
  {
    title: 'Sunset Skyline & Ambient Evening',
    desc: 'As the sun descends behind the Siem Reap horizon, our pool deck transforms into an ambient lounge with gentle lighting and evening breezes.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85',
    features: [
      'Unobstructed west-facing golden hour views',
      'Soft atmospheric evening underwater illumination',
      'Soothing ambient background acoustic melodies',
    ],
  },
];

const DAILY_RHYTHM = [
  {
    time: '6:30 AM – 9:30 AM',
    title: 'Morning Calm & Sunrise Laps',
    desc: 'Greet the Siem Reap day with peaceful swimming laps in crisp morning waters before departing for the temple gates.',
    icon: Sun,
    highlight: 'Espresso & fresh fruit juice available on the deck',
  },
  {
    time: '11:30 AM – 3:30 PM',
    title: 'Midday Post-Temple Sanctuary',
    desc: 'The quintessential retreat after temple excursions. Cool down beneath shaded umbrellas with iced lemongrass towels.',
    icon: Droplets,
    highlight: 'Complimentary chilled water & refreshing dip',
  },
  {
    time: '4:30 PM – 7:00 PM',
    title: 'Golden Hour & Sunset Cocktails',
    desc: 'Watch the skies turn to amber and gold as our bartenders shake signature drinks right by the water.',
    icon: Sunset,
    highlight: 'Sunset Happy Hour specials from the Rooftop Bar',
  },
  {
    time: '7:30 PM – 10:00 PM',
    title: 'Starlight Dip & Night Breeze',
    desc: 'Immerse yourself under the Cambodian night sky with softly illuminated pool waters and gentle tropical breezes.',
    icon: Moon,
    highlight: 'Tranquil nighttime atmosphere under the stars',
  },
];

const POOLSIDE_MENU = [
  {
    name: 'Fresh Organic Young Coconut',
    category: 'Botanical & Chilled',
    price: '$2.50',
    desc: 'Whole fresh coconut from local Siem Reap palms, chilled and served with a bamboo straw.',
  },
  {
    name: 'Le Vert Signature Sunset Mojito',
    category: 'Cocktails',
    price: '$5.50',
    desc: 'Cambodian rum, crushed fresh garden mint, local lime, raw sugar cane syrup, and soda water.',
  },
  {
    name: 'Iced Lemongrass & Ginger Tisane',
    category: 'Infusions',
    price: '$3.00',
    desc: 'Cold-steeped organic lemongrass and mountain ginger with wild Kulen honey over crushed ice.',
  },
  {
    name: 'Crispy Siem Reap Spring Rolls',
    category: 'Poolside Bites',
    price: '$4.50',
    desc: 'Golden fried rice paper rolls filled with shredded seasonal vegetables and sweet chili dipping sauce.',
  },
  {
    name: 'Tropical Seasonal Fruit Platter',
    category: 'Light & Healthy',
    price: '$4.00',
    desc: 'Freshly carved sweet mango, dragon fruit, ripe pineapple, and passionfruit with lime wedges.',
  },
  {
    name: 'Cold Angkor Draught Beer',
    category: 'Beers & Cider',
    price: '$3.00',
    desc: 'Ice-cold Cambodian draught beer served in a chilled poolside tumbler.',
  },
];

const POOL_ETIQUETTE = [
  {
    title: 'Exclusive for Hotel Guests',
    desc: 'To preserve serenity and intimacy, our rooftop swimming pool is exclusively reserved for in-house hotel residents.',
  },
  {
    title: 'Fresh Towel Station',
    desc: 'Complimentary plush pool towels are provided on the deck. Please leave used towels in the designated hamper.',
  },
  {
    title: 'Rinse Showers',
    desc: 'We kindly request all guests to enjoy our open-air waterfall shower before entering the swimming pool.',
  },
  {
    title: 'Poolside Safety',
    desc: 'All poolside beverages are served in high-grade shatterproof glassware. Children must be accompanied by an adult.',
  },
];

export const FacilitiesView: React.FC<FacilitiesViewProps> = ({
  heroConfig,
  onNavigate,
  onOpenBooking,
  onOpenHeroManager,
}) => {
  return (
    <div>
      {/* 1. Replaceable Hero */}
      <Hero
        config={heroConfig}
        onPrimaryClick={onOpenBooking}
        primaryButtonText="Book Stay & Pool Access"
        secondaryButtonText="View Guest Suites"
        onSecondaryClick={() => onNavigate('/rooms/')}
        onOpenHeroManager={onOpenHeroManager}
      />

      {/* 2. Quick Spec Badges */}
      <div className="bg-[#1C3829] border-y border-[#2D5540] text-[#FAF8F5] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {POOL_SPECS.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <div key={i} className="flex items-center space-x-3.5">
                  <div className="p-2.5 rounded-2xl bg-[#2D5540]/60 border border-[#C5A880]/30 text-[#DFCAA8] shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-wider uppercase text-[#DFCAA8] font-semibold block">
                      {spec.label}
                    </span>
                    <span className="font-luxury-serif text-sm sm:text-base font-bold text-white block">
                      {spec.value}
                    </span>
                    <span className="text-[11px] text-[#FAF8F5]/70 block font-light">
                      {spec.sub}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Introduction & Highlights */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block">
            Rooftop Sanctuary
          </span>
          <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C3829]">
            A Sky-Blue Oasis Above Siem Reap
          </h2>
          <p className="text-sm sm:text-base text-[#4A554F] font-light leading-relaxed">
            Perched on our rooftop level, the swimming pool at Le Vert Angkor Hotel is designed as an intimate tropical sanctuary. Whether reviving after an inspiring dawn trek through Angkor Wat or basking under warm Cambodian sunshine with an iced coconut, our pool offers peace, comfort, and attentive hospitality.
          </p>
        </div>

        {/* 4. Highlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {POOL_HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#FAF8F5] rounded-3xl overflow-hidden border border-[#E7E0D5] hover:border-[#C5A880] transition-all shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 w-full overflow-hidden bg-stone-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="font-luxury-serif text-2xl font-bold text-[#1C3829] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A554F] font-light leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-[#E7E0D5]">
                    {item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm text-[#1C3829]">
                        <Check className="w-4 h-4 text-[#2D5540] shrink-0" />
                        <span className="font-light">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 5. Daily Rhythm Timeline */}
        <div className="mb-20 bg-[#F2EDE4]/60 rounded-3xl p-8 sm:p-12 border border-[#E7E0D5]">
          <div className="max-w-2xl mx-auto text-center mb-12 space-y-2">
            <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block">
              Daily Ambiance
            </span>
            <h3 className="font-luxury-serif text-2xl sm:text-3xl font-bold text-[#1C3829]">
              The Rhythm of Our Pool Deck
            </h3>
            <p className="text-xs sm:text-sm text-[#68726B] font-light">
              From early morning serenity to vibrant sunset golden hours, every part of the day has its own charm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DAILY_RHYTHM.map((rhythm, idx) => {
              const Icon = rhythm.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-[#E7E0D5] flex flex-col justify-between shadow-sm hover:border-[#C5A880] transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-[#1C3829] text-[#DFCAA8]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-semibold tracking-wider uppercase text-[#C5A880] bg-[#1C3829]/5 px-2.5 py-1 rounded-full">
                        {rhythm.time}
                      </span>
                    </div>
                    <h4 className="font-luxury-serif text-lg font-bold text-[#1C3829]">
                      {rhythm.title}
                    </h4>
                    <p className="text-xs text-[#4A554F] font-light leading-relaxed">
                      {rhythm.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#E7E0D5]/70 text-[11px] text-[#2D5540] font-medium flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>{rhythm.highlight}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. Poolside Bites & Cocktails Menu */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E7E0D5] gap-4">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block">
                Direct Lounger Service
              </span>
              <h3 className="font-luxury-serif text-2xl sm:text-3xl font-bold text-[#1C3829]">
                Poolside Refreshments & Cocktails
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/dining/')}
              className="text-xs font-semibold uppercase tracking-wider text-[#2D5540] hover:text-[#1C3829] flex items-center space-x-1"
            >
              <span>View Full Dining & Bar Menu</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POOLSIDE_MENU.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E7E0D5] hover:border-[#C5A880] transition-colors shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C5A880]">
                      {item.category}
                    </span>
                    <span className="font-luxury-serif text-lg font-bold text-[#1C3829]">
                      {item.price}
                    </span>
                  </div>
                  <h4 className="font-luxury-serif text-base font-bold text-[#1C3829] mb-1.5">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#68726B] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Guest Guidelines & Comfort */}
        <div className="mb-20">
          <div className="max-w-2xl mx-auto text-center mb-10 space-y-2">
            <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block">
              Guest Comfort & Safety
            </span>
            <h3 className="font-luxury-serif text-2xl sm:text-3xl font-bold text-[#1C3829]">
              Pool Guidelines & Serenity
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POOL_ETIQUETTE.map((etq, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E7E0D5] space-y-2"
              >
                <div className="flex items-center space-x-2 text-[#2D5540]">
                  <ShieldCheck className="w-4 h-4" />
                  <h5 className="font-luxury-serif font-bold text-sm text-[#1C3829]">
                    {etq.title}
                  </h5>
                </div>
                <p className="text-xs text-[#68726B] font-light leading-relaxed">
                  {etq.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Bottom Booking Guarantee Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#14281D] text-[#FAF8F5] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#2D5540] text-[#DFCAA8] text-[10px] font-semibold tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              <span>Complimentary For All Hotel Residents</span>
            </div>
            <h3 className="font-luxury-serif text-3xl font-bold text-white">
              Ready to Dive into Relaxation?
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF8F5]/80 font-light leading-relaxed">
              Every room and suite booking at Le Vert Angkor Hotel includes full, unlimited access to our rooftop swimming pool, sun loungers, and complimentary towel service.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-full bg-[#C5A880] text-[#12241A] font-semibold text-xs uppercase tracking-widest hover:bg-[#DFCAA8] transition-colors shadow-lg"
            >
              Reserve Your Stay
            </button>
            <button
              onClick={() => onNavigate('/rooms/')}
              className="px-6 py-4 rounded-full bg-white/10 border border-white/20 text-[#FAF8F5] font-semibold text-xs uppercase tracking-widest hover:bg-white/20 transition-colors"
            >
              Explore Suites
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
