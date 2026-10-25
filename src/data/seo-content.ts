/**
 * Extra on-page copy per shop page (keyed by URL slug): H2 sections and FAQs.
 * Written around the phrases people search for (see docs/keyword-bank.csv) and limited to
 * facts that are true for the whole range. Anything model-specific points to the product page.
 */
export interface PageExtra {
  sections: { h2: string; body: string[] }[];
  faq: { q: string; a: string }[];
}

const LEGAL =
  'Pedal-assist e-bikes limited to 250W and 25 km/h assistance meet the national EN 15194 standard. Rules on age and where you can ride differ by state, so check your state transport authority.';

export const EXTRA: Record<string, PageExtra> = {
  'cheap-electric-bikes': {
    sections: [
      {
        h2: 'How to choose a cheap electric bike',
        body: [
          'A low cost e-bike should still have a reputable motor, a removable battery and reliable brakes. Compare battery capacity (Wh), motor power and frame type before you compare price. Every affordable electric bicycle here lists these specs so you can judge value, not just the price tag.',
        ],
      },
      {
        h2: 'Discount electric bikes with free delivery',
        body: ['All bikes ship free across Australia with a 2-year warranty, and you save a further 10% when you pay by bank transfer, Osko or crypto.'],
      },
    ],
    faq: [
      { q: 'How much does a cheap electric bike cost?', a: 'Every electric bike on this page is priced under $2,000. Use the sort menu to see the lowest prices first.' },
      { q: 'Are cheap e-bikes legal in Australia?', a: LEGAL },
      { q: 'Do cheap e bikes come with a warranty?', a: 'Yes. Every bike we sell includes a 2-year warranty and free delivery across Australia.' },
      { q: 'Is there a discount for paying by bank transfer?', a: 'Yes. You save 10% automatically at checkout when you pay by bank transfer, Osko or crypto.' },
    ],
  },
  'fat-tyre-electric-bikes': {
    sections: [
      {
        h2: 'What is a fat tyre electric bike?',
        body: [
          'Fat tyre e-bikes, also called fat tire ebikes or electric fat bikes, use extra-wide tyres that spread your weight and add grip and cushioning. They suit sand, gravel and rough tracks, and make comfortable relaxed city cruisers.',
        ],
      },
      { h2: 'Fatboy and other fat tyre brands', body: ['Browse Fatboy, NCM, Earth and more. Use the brand filter to narrow the list, and open any bike for its motor, battery and tyre details.'] },
    ],
    faq: [
      { q: 'Are fat tyre electric bikes good on sand?', a: 'Wide, low-pressure tyres give far better grip and float on soft surfaces than standard tyres. Check local rules on where e-bikes may be ridden, including beaches.' },
      { q: 'Do fat tyre e-bikes feel heavy?', a: 'Wide tyres and larger batteries add weight, and the motor assist offsets it while you ride. Weight is listed on each product where available.' },
      { q: 'Are fat tire e-bikes road legal?', a: LEGAL },
    ],
  },
  'step-through-electric-bikes': {
    sections: [
      {
        h2: 'Why choose a step through ebike',
        body: ['A step through frame lowers the entry point so you can mount and dismount without lifting a leg over a high bar. It is popular for commuting, shopping trips and riders who want an easy, upright ride.'],
      },
    ],
    faq: [
      { q: 'Is a step through electric bike good for older riders?', a: 'The low frame makes mounting easier, which many older riders and riders with mobility concerns prefer.' },
      { q: 'What is the difference between step-through and step-over frames?', a: 'A step-over (diamond) frame has a high top tube. A step-through frame drops or removes it for easier access. Both are available across our commuter range.' },
      { q: 'Are step through e-bikes legal in Australia?', a: LEGAL },
    ],
  },
  'electric-mountain-bikes': {
    sections: [
      {
        h2: 'Hardtail or full-suspension e mountain bike?',
        body: [
          'A hardtail eMTB has front suspension only and is lighter and cheaper, which suits fire trails and mixed riding. A full-suspension electric mountain bike adds rear travel for control and comfort on rough, technical trails. Use the Hardtail and Full-Suspension subcategory buttons above to compare.',
        ],
      },
      { h2: 'Mountain ebike brands', body: ['The range includes Trek, Orbea, Focus and Bianchi. The motor system and battery size are listed on every product page.'] },
    ],
    faq: [
      { q: 'What is the difference between an electric mountain bike and a normal e-bike?', a: 'An eMTB has suspension, wider knobby tyres and stronger brakes built for off-road riding. Commuter e-bikes prioritise comfort, racks and lights.' },
      { q: 'Can I ride an electric mountain bike on any trail?', a: 'No. Access rules for e-bikes vary by land manager and state, so check before you ride.' },
      { q: 'Are electric mountain bikes legal on the road?', a: LEGAL },
    ],
  },
  'electric-commuter-bikes': {
    sections: [
      {
        h2: 'What to look for in an electric commuter bike',
        body: [
          'Look for mudguards, a rear rack, integrated lights and an upright riding position. A pedal assist electric bike adds motor power while you pedal, up to 25 km/h, so you arrive without the sweat.',
        ],
      },
      { h2: 'Pedal assist e bikes for adults', body: ['Choose a step-through or diamond frame, then compare battery capacity (Wh) for the range you need. Every listing shows the motor and battery.'] },
    ],
    faq: [
      { q: 'How far can an electric commuter bike go on one charge?', a: 'Range depends on battery size, assist level, rider weight and terrain. Each listing shows battery capacity in Wh to help you compare.' },
      { q: 'Do I need a licence or registration for an e-bike?', a: LEGAL },
      { q: 'What does pedal assist mean?', a: 'The motor only helps while you pedal and cuts out at 25 km/h on compliant models.' },
    ],
  },
  'folding-electric-bikes': {
    sections: [
      {
        h2: 'Foldable electric bikes for small spaces',
        body: ['A folding ebike fits in a car boot, caravan, apartment hallway or under a desk. Many use smaller wheels, often 16 to 20 inch, which makes the bike compact and quick to accelerate.'],
      },
      { h2: 'What to check before buying a folding e bike', body: ['Compare folded size, weight and battery range. These are listed on each product page.'] },
    ],
    faq: [
      { q: 'How small does a foldable electric bike fold?', a: 'Folded dimensions differ by model and are listed on each product page.' },
      { q: 'Can I take a folding e bike on public transport?', a: 'Rules for bikes on trains, trams and buses differ by operator, so check with yours.' },
      { q: 'Are folding electric bikes legal in Australia?', a: LEGAL },
    ],
  },
  'electric-cargo-bikes': {
    sections: [
      { h2: 'Cargo e bikes for family and work', body: ['A cargo ebike carries kids, groceries and gear, and the motor handles the weight on hills. Longtail and front-loader designs suit different needs, so compare load ratings and frame length.'] },
    ],
    faq: [
      { q: 'How much can an electric cargo bike carry?', a: 'Load ratings vary by model and are listed on each product page.' },
      { q: 'Can I fit child seats to a cargo e-bike?', a: 'Many cargo bikes support child seats and accessories. Check compatibility on each listing or ask our team.' },
      { q: 'Are electric cargo bikes road legal?', a: LEGAL },
    ],
  },
  'electric-trikes': {
    sections: [
      {
        h2: 'Electric trikes and 3 wheel electric bikes for adults',
        body: ['An electric trike is stable at a standstill and easy to mount, which suits riders with balance concerns, older riders and anyone carrying a load. Also known as an e trike or electric tricycle, it adds a motor to the comfort of three wheels.'],
      },
    ],
    faq: [
      { q: 'What is the difference between an e trike and an electric tricycle?', a: 'Nothing. Both mean a three wheel electric bike.' },
      { q: 'Do I need a licence to ride an electric trike?', a: 'Rules differ by state and by motor power. Models within national e-bike limits generally follow e-bike rules. Check your state transport authority.' },
      { q: 'Can an electric trike carry cargo?', a: 'Some models have cargo beds or racks. Check the specifications on each listing.' },
    ],
  },
  'electric-road-bikes': {
    sections: [{ h2: 'Electric road and gravel bikes', body: ['Drop-bar e-bikes with efficient tyres suit long rides, hilly routes and fast commutes. Gravel models add wider tyres for unsealed roads and off road ebike adventures.'] }],
    faq: [{ q: 'Are electric road bikes heavy?', a: 'They are lighter than most e-bikes, and weight is listed on each product where available.' }],
  },
  'kids-electric-bikes': {
    sections: [
      {
        h2: 'Choosing an electric bike for a young rider',
        body: [
          'Our youth range includes electric balance bikes for small children and a trail e-bike sized for kids and teens. Check the age, height and inseam guidance on each listing, because a bike that is too big is harder to control and less safe.',
          'Every young rider needs a properly fitted helmet. Browse our helmets in the parts and accessories range and add one to the same order.',
        ],
      },
    ],
    faq: [
      { q: 'What age is an electric balance bike suitable for?', a: 'Electric balance bikes are built for small children who are learning to balance and steer. Follow the age and height guidance on the product page, and always supervise young riders.' },
      { q: 'Are electric bikes for teens legal to ride?', a: 'Age rules for e-bike riders differ by state and are changing, so check your state transport authority before a teenager rides on public roads or paths.' },
    ],
  },
  'ebike-batteries-chargers': {
    sections: [
      {
        h2: 'How to choose an ebike battery',
        body: ['Match the battery voltage, connector and mounting to your bike, and follow the manufacturer compatibility guide. Capacity in Wh sets the range, and a range extender adds capacity to your existing battery.'],
      },
    ],
    faq: [
      { q: 'Will this e bike battery fit my bike?', a: 'Batteries are specific to brand and system. Check each listing for compatibility or ask our team before ordering.' },
      { q: 'Do you sell ebike chargers?', a: 'Yes. Chargers are listed with their voltage and current ratings.' },
    ],
  },
  'trek-electric-bikes': {
    sections: [{ h2: 'Trek electric bikes in Australia', body: ['Trek electric bikes include the Rail electric mountain bike, Marlin+ and Dual Sport+ models and the Allant+ commuter. Open any bike for its motor, battery and size options.'] }],
    faq: [{ q: 'Which Trek e-bikes do you sell?', a: 'We stock Trek electric mountain and commuter bikes. Availability changes, so check each product page for stock.' }],
  },
  'smartmotion-electric-bikes': {
    sections: [{ h2: 'SmartMotion e bikes', body: ['SmartMotion electric bikes cover city, trail and step-through styles. Open any bike for its motor, battery and frame details.'] }],
    faq: [{ q: 'Which SmartMotion e-bikes do you sell?', a: 'We stock SmartMotion models including the Hypersonic Neo, Catalyst, Pacer GT and X-City Neo. Check each product page for stock.' }],
  },
  'ebike-parts-accessories': {
    sections: [{ h2: 'E bike helmets, batteries, locks and parts', body: ['Find ebike helmets from Trek and Bontrager, batteries and chargers, locks, lights, racks and everyday accessories.'] }],
    faq: [
      { q: 'Do you sell e bike helmets?', a: 'Yes. Browse the Helmets & Safety Gear subcategory for Trek and Bontrager helmets.' },
      { q: 'Do you sell ebike batteries?', a: 'Yes. See the Batteries & Chargers subcategory, or open the ebike batteries page.' },
    ],
  },
};
