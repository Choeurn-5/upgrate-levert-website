import { BlogPost } from '../types';

export const BLOG_CATEGORIES = [
  'All Stories',
  'Temple Guides',
  'Siem Reap Insider',
  'Khmer Gastronomy',
  'Wellness & Retreat',
  'Hotel News & Stories',
] as const;

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'angkor-wat-sunrise-guide-secrets',
    title: 'The Connoisseur’s Guide to Angkor Wat Sunrise: Secrets for an Unforgettable Dawn',
    excerpt: 'Experience the magic of twilight reflecting over the ancient lotus ponds of Angkor Wat with insider timing, crowd avoidance tips, and post-dawn breakfast spots.',
    content: `## The Timeless Magic of Dawn at Angkor

There are few sights in Southeast Asia as emotionally evocative as watching the first pale lavender hues of dawn give way to amber gold behind the iconic five lotus towers of **Angkor Wat**. For centuries, pilgrims, archaeologists, and curious wanderers have stood in hushed reverence as the silhouette of the world's largest religious monument slowly awakens from the darkness.

However, experiencing this wonder gracefully requires careful planning. Here is our concierge team's curated guide to ensuring your Angkor Wat sunrise is serene, comfortable, and truly unforgettable.

---

### 1. Timing Is Everything: The Ideal Departure Window

Many first-time visitors underestimate the logistics of early morning entry. 

* **4:45 AM Departure:** We strongly recommend departing Le Vert Angkor Hotel no later than 4:45 AM. Our hotel is positioned conveniently just 15 minutes by chauffeured car from the Angkor Archaeological Park checkpoint.
* **5:15 AM Arrival at the West Gate:** Arriving by 5:15 AM allows you to cross the ancient stone causeway under a blanket of stars before the main wave of group tour buses arrives.
* **5:45 AM – 6:15 AM Golden Hour:** The softest pastel sky usually appears 20 to 30 minutes *before* the sun physically crests the central sanctuary tower.

> **Concierge Tip:** Ask our front desk the evening prior for an **Early Bird Temple Breakfast Box**. Our kitchen team will pack freshly baked croissants, fresh tropical fruit, boiled farm eggs, and artisanal Cambodian coffee ready for your dawn departure.

---

### 2. Choosing Your Vantage Point: Left Pond vs. Hidden Angles

Most visitors crowd around the **Northern (Left) Reflection Pond**. While this classic angle provides the postcard-perfect double reflection of the towers, it can get crowded during peak season.

Consider these insider alternatives:
* **The Southern (Right) Pond:** Often half as crowded as the northern pond, with identical morning reflection quality and surrounding palm trees framing the composition.
* **The Outer Gallery Grasslands:** Position yourself slightly further back along the ancient library terraces. You will capture the wide panoramic scale of the temple with the reflection pond softly nestled in the foreground.
* **Upper Level Entry at 6:30 AM:** As soon as the sun rises, 90% of sunrise watchers immediately head toward the exits or restaurants. This is precisely the moment to step inside the central galleries while the corridors are serene and cool.

---

### 3. What to Pack for the Morning

Dress with both reverence and tropical practicality in mind:
* **Respectful Attire:** Shoulders and knees must remain covered in accordance with the Angkor Code of Conduct (lightweight linen pants and breathable cotton shirts work best).
* **Footwear:** Comfortable walking shoes with good tread for uneven sandstone steps.
* **Small Torch or Phone Flashlight:** Essential for navigating the historic causeway before dusk dissolves.
* **Hydration:** Chilled bottled mineral water (complimentary in our hotel chauffeured tour vehicles).

---

### 4. Returning to Le Vert for Rest and Rejuvenation

After walking through the central sanctuaries between 6:30 AM and 8:30 AM, the equatorial sun begins to warm the stone courtyards. 

This is the perfect juncture to return to Le Vert Angkor Hotel. Relax by our **crystal-clear rooftop saltwater swimming pool**, indulge in our full gourmet breakfast menu, and schedule a restorative **60-minute Khmer herbal foot acupressure session at Le Vert Spa** before setting out for your afternoon temple circuit.`,
    coverImage: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1600&q=85',
    category: 'Temple Guides',
    tags: ['Angkor Wat', 'Sunrise Guide', 'Photography', 'Siem Reap Tips'],
    author: {
      name: 'Sophea Chan',
      role: 'Chief Concierge & Heritage Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2026-03-20',
    readTimeMinutes: 6,
    isFeatured: true,
    status: 'published',
  },
  {
    id: 'post-2',
    slug: 'authentic-khmer-cuisine-flavors-siem-reap',
    title: 'Tasting Siem Reap: An Insider Journey into Authentic Khmer Flavors',
    excerpt: 'From silky Fish Amok steamed in banana leaf baskets to fragrant Kampot pepper beef Lok Lak, explore the rich culinary heritage waiting at Le Vert Restaurant.',
    content: `## Beyond the Temples: The Subtle Art of Cambodian Gastronomy

While Angkor Wat commands the eyes of the world, Cambodian cuisine captivates the palate with an elegant balance of flavors that many international travelers are just beginning to discover. 

Unlike the fiery heat often associated with neighboring cuisines, **Khmer gastronomy** focuses on intricate herbal aromatics, subtle citrus brightness, gentle coconut undertones, and the ancient umami complexity of *prahok* and freshwater river fish.

---

### The Soul of Khmer Cooking: Kroeung Paste

At the core of virtually every traditional Cambodian stew, curry, and marinade is **Kroeung**—a fragrant spice paste pounded fresh each morning using a granite mortar and pestle.

The signature Royal Yellow Kroeung incorporates:
* Fresh lemongrass stalks (bruised and finely sliced)
* Wild kaffir lime zest and leaves
* Fresh golden galangal and aromatic turmeric
* Sweet shallots and pungent purple garlic
* Hand-harvested sea salt

The aroma released when fresh Kroeung hits hot coconut oil in the wok is the unmistakable signature fragrance of a traditional Cambodian kitchen.

---

### Two Dishes You Must Savor in Siem Reap

#### 1. Signature Steamed Fish Amok (*Amok Trey*)
Considered Cambodia's undisputed culinary masterpiece, authentic Amok is not a watery soup; it is a delicate savory custard. Fresh Tonle Sap freshwater fish fillet is gently whisked with fresh coconut cream, eggs, yellow kroeung, and native *slok ngor* (morinda leaves) which provide a distinct pleasant herbal bitterness. The mousse is wrapped into an origami-like banana leaf parcel and steamed to cloud-like perfection.

At **Le Vert Restaurant**, our kitchen team prepares Fish Amok using heritage family recipes handed down through three generations of Siem Reap cooks.

#### 2. Wok-Tossed Beef Lok Lak with Kampot Peppercorn Dip
Tender strips of marinated beef flash-seared at high heat with garlic, sweet soy, and crisp onions, served over a bed of garden lettuce, ripe tomatoes, and cucumber. 

The centerpiece of the dish is the dipping sauce: a zesty emulsion of fresh lime juice, sea salt, and hand-crushed **IGP-certified Kampot black peppercorns**, famous worldwide for their eucalyptus and floral fragrance.

---

### Sunset Cocktails at Le Vert Rooftop

After a day traversing the sun-drenched stone galleries of the temples, there is no finer prelude to dinner than our **Angkor Sunset Infusion**—infused with local lemongrass, fresh lime, Cambodian wild honey, and premium botanical rum—served poolside overlooking the tree canopy of Siem Reap.`,
    coverImage: '/images/Home/home-dining-image/0D9A2325.jpg',
    category: 'Khmer Gastronomy',
    tags: ['Khmer Food', 'Fish Amok', 'Lok Lak', 'Dining', 'Cocktails'],
    author: {
      name: 'Chef Rattanak',
      role: 'Executive Chef at Le Vert Angkor',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2026-03-14',
    readTimeMinutes: 5,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-3',
    slug: 'small-circuit-vs-grand-circuit-angkor',
    title: 'Small Circuit vs. Grand Circuit: Which Angkor Itinerary Fits Your Schedule?',
    excerpt: 'A detailed breakdown of temple routes, walking distances, photography highlights, and climate-controlled travel advice for first-time and returning visitors.',
    content: `## Navigating the 400-Square-Kilometer Wonder of Angkor

When planning your Angkor exploration from Le Vert Angkor Hotel, the two fundamental itineraries established during the French conservation era are the **Small Circuit** (*Petit Circuit*) and the **Grand Circuit** (*Grand Circuit*).

Both circuits depart conveniently from Siem Reap town, but each offers a distinctly different atmosphere, architectural rhythm, and physical demand. Here is how to choose the ideal route for your schedule—or combine them into the ultimate 2-day discovery.

---

### The Small Circuit: The Iconic Architectural Giants (17 km Loop)

The Small Circuit concentrates on the most famous, grandest, and artistically dense monuments within the immediate vicinity of Angkor Thom.

* **Angkor Wat:** The masterpiece of classic Khmer art and architecture.
* **Angkor Thom & Bayon:** The enigmatic city center featuring 216 smiling stone faces gazing serene and omniscient in four cardinal directions.
* **Baphuon & Terrace of the Elephants:** Magnificent ceremonial stairways and towering pyramidal bas-reliefs.
* **Ta Prohm ("Tomb Raider Temple"):** The spellbinding monastery where giant silk-cotton tree roots straddle collapsing stone lintels.
* **Banteay Kdei & Srah Srang:** A peaceful Buddhist monastery overlooking the royal bathing reservoir.

**Ideal For:** First-time travelers, photography enthusiasts wanting the world-famous iconic landmarks, and visitors with limited time (1 to 2 days).

**Estimated Duration:** 6 to 8 hours with lunch break.

---

### The Grand Circuit: Expansive Lakes, Wild Nature & Serenity (26 km Loop)

The Grand Circuit ventures slightly further north and east, tracing the outer monumental works constructed by King Jayavarman VII. The temples here feature fewer crowds, vast jungle settings, and fascinating water engineering.

* **Preah Khan:** A sprawling maze of corridors, sacred stupas, and ancient libraries wrapped in jungle vines. Far less crowded than Ta Prohm, allowing for contemplative exploration.
* **Neak Pean:** A tranquil island sanctuary sitting in the center of the Jayatataka Baray, accessed by a long wooden boardwalk across shimmering lotus waters.
* **Ta Som:** A charming boutique temple featuring an iconic rear doorway completely engulfed by a strangler fig tree.
* **East Mebon:** A massive five-tiered mountain temple guarded by monolithic freestanding stone elephants.
* **Pre Rup:** A dramatic laterite pyramid temple, traditionally favored for warm golden hour and sunset views across the Cambodian plains.

**Ideal For:** Returning travelers, nature and jungle lovers, and guests who appreciate quiet temple corridors without heavy tour crowds.

---

### The Le Vert Private Chauffeured Advantage

Visiting Angkor in the tropical heat requires stamina. With our hotel's **Private Chauffeur Tour Service**:
* You travel in climate-controlled SUV or private luxury van comfort between each temple stop.
* Chilled lemongrass scented towels and unlimited bottled cold water await you after every walk.
* Flexible departure timing allows you to take a midday pool break at Le Vert during peak noon heat and resume exploration in the late afternoon glow.`,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    category: 'Temple Guides',
    tags: ['Small Circuit', 'Grand Circuit', 'Bayon', 'Ta Prohm', 'Itinerary'],
    author: {
      name: 'Vireak Meas',
      role: 'Heritage Guide & Tour Coordinator',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2026-03-08',
    readTimeMinutes: 7,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-4',
    slug: 'ancient-khmer-herbal-spa-rituals',
    title: 'The Healing Touch: Ancient Khmer Herbal Traditions & Modern Spa Therapy',
    excerpt: 'Discover how indigenous Cambodian botanicals like lemongrass, kaffir lime, and wild ginger are infused into our signature therapies at Le Vert Spa to restore body and mind.',
    content: `## Rediscovering the Traditional Healing Philosophy of Angkor

In ancient Khmer society, health was viewed not merely as the absence of illness, but as a harmonious equilibrium among the body's four constitutional elements: Earth (*Dat Dey*), Water (*Dat Teuk*), Wind (*Dat Kbal*), and Fire (*Dat Pleung*).

Long before modern wellness spas existed, traditional village healers—known as **Krou Khmer**—harnessed the medicinal vitality of Cambodia's wild jungle herbs, warm herbal steam, and pressure-point bodywork to restore balance to tired travelers and farmers alike.

---

### Indigenous Botanicals at the Heart of Our Treatments

At **Le Vert Spa**, we honor this ancient heritage by hand-sourcing organic herbs from local organic farmers in Siem Reap province:

1. **Wild Lemongrass (*Slek Krey*):** Renowned for its natural antiseptic properties, high citral content, and ability to alleviate muscular soreness while invigorating mental clarity.
2. **Kaffir Lime (*Krouch Saeuch*):** The fragrant rind and crushed leaves stimulate circulation and tone the skin with natural alpha hydroxy acids.
3. **Plai & Wild Turmeric (*Pkar Romdeng*):** A botanical relative of ginger celebrated across Southeast Asian traditional medicine for profound anti-inflammatory benefits on aching joints.
4. **Organic Virgin Coconut Oil:** Cold-pressed in Siem Reap, rich in lauric acid to nourish skin after exposure to tropical sunshine.

---

### The Signature Khmer Herbal Compress (*Kompri*)

One of our guests' most beloved rituals after trekking the stone steps of Angkor is the **Hot Herbal Poultice Therapy**.

Muslin fabric packets packed with coarse sea salt and freshly roasted herbs are gently steamed over boiling water until fragrant oils release. The therapist applies these warm compresses along the body's energy meridian lines with rhythmic circular rolling motions. The gentle moist heat penetrates deep into muscular tissue, softening tension and flushing lactic acid with astonishing speed.

---

### Creating Your Personal Sanctuary

Every treatment at Le Vert Spa begins with an aromatic floral foot bath scented with fresh lime slices and lemongrass sea salt, followed by a chilled infusion of pandan and butterfly pea flower tea.

Whether you choose a gentle 60-minute relaxing oil massage or our comprehensive 120-minute **Angkor Heritage Rejuvenation Package**, your time with us is designed to be a restorative retreat within your journey.`,
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
    category: 'Wellness & Retreat',
    tags: ['Spa & Wellness', 'Khmer Massage', 'Herbal Therapy', 'Relaxation'],
    author: {
      name: 'Bopha Khem',
      role: 'Lead Spa Therapist at Le Vert Spa',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2026-02-28',
    readTimeMinutes: 4,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-5',
    slug: 'siem-reap-after-dark-hidden-cocktails-culture',
    title: 'Siem Reap After Dark: Beyond Pub Street into Hidden Cocktails & Cultural Gems',
    excerpt: 'From artisanal gin lounges in Kandal Village to Phare Circus performances and rooftop pool vistas, here is how to spend an unforgettable evening in Siem Reap.',
    content: `## A City with Two Souls

By daylight, Siem Reap is the peaceful, dust-dappled gateway to the ancient Khmer empire. But as the sun dips below the horizon and the temple gates close, the city transforms into one of the most vibrant, creative, and welcoming evening destinations in Asia.

While nearly every traveler has heard of the neon lights and energetic music of **Pub Street**, there is an entirely different side to Siem Reap's nightlife waiting to be experienced: refined speakeasies, contemporary Khmer circus arts, artisanal night markets, and peaceful riverside cocktail gardens.

---

### 1. Sunset Aperitifs at Le Vert Rooftop Bar

Before venturing out into town, begin your evening right upstairs. From our **Rooftop Pool & Sky Bar**, you can watch the sunset paint the sky in fiery orange over the rooftops and palm trees of Siem Reap. Sip our signature lemongrass-infused gin tonic and enjoy complimentary Khmer spiced roasted peanuts as the evening breeze cools the air.

---

### 2. Witness the Magic of Phare, The Cambodian Circus

Forget traditional animal circuses: **Phare Circus** is an electrifying fusion of theater, live traditional and rock music, dance, and jaw-dropping acrobatics performed by graduates of the renowned Battambang NGO arts school.

Each performance tells a poignant Cambodian folktale or modern story of resilience with extraordinary physical daring, humor, and heart. Our concierge can book VIP front-row tickets and arrange your private round-trip tuk-tuk transfer in minutes.

---

### 3. Stroll Kandal Village & Hup Guan Street

Located just 5 minutes on foot from Le Vert Angkor Hotel, the tree-lined neighborhood of **Kandal Village** is Siem Reap's creative hub. Here you will find:
* Thoughtful boutiques showcasing hand-woven Cambodian silk, ethical silver jewelry, and ceramics.
* French-Khmer wine bars with intimate sidewalk tables.
* Specialty coffee roasters and gelato parlors open late into the evening.

---

### 4. Hidden Cocktail Speakeasies

For discerning cocktail lovers, Siem Reap offers a surprising depth of mixology:
* **Miss Wong:** A 1930s Shanghai-inspired cocktail sanctuary nestled in an alley near the river, famed for house-infused rose gins and dim sum.
* **Asana Old Wooden House:** The last surviving traditional wooden stilt house in the old town, now serving cocktails crafted with infused local rice spirits (*Sombai*).

When you are ready to retire, you can stroll quietly back to your peaceful sanctuary at **Le Vert Angkor Hotel**—tucked safely away from noisy nightlife corridors, ensuring a deep and sound night's sleep before your next morning adventure.`,
    coverImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=85',
    category: 'Siem Reap Insider',
    tags: ['Nightlife', 'Phare Circus', 'Siem Reap', 'Cocktails', 'Kandal Village'],
    author: {
      name: 'Le Vert Concierge Team',
      role: 'Guest Experience & Insider Guides',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2026-02-18',
    readTimeMinutes: 5,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-where-to-eat',
    slug: 'where-to-eat-in-siem-reap-local-favorites',
    title: 'Where to Eat in Siem Reap: From Street Food to Fine Dining',
    excerpt: 'Discover our top recommendations for the best places to eat in Siem Reap, featuring authentic local street food, hidden cafes, and upscale Khmer dining experiences.',
    content: `## A Culinary Adventure in Siem Reap

Siem Reap is not just a destination for ancient temples; it is also a fast-growing hub for incredible food. Whether you are craving a steaming bowl of Nom Banh Chok (Khmer noodles) in the morning or an elegant multi-course tasting menu at night, the city has something for every palate.

Here is our curated guide to the best places to eat in Siem Reap.

---

### 1. Authentic Street Food: Route 60 Market
For the adventurous foodie, the **Kyung Yu Night Market (Route 60)** is where locals go. Open every evening, this bustling stretch is lined with stalls grilling everything from lemongrass-stuffed frogs and skewers of local beef to the famous Cambodian sweet treats like Nom Krok (coconut rice pancakes). 

**What to try:** 
- *Lort Cha* (stir-fried pin noodles with chives, bean sprouts, and a fried egg)
- Fresh tropical fruit smoothies
- Grilled stuffed frog (for the brave!)

### 2. Modern Khmer Fine Dining: Cuisine Wat Damnak
If you are looking for an upscale experience, **Cuisine Wat Damnak** (a regular on Asia's 50 Best Restaurants list) is a must-visit. Chef Joannès Rivière and his team take hyper-local Cambodian ingredients—such as wild water lily, Mekong langoustine, and local truffles—and elevate them into world-class tasting menus.

### 3. Cozy Cafes & Brunch: The Little Red Fox Espresso
Located in the trendy Kandal Village, **The Little Red Fox Espresso** is the perfect spot for your morning caffeine fix before or after a temple run. They serve excellent Australian-style coffee, healthy smoothie bowls, and delicious pastries in a relaxed, artsy environment.

### 4. Dinner at Le Vert Restaurant
Of course, you don't have to go far to experience incredible food! Right here at **Le Vert Angkor Hotel**, our Executive Chef crafts authentic dishes like Fish Amok and Kampot Pepper Beef Lok Lak, using organic ingredients sourced directly from local farmers. Enjoy your meal by the pool or in our elegant dining room.

Bon appétit!`,
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80',
    category: 'Khmer Gastronomy',
    tags: ['Siem Reap', 'Food Guide', 'Street Food', 'Fine Dining', 'Restaurants'],
    author: {
      name: 'Le Vert Concierge Team',
      role: 'Guest Experience & Insider Guides',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2026-03-25',
    readTimeMinutes: 4,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-where-to-relax',
    slug: 'where-to-relax-siem-reap-spa-wellness',
    title: 'Where to Relax in Siem Reap: Spas, Yoga, and Serene Retreats',
    excerpt: 'After days of exploring ancient ruins, your body deserves a break. Here are the best ways to unwind, relax, and rejuvenate in Siem Reap.',
    content: `## Finding Your Zen in the Temple Town

Exploring the vast Angkor Archaeological Park is a breathtaking experience, but the early mornings, intense tropical heat, and miles of walking can leave you physically exhausted. Fortunately, Siem Reap is also a premier destination for wellness, offering world-class spas, yoga studios, and peaceful retreats.

Here are our top recommendations for where to relax in Siem Reap.

---

### 1. Traditional Khmer Massage at Le Vert Spa
The most convenient and luxurious way to unwind is right inside our hotel at **Le Vert Spa**. We highly recommend the Traditional Khmer Body Massage—a therapeutic, oil-free massage that uses deep pressure and stretching to relieve muscle tension. For ultimate relaxation, try our *Angkor Heritage Rejuvenation Package*, which includes an herbal compress therapy.

### 2. Yoga and Meditation Classes
Siem Reap has a thriving wellness community. We recommend visiting places like **Navutu Dreams Resort & Wellness Retreat** or **Angkor Bodhi Tree** for drop-in yoga classes. Whether you prefer a gentle restorative Yin Yoga session or an energizing Vinyasa flow, these studios provide peaceful sanctuaries away from the bustling town.

### 3. A Day Pass at a Luxury Pool
If you just want to read a book and sip a coconut, spending the day by a beautiful pool is the perfect remedy. While Le Vert Angkor Hotel has its own stunning **Rooftop Swimming Pool & Sun Deck** exclusively for our guests, there are also several tropical garden pools around town that offer day passes if you want a change of scenery.

### 4. Mindful Walks in the Royal Independence Gardens
For a peaceful afternoon stroll, head to the **Royal Independence Gardens** along the Siem Reap River. These manicured gardens are home to hundreds of giant fruit bats hanging in the tall trees. It is a quiet, shaded area perfect for a mindful walk, meditation, or simply sitting on a bench and watching the world go by.

Take the time to listen to your body and balance your temple adventures with deep relaxation!`,
    coverImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80',
    category: 'Wellness & Retreat',
    tags: ['Siem Reap', 'Spa', 'Yoga', 'Relaxation', 'Wellness'],
    author: {
      name: 'Bopha Khem',
      role: 'Lead Spa Therapist at Le Vert Spa',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2026-04-05',
    readTimeMinutes: 4,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-where-to-visit-beyond-angkor',
    slug: 'where-to-visit-beyond-angkor-wat',
    title: 'Where to Visit in Siem Reap (Beyond Angkor Wat)',
    excerpt: 'Angkor Wat is just the beginning. Discover floating villages, mountain waterfalls, and cultural museums that you must visit during your stay in Siem Reap.',
    content: `## Exploring the Hidden Wonders of Siem Reap Province

While the temples of Angkor are the undeniable main attraction, Siem Reap province holds a wealth of natural beauty, living culture, and history waiting to be explored. If you have an extra day or two in your itinerary, we highly recommend venturing beyond the temple walls.

Here are the best places to visit in Siem Reap that aren't Angkor Wat.

---

### 1. Tonle Sap Lake & Kampong Phluk Floating Village
Experience the fascinating aquatic life of Southeast Asia's largest freshwater lake. A boat tour to **Kampong Phluk** reveals a community that lives entirely on the water. During the wet season, the houses sit on towering stilts rising from the flooded mangrove forests. It is an incredible opportunity to witness traditional Cambodian fishing life and catch a spectacular sunset over the water.

### 2. Phnom Kulen National Park (The Sacred Mountain)
Considered the birthplace of the ancient Khmer Empire, **Phnom Kulen** is a lush, forested mountain located about 90 minutes from Siem Reap. 
Highlights include:
- The stunning **Kulen Waterfall**, perfect for a refreshing swim.
- The **River of 1000 Lingas**, where ancient Hindu carvings are etched directly into the riverbed.
- The massive reclining Buddha carved into the top of a giant sandstone boulder at Preah Ang Thom.

### 3. APOPO Visitor Center (The HeroRATs)
For a truly unique and heartwarming experience, visit the **APOPO Visitor Center**. Here, you can learn about and meet the incredible African Giant Pouched Rats (known as HeroRATs) that are trained to detect landmines. It's a fascinating look at how these intelligent animals are helping to clear dangerous areas and save lives in Cambodia.

### 4. Angkor National Museum
Before you even step foot in the temples, a visit to the **Angkor National Museum** provides invaluable context. The museum houses an impressive collection of Khmer artifacts, statues, and multimedia exhibits that explain the history, religion, and rise and fall of the Khmer Empire. It will make your temple visits far more meaningful.

Speak to our front desk team at Le Vert Angkor Hotel, and we can arrange private, air-conditioned transport and expert guides for all of these amazing destinations!`,
    coverImage: 'https://images.unsplash.com/photo-1582236371587-873b22ed7675?auto=format&fit=crop&w=1600&q=80',
    category: 'Siem Reap Insider',
    tags: ['Siem Reap', 'Tonle Sap', 'Kulen Mountain', 'Attractions', 'Travel Guide'],
    author: {
      name: 'Vireak Meas',
      role: 'Heritage Guide & Tour Coordinator',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2026-04-12',
    readTimeMinutes: 5,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-old-market-guide',
    slug: 'old-market-phsar-chas-siem-reap-guide',
    title: 'A Local\'s Guide to Old Market (Phsar Chas): Shopping, Souvenirs & Street Snacks',
    excerpt: 'Discover the vibrant chaos and hidden treasures of Siem Reap\'s most iconic market — from handwoven silk scarves to sizzling Khmer street food.',
    content: `## The Beating Heart of Siem Reap

**Old Market (Phsar Chas)** has been the commercial and cultural center of Siem Reap for over a century. Located just a 5-minute walk from Le Vert Angkor Hotel, this sprawling open-air market is a feast for all senses.

---

### What to Buy

- **Cambodian Silk Scarves & Kramas:** The traditional checkered *krama* scarf is Cambodia's national textile. Pick up beautifully handwoven versions in silk or cotton — perfect gifts.
- **Silver Jewelry:** Artisan-crafted silver rings, bracelets, and earrings featuring Apsara dancer motifs and lotus designs.
- **Kampot Pepper & Spices:** Bring home the world-famous Kampot peppercorns — black, red, or white varieties, vacuum-sealed for freshness.
- **Local Art & Prints:** Small galleries around the market sell original watercolors and prints of Angkor temple scenes.

### What to Eat

- **Num Pang** (Cambodian baguette sandwiches with pâté, pickled vegetables, and herbs)
- **Lok Lak** from the tiny stalls behind the main building
- **Fresh coconut ice cream** served inside a young coconut shell

### Tips for Visitors

Arrive early in the morning (before 9 AM) to see the fresh produce section at its liveliest, or visit in the cool evening hours when the surrounding streets fill with food vendors and live music.`,
    coverImage: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1600&q=80',
    category: 'Siem Reap Insider',
    tags: ['Old Market', 'Shopping', 'Street Food', 'Siem Reap', 'Souvenirs'],
    author: {
      name: 'Le Vert Concierge Team',
      role: 'Guest Experience & Insider Guides',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2026-04-18',
    readTimeMinutes: 4,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-pub-street-guide',
    slug: 'pub-street-siem-reap-complete-guide',
    title: 'Pub Street Siem Reap: The Complete Visitor\'s Guide to Nightlife & Dining',
    excerpt: 'Everything you need to know about Siem Reap\'s famous Pub Street — the best bars, restaurants, happy hours, and tips for a fun night out.',
    content: `## The Most Famous Street in Siem Reap

**Pub Street** is the vibrant, neon-lit pedestrian strip that has become synonymous with Siem Reap nightlife. Running parallel to the Siem Reap River and just steps from the Old Market, this lively street comes alive every evening with an infectious energy.

---

### Best Bars & Restaurants

- **The Red Piano:** A Siem Reap institution since 2000, famous for the "Tomb Raider" cocktail (Angelina Jolie reportedly drank here during filming).
- **Angkor What? Bar:** The original Pub Street bar with affordable drinks and a rooftop terrace.
- **Khmer Kitchen:** Authentic, affordable Cambodian food right on the strip — their Fish Amok is excellent.
- **Haven Training Restaurant:** A social enterprise restaurant where young Cambodians train in hospitality. The food is outstanding and the cause is wonderful.

### What to Expect

- **Happy Hours** typically run from 4 PM to 8 PM with $0.50 draft beers.
- **Live Music** starts around 8 PM at several venues.
- The street is pedestrian-only from 5 PM onwards.
- The atmosphere is fun and safe but expect persistent tuk-tuk drivers offering rides!

### Our Tip

Start your evening with sunset cocktails at **Le Vert Rooftop Bar**, then walk 5 minutes to Pub Street for dinner and entertainment. You get the best of both worlds — a serene start and a lively finish!`,
    coverImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=80',
    category: 'Siem Reap Insider',
    tags: ['Pub Street', 'Nightlife', 'Bars', 'Siem Reap', 'Dining'],
    author: {
      name: 'Le Vert Concierge Team',
      role: 'Guest Experience & Insider Guides',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2026-04-25',
    readTimeMinutes: 4,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-phare-circus',
    slug: 'phare-cambodian-circus-siem-reap-must-see',
    title: 'Phare, The Cambodian Circus: Why It\'s the #1 Must-See Show in Siem Reap',
    excerpt: 'An electrifying fusion of acrobatics, theater, music, and Cambodian storytelling — discover why Phare Circus is rated the top evening experience in Siem Reap.',
    content: `## More Than a Circus — A Cambodian Story

**Phare, The Cambodian Circus** is not your typical circus. There are no animals, no giant tent rings. Instead, Phare delivers an extraordinary blend of acrobatics, contortion, theater, live music, and deeply moving Cambodian storytelling.

---

### The Story Behind Phare

Phare was founded in Battambang by graduates of **Phare Ponleu Selpak**, a renowned NGO arts school that uses creative arts to help vulnerable youth. The performers are graduates of this program, and every ticket sold directly supports art education and social programs for Cambodian youth.

### What to Expect

- **60-minute shows** that rotate nightly, each telling a different story rooted in Cambodian folklore, history, or modern social themes.
- **Jaw-dropping acrobatics** — backflips, human towers, fire breathing, and aerial silk performances.
- **Live traditional and rock music** performed by a talented band alongside the action.
- **Pre-show market** with food, drinks, and Cambodian handicrafts.

### Practical Information

- Shows start at **8:00 PM** nightly.
- **VIP and Standard seating** available.
- Located about 10 minutes by tuk-tuk from Le Vert Angkor Hotel.
- Our front desk can book your tickets and arrange round-trip transportation.

This is a truly unforgettable evening experience that we recommend to every single guest at Le Vert!`,
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=80',
    category: 'Siem Reap Insider',
    tags: ['Phare Circus', 'Entertainment', 'Culture', 'Siem Reap', 'Must-See'],
    author: {
      name: 'Le Vert Concierge Team',
      role: 'Guest Experience & Insider Guides',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2026-05-02',
    readTimeMinutes: 4,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-battambang-day-trip',
    slug: 'battambang-day-trip-from-siem-reap-guide',
    title: 'Battambang Day Trip: Colonial Architecture, Bamboo Trains & the Bat Cave',
    excerpt: 'Discover Cambodia\'s charming second city with its French colonial streets, the legendary Bamboo Train, and the spectacular bat exodus at Phnom Sampeau.',
    content: `## Cambodia's Best-Kept Secret City

Just 3 hours from Siem Reap, **Battambang** is Cambodia's second-largest city and one of its most charming. With beautifully preserved French colonial architecture, a thriving arts scene, and stunning countryside, it makes for a perfect day trip or overnight adventure.

---

### Highlights of a Battambang Day Trip

#### 1. The Bamboo Train (Norry)
Ride the legendary **Bamboo Train** — a simple bamboo platform on wheels that glides along old French railway tracks through lush rice paddies. It is a one-of-a-kind experience unique to Cambodia.

#### 2. French Colonial Architecture
Stroll along the **Sangker River** to admire well-preserved colonial-era shophouses, the Provincial Hall, and the iconic Governor's Residence.

#### 3. Phnom Sampeau (The Killing Cave & Bat Cave)
Visit the sobering **Killing Cave**, a memorial to victims of the Khmer Rouge era. Then at dusk, witness millions of bats streaming out of the nearby **Bat Cave** in a swirling ribbon that stretches across the sky — a truly spectacular natural phenomenon.

#### 4. Phare Ponleu Selpak
Visit the **original Phare arts school** where the famous Phare Circus performers trained. You can watch students rehearsing and visit their gallery.

### Getting There

Our hotel can arrange a comfortable, air-conditioned private car with an English-speaking driver for the round trip. Depart early morning and return by sunset.`,
    coverImage: 'https://images.unsplash.com/photo-1616453915152-780c1df0f4e1?auto=format&fit=crop&w=1600&q=80',
    category: 'Siem Reap Insider',
    tags: ['Battambang', 'Day Trip', 'Bamboo Train', 'Bat Cave', 'Cambodia'],
    author: {
      name: 'Vireak Meas',
      role: 'Heritage Guide & Tour Coordinator',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2026-05-10',
    readTimeMinutes: 4,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-beng-mealea-guide',
    slug: 'beng-mealea-temple-jungle-adventure-guide',
    title: 'Beng Mealea: The Jungle Temple Adventure You Can\'t Miss',
    excerpt: 'Discover the sprawling, vine-covered ruins of Beng Mealea — one of the most atmospheric and adventurous temple experiences outside the main Angkor park.',
    content: `## The Indiana Jones Temple

If you have already explored the main Angkor temples and want something more adventurous and off-the-beaten-path, **Beng Mealea** is the temple for you. Located about 70 km east of Siem Reap, this massive 12th-century Hindu temple has been left largely unrestored, creating an incredibly atmospheric experience.

---

### Why Visit Beng Mealea?

- **Unrestored and Wild:** Unlike the manicured paths of Angkor Wat, Beng Mealea is largely consumed by jungle. Giant trees burst through crumbling stone walls, moss blankets ancient corridors, and collapsed galleries create a maze of rubble.
- **Far Fewer Crowds:** Because of its distance from Siem Reap, Beng Mealea sees only a fraction of the visitors that the main Angkor complex gets. You can explore in peaceful solitude.
- **Adventure Atmosphere:** Wooden walkways wind through the ruins, but you can also scramble over fallen stone blocks and through dark, vine-draped corridors. It genuinely feels like discovering a lost temple.

### Practical Tips

- **Getting There:** About 1.5 hours by car from Siem Reap. Our hotel can arrange a private vehicle.
- **Combine It:** Beng Mealea pairs perfectly with a visit to **Koh Ker** (the ancient 10th-century pyramid temple) for a full-day expedition.
- **Bring:** Good walking shoes, insect repellent, and a flashlight for the dark corridors.
- **Entry:** Covered by the Angkor Pass.`,
    coverImage: 'https://images.unsplash.com/photo-1582236371587-873b22ed7675?auto=format&fit=crop&w=1600&q=80',
    category: 'Temple Guides',
    tags: ['Beng Mealea', 'Temples', 'Adventure', 'Off-the-beaten-path', 'Siem Reap'],
    author: {
      name: 'Sophea Chan',
      role: 'Chief Concierge & Heritage Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2026-05-18',
    readTimeMinutes: 4,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-cycling-siem-reap',
    slug: 'cycling-siem-reap-countryside-villages-rice-paddies',
    title: 'Cycling Through Siem Reap: Villages, Rice Paddies & Hidden Pagodas',
    excerpt: 'One of the best ways to experience the real Cambodia is by bicycle. Explore quiet village paths, emerald rice paddies, and friendly local communities.',
    content: `## Slow Travel at Its Best

While most visitors to Siem Reap explore by tuk-tuk or air-conditioned car, cycling offers a completely different and deeply rewarding perspective. The flat terrain, quiet back roads, and friendly local communities make Siem Reap one of the best cycling destinations in Southeast Asia.

---

### Best Cycling Routes

#### 1. The Countryside Loop (15 km)
Head south from Le Vert Angkor Hotel through **Steung Thmei Village** and follow the quiet red-dirt paths past emerald green rice paddies, lotus ponds, and palm-sugar farms. Stop at a family-run palm sugar workshop to taste fresh-squeezed palm juice and see how traditional palm sugar is made.

#### 2. Angkor Temples by Bike (17 km Small Circuit)
Cycling between the temples is magical in the early morning. The tree-lined roads connecting Angkor Wat, Bayon, and Ta Prohm are flat and well-maintained, with dappled shade from towering trees.

#### 3. Floating Village Road (25 km)
For a longer ride, follow **National Road 63** south toward Tonle Sap Lake. The road passes through several authentic Cambodian villages with stilted houses, small markets, and waving children.

### Practical Tips

- **Bike Rental:** Our hotel can arrange quality mountain bike rentals for $3–5 per day.
- **Best Time:** Early morning (6–9 AM) before the heat, or late afternoon (4–5:30 PM) for golden light.
- **Bring:** Sunscreen, a hat, water bottle, and your camera.
- **Safety:** Stick to back roads where traffic is minimal. Always carry your hotel business card for directions.`,
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1600&q=80',
    category: 'Siem Reap Insider',
    tags: ['Cycling', 'Countryside', 'Villages', 'Siem Reap', 'Eco-Tourism'],
    author: {
      name: 'Vireak Meas',
      role: 'Heritage Guide & Tour Coordinator',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2026-05-25',
    readTimeMinutes: 4,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-cambodian-festivals',
    slug: 'cambodian-festivals-best-time-to-visit-siem-reap',
    title: 'Cambodian Festivals: The Best Times to Visit Siem Reap',
    excerpt: 'Plan your trip around Cambodia\'s most vibrant festivals — from the Water Festival boat races to Khmer New Year celebrations in the temples.',
    content: `## Experience Cambodia's Living Culture

Cambodia's festivals are among the most colorful and joyous celebrations in Southeast Asia. Timing your visit to coincide with one of these events adds an extraordinary cultural layer to your temple explorations.

---

### The Major Festivals

#### 1. Khmer New Year (Choul Chnam Thmey) — April 13–16
The biggest celebration of the year! For three days, the entire country is in festive mode. Temples are decorated with flowers, families gather for feasts, and traditional games fill the streets. In Siem Reap, the atmosphere around the temples and the riverside is electric.

#### 2. Water Festival (Bon Om Touk) — November
Celebrating the reversal of the Tonle Sap River's flow, the **Water Festival** features dramatic longboat races on the Siem Reap River, illuminated floating lanterns, and fireworks. The atmosphere is carnival-like with food stalls, live music, and hundreds of thousands of celebrants.

#### 3. Pchum Ben (Ancestor's Day) — September/October
One of Cambodia's most important spiritual holidays. Families visit pagodas to offer food to the spirits of their ancestors over 15 days. It is a deeply moving and respectful tradition to witness.

#### 4. Visak Bochea (Buddha's Birthday) — May
A serene celebration of the birth, enlightenment, and passing of the Buddha. Beautiful candlelit processions circle the temples in the evening.

### Planning Tips

During major festivals, Siem Reap fills up quickly! We recommend booking your stay at Le Vert Angkor Hotel well in advance to secure your room.`,
    coverImage: 'https://images.unsplash.com/photo-1596765792518-e37ea3df7409?auto=format&fit=crop&w=1600&q=80',
    category: 'Siem Reap Insider',
    tags: ['Festivals', 'Khmer New Year', 'Water Festival', 'Culture', 'Best Time to Visit'],
    author: {
      name: 'Le Vert Concierge Team',
      role: 'Guest Experience & Insider Guides',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2026-06-01',
    readTimeMinutes: 4,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-photography-spots',
    slug: 'best-photography-spots-siem-reap-angkor',
    title: '10 Best Photography Spots in Siem Reap & Angkor',
    excerpt: 'From the iconic Angkor Wat reflection pool to hidden jungle temples and golden hour rooftop views — our top picks for stunning photos in Siem Reap.',
    content: `## Capture Unforgettable Moments

Siem Reap and the Angkor Archaeological Park offer some of the most photogenic scenes in the world. Whether you are a professional photographer or just love capturing memories on your phone, these are the spots you cannot miss.

---

### Our Top 10 Photography Spots

1. **Angkor Wat Reflection Pool** — The classic sunrise shot. Arrive before 5:30 AM for the best reflection.
2. **Bayon Temple Face Towers** — The 216 smiling stone faces make for incredible close-up portraits and wide-angle compositions.
3. **Ta Prohm Tree Roots** — The famous strangler fig trees wrapping around stone doorways are endlessly photogenic.
4. **Preah Khan Corridors** — Long, symmetrical stone corridors with beautiful light streaming through windows.
5. **Srah Srang Royal Bathing Pool** — A peaceful alternative sunrise spot with fewer crowds than Angkor Wat.
6. **Phnom Bakheng Sunset** — Panoramic views of the Angkor plain at golden hour.
7. **Bantey Srei Pink Carvings** — The most detailed stone carvings in all of Angkor, glowing pink in morning light.
8. **Tonle Sap Floating Village** — Dramatic stilted houses and fishermen casting nets at sunset.
9. **Le Vert Rooftop Pool** — Our own rooftop offers stunning sunset views over the Siem Reap skyline!
10. **Kandal Village Street Art** — Colorful murals and boutique storefronts in the creative neighborhood just steps from our hotel.

### Photography Tips

- **Golden Hours:** Sunrise (5:30–7 AM) and late afternoon (4–5:30 PM) offer the best warm light.
- **Rainy Season Bonus:** The wet season (June–October) brings dramatic skies, lush green landscapes, and moody temple atmospheres.
- **Respect:** Always ask before photographing monks or local people.`,
    coverImage: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1600&q=80',
    category: 'Temple Guides',
    tags: ['Photography', 'Angkor Wat', 'Siem Reap', 'Golden Hour', 'Travel Tips'],
    author: {
      name: 'Sophea Chan',
      role: 'Chief Concierge & Heritage Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2026-06-08',
    readTimeMinutes: 4,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-family-activities',
    slug: 'best-family-activities-siem-reap-kids',
    title: 'Best Family Activities in Siem Reap: Fun Things to Do with Kids',
    excerpt: 'Traveling with children? Discover the best family-friendly activities in Siem Reap — from cooking classes to quad biking, zip-lining, and temple treasure hunts.',
    content: `## Siem Reap is a Family Paradise

Siem Reap is not just for history buffs and backpackers — it is an incredible destination for families too! With a mix of educational, adventurous, and fun activities, your kids will have just as much fun as the adults.

---

### Top Family Activities

#### 1. Khmer Cooking Class
Several cooking schools in town offer **kid-friendly classes** where the whole family learns to make traditional Cambodian dishes like spring rolls, Fish Amok, and mango sticky rice. It is hands-on, fun, and you get to eat everything you make!

#### 2. Quad Biking Through Rice Paddies
For older kids and teens, **quad bike tours** through the Siem Reap countryside are a thrilling adventure. Ride through muddy trails, splash through puddles, and explore remote villages.

#### 3. Angkor Zip Line
**Angkor Zipline** offers a canopy tour through the jungle with zip lines, sky bridges, and rappelling — all with professional guides and safety gear. Minimum age is typically 5 years.

#### 4. Temple Treasure Hunt
Turn your temple visit into an adventure! Before visiting Angkor Wat or Bayon, create a scavenger hunt list for your kids: "Find an Apsara dancer carving," "Spot a monkey," "Count the face towers at Bayon." It keeps them engaged and excited.

#### 5. Artisans Angkor Workshop
Visit **Artisans Angkor** for free guided tours of their silk weaving and stone-carving workshops. Kids love watching artisans at work, and the shop has beautiful (and affordable) souvenirs.

### Family-Friendly Dining at Le Vert

Our restaurant serves kid-friendly options including pasta, burgers, french fries, and fresh fruit smoothies alongside our Khmer specialties. We also offer Family Suite accommodations designed specifically for comfortable family stays.`,
    coverImage: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1600&q=80',
    category: 'Siem Reap Insider',
    tags: ['Family Travel', 'Kids Activities', 'Siem Reap', 'Cooking Class', 'Adventure'],
    author: {
      name: 'Le Vert Concierge Team',
      role: 'Guest Experience & Insider Guides',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2026-06-15',
    readTimeMinutes: 4,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-angkor-pass-guide',
    slug: 'angkor-pass-guide-which-ticket-to-buy',
    title: 'Angkor Pass Explained: Which Ticket Should You Buy? (1-Day, 3-Day, or 7-Day)',
    excerpt: 'A practical breakdown of the Angkor Pass options, pricing, what\'s included, and our expert recommendation on how many days you actually need.',
    content: `## Everything You Need to Know About the Angkor Pass

Planning your temple visit starts with one important decision: **which Angkor Pass should you buy?** Here is a clear, practical guide based on our years of experience helping guests at Le Vert Angkor Hotel.

---

### The Three Options

| Pass Type | Duration | Price (2026) |
|-----------|----------|-------------|
| **1-Day Pass** | 1 calendar day | $37 USD |
| **3-Day Pass** | Any 3 days within 10 days | $62 USD |
| **7-Day Pass** | Any 7 days within 1 month | $72 USD |

### Our Recommendations

- **First-time visitors with limited time:** The **1-Day Pass** is sufficient if you focus on the Small Circuit (Angkor Wat, Bayon, Ta Prohm). Start at sunrise and end at sunset.
- **Most travelers (recommended):** The **3-Day Pass** is the sweet spot. Day 1 for the Small Circuit, Day 2 for the Grand Circuit (Preah Khan, Neak Pean, Pre Rup), and Day 3 for outer temples like Banteay Srei.
- **Temple enthusiasts & photographers:** The **7-Day Pass** lets you revisit favorites at different times of day and explore remote sites like Beng Mealea and Koh Ker at leisure.

### Important Tips

- **Photos are taken at the ticket office** — no need to bring a passport photo.
- **Passes are checked at every temple** — always carry yours.
- **The ticket office** is located on the road to Angkor, about 10 minutes from our hotel.
- **Beng Mealea** is now included in the Angkor Pass (previously a separate ticket).

Our concierge team is happy to help you decide which pass is best for your itinerary!`,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    category: 'Temple Guides',
    tags: ['Angkor Pass', 'Tickets', 'Planning', 'Temple Guide', 'Budget Tips'],
    author: {
      name: 'Sophea Chan',
      role: 'Chief Concierge & Heritage Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2026-06-22',
    readTimeMinutes: 4,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-rainy-season-travel',
    slug: 'visiting-siem-reap-rainy-season-guide',
    title: 'Why You Should Visit Siem Reap in Rainy Season (The Secret Best Time)',
    excerpt: 'Think rainy season is bad for travel? Think again. Discover why June to October might actually be the best time to explore Angkor and Siem Reap.',
    content: `## The Best-Kept Secret in Cambodian Travel

Most travel guides tell you to visit Siem Reap during the dry season (November to March). But experienced travelers and photographers know that the **rainy season (June to October)** offers some of the most magical and rewarding experiences — with far fewer crowds and lower prices.

---

### Why Rainy Season is Amazing

#### 1. Dramatically Fewer Crowds
During rainy season, tourist numbers drop by over 50%. You can explore **Angkor Wat almost entirely to yourself** in the early morning. The corridors of Ta Prohm, usually packed shoulder-to-shoulder, become eerily peaceful.

#### 2. Lush Green Landscapes
The temples transform after the rains. Moats fill to the brim with crystal-clear water, moss blankets the ancient stones in vivid green, and the surrounding jungle becomes impossibly lush and vibrant.

#### 3. Incredible Photography
Dramatic cloud formations, misty temple mornings, reflections in rain-filled moats, and golden light breaking through storm clouds create photographs that dry-season visitors simply cannot capture.

#### 4. Lower Prices
Hotels, tours, and flights are all significantly cheaper during green season. You can enjoy a higher level of luxury for less.

### But What About the Rain?

- Rain typically falls in **short, intense afternoon bursts** (1–2 hours), not all day.
- Mornings are usually sunny and clear — perfect for temple visits.
- Temperatures are slightly cooler and more comfortable than the scorching March–May heat.

### Our Rainy Season Tip

Bring a compact rain poncho (available at Old Market for $1), waterproof shoes, and embrace the adventure. Some of our most delighted guests have visited during rainy season!`,
    coverImage: 'https://images.unsplash.com/photo-1549429402-999335607a75?auto=format&fit=crop&w=1600&q=80',
    category: 'Siem Reap Insider',
    tags: ['Rainy Season', 'Green Season', 'Best Time to Visit', 'Travel Tips', 'Siem Reap'],
    author: {
      name: 'Vireak Meas',
      role: 'Heritage Guide & Tour Coordinator',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: '2026-06-30',
    readTimeMinutes: 4,
    isFeatured: false,
    status: 'published',
  },
];
