#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// ============================================================
// PRACTICE DATA — 80 practices across 8 states/territories
// ============================================================
const states = [
  { abbr: 'VIC', name: 'Victoria', slug: 'vic' },
  { abbr: 'NSW', name: 'New South Wales', slug: 'nsw' },
  { abbr: 'QLD', name: 'Queensland', slug: 'qld' },
  { abbr: 'SA', name: 'South Australia', slug: 'sa' },
  { abbr: 'WA', name: 'Western Australia', slug: 'wa' },
  { abbr: 'TAS', name: 'Tasmania', slug: 'tas' },
  { abbr: 'NT', name: 'Northern Territory', slug: 'nt' },
  { abbr: 'ACT', name: 'Australian Capital Territory', slug: 'act' },
];

const practices = {
  vic: [
    {
      name: 'Smile Solutions',
      slug: 'smile-solutions',
      suburb: 'Melbourne',
      address: 'Level 1, 171 Collins Street, Melbourne VIC 3000',
      phone: '(03) 9650 2222',
      website: 'https://www.smilesolutions.com.au',
      description: 'Smile Solutions is one of Melbourne\'s largest and most established multi-specialty dental practices, located in the heart of the CBD on Collins Street. With a team of over 30 dental professionals covering every area of dentistry, they offer comprehensive care from routine check-ups to advanced cosmetic and surgical treatments. The practice is known for its state-of-the-art facilities and patient-centred approach.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Invisalign', 'Teeth Whitening', 'Veneers', 'Root Canal Treatment', 'Periodontics', 'Oral Surgery'],
      highlights: [
        'Over 30 specialists and general dentists under one roof',
        'State-of-the-art CBD practice with panoramic city views',
        'Full range of dental specialties available',
        'Extended hours including Saturday appointments',
        'Digital imaging and 3D scanning technology',
      ],
    },
    {
      name: 'Dentist Melbourne Clinic',
      slug: 'dentist-melbourne-clinic',
      suburb: 'Melbourne',
      address: 'Level 2, 189 Queen Street, Melbourne VIC 3000',
      phone: '(03) 9629 7664',
      website: 'https://www.dentistmelbourne.com.au',
      description: 'Dentist Melbourne Clinic provides high-quality general and cosmetic dentistry in the Melbourne CBD. Conveniently located on Queen Street, the practice offers a wide range of services including preventive care, restorative treatments, and cosmetic procedures. Their experienced team focuses on delivering comfortable, anxiety-free dental care in a modern setting.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Bridges', 'Root Canal Treatment', 'Emergency Dentistry', 'Dental Check-ups'],
      highlights: [
        'Central Melbourne CBD location near Flagstaff Station',
        'Same-day emergency appointments available',
        'Experienced team with gentle approach',
        'Modern digital X-ray technology',
        'Competitive pricing with payment plans',
      ],
    },
    {
      name: 'Bendigo Smiles Dentist',
      slug: 'bendigo-smiles-dentist',
      suburb: 'Bendigo',
      address: '171 Hargreaves Street, Bendigo VIC 3550',
      phone: '(03) 5434 4340',
      website: 'https://www.bendigosmilesdentist.com.au',
      description: 'Bendigo Smiles Dentist is a modern family dental practice in central Bendigo, offering comprehensive dental care for patients of all ages. The practice combines experienced dentistry with cutting-edge technology to deliver outstanding results. From children\'s dentistry to complex restorative work, the team provides personalised treatment plans in a relaxed, welcoming environment.',
      services: ['General Dentistry', 'Children\'s Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Dentures', 'Wisdom Teeth Removal'],
      highlights: [
        'Family-friendly practice welcoming patients of all ages',
        'Centrally located in Bendigo CBD',
        'Latest digital dentistry technology',
        'Flexible payment options including HICAPS',
        'Experienced team with decades of combined experience',
      ],
    },
    {
      name: 'Geelong Dental & Implant Centre',
      slug: 'geelong-dental-implant-centre',
      suburb: 'Geelong',
      address: '18 Myers Street, Geelong VIC 3220',
      phone: '(03) 5222 4599',
      website: 'https://www.geelongdentalimplantcentre.com.au',
      description: 'Geelong Dental & Implant Centre is a leading dental practice specialising in dental implants and comprehensive dental care. Located in the heart of Geelong, the practice combines advanced implant expertise with a full range of general and cosmetic dentistry services. Their experienced team uses the latest techniques and technology to restore smiles and improve oral health.',
      services: ['Dental Implants', 'All-on-4 Implants', 'General Dentistry', 'Cosmetic Dentistry', 'Dental Crowns', 'Bridges', 'Teeth Whitening', 'Bone Grafting'],
      highlights: [
        'Specialist implant expertise with advanced surgical suite',
        'All-on-4 implant solutions available',
        'Comprehensive treatment planning with 3D imaging',
        'Experienced implant dentists with extensive training',
        'Convenient Geelong CBD location',
      ],
    },
    {
      name: 'Dentalspa Geelong',
      slug: 'dentalspa-geelong',
      suburb: 'Geelong',
      address: '106 Ryrie Street, Geelong VIC 3220',
      phone: '(03) 5223 1555',
      website: 'https://www.dentalspageelong.com.au',
      description: 'Dentalspa Geelong offers a unique spa-like dental experience in Geelong. The practice is designed to help even the most anxious patients feel relaxed and comfortable during their dental visits. With a focus on cosmetic and preventive dentistry, the team provides treatments in a calming environment complete with amenities designed to ease dental anxiety.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Veneers', 'Dental Crowns', 'Sleep Dentistry', 'Children\'s Dentistry', 'Emergency Dentistry'],
      highlights: [
        'Spa-like atmosphere designed for patient comfort',
        'Sleep dentistry options for anxious patients',
        'Focus on cosmetic and aesthetic dentistry',
        'Modern facilities with relaxation amenities',
        'Caring team experienced with nervous patients',
      ],
    },
    {
      name: 'Dental on Clarendon',
      slug: 'dental-on-clarendon',
      suburb: 'South Melbourne',
      address: '383 Clarendon Street, South Melbourne VIC 3205',
      phone: '(03) 9690 3285',
      website: 'https://www.dentalonclarendon.com.au',
      description: 'Dental on Clarendon is a modern dental practice in South Melbourne providing comprehensive care including general, cosmetic, and restorative dentistry. Their experienced team uses advanced technology to deliver personalised treatments in a comfortable, welcoming environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Veneers', 'Root Canal Treatment', 'Emergency Dentistry', 'Dental Crowns'],
      highlights: [
        'Modern South Melbourne practice on Clarendon Street',
        'Advanced dental technology and techniques',
        'Comprehensive cosmetic and restorative services',
        'Welcoming environment for anxious patients',
        'Convenient location with nearby parking',
      ],
    },
    {
      name: 'MC Dental',
      slug: 'mc-dental',
      suburb: 'Melbourne',
      address: 'Shop 254, Level 2, 211 La Trobe Street, Melbourne VIC 3000',
      phone: '(03) 8608 8968',
      website: 'https://www.mcdental.com.au',
      description: 'MC Dental is a leading multi-location dental group with practices across Melbourne. Their La Trobe Street CBD clinic offers a full range of dental services with a focus on affordable, high-quality care. The practice features modern facilities and a team of skilled dentists committed to excellent patient outcomes.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Children\'s Dentistry', 'Emergency Dentistry', 'Wisdom Teeth Removal'],
      highlights: [
        'Multi-location dental group across Melbourne',
        'Affordable quality dental care',
        'Central CBD location on La Trobe Street',
        'Extended hours and Saturday appointments',
        'Interest-free payment plans available',
      ],
    },
    {
      name: 'Beachside Complete Dental Care',
      slug: 'beachside-complete-dental-care',
      suburb: 'Frankston',
      address: '1/26 Davey Street, Frankston VIC 3199',
      phone: '(03) 9781 3633',
      website: 'https://www.beachsidedental.com.au',
      description: 'Beachside Complete Dental Care is a comprehensive dental practice in Frankston offering everything from routine check-ups to advanced cosmetic treatments. The practice provides a relaxed, beachside atmosphere where patients can feel at ease while receiving top-quality dental care from their experienced team.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Invisalign', 'Teeth Whitening', 'Veneers', 'Children\'s Dentistry', 'Emergency Dentistry'],
      highlights: [
        'Complete dental care in relaxed Frankston setting',
        'Invisalign certified provider',
        'Dental implant services available',
        'Family-friendly with children\'s dentistry',
        'Modern technology including digital scanning',
      ],
    },
    {
      name: 'Peninsula Smiles',
      slug: 'peninsula-smiles',
      suburb: 'Mornington',
      address: '48 Barkly Street, Mornington VIC 3931',
      phone: '(03) 5975 5355',
      website: 'https://www.peninsulasmiles.com.au',
      description: 'Peninsula Smiles is a trusted dental practice on the Mornington Peninsula providing quality dental care for the whole family. Located on Barkly Street, the practice offers comprehensive general, cosmetic, and preventive dentistry in a friendly, comfortable environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Bridges', 'Root Canal Treatment', 'Children\'s Dentistry', 'Mouthguards'],
      highlights: [
        'Trusted Mornington Peninsula dental practice',
        'Family-friendly care for all ages',
        'Comprehensive general and cosmetic services',
        'Comfortable and welcoming environment',
        'Experienced team with gentle approach',
      ],
    },
    {
      name: 'Ballarat Dental Group',
      slug: 'ballarat-dental-group',
      suburb: 'Ballarat',
      address: '11 Lyons Street North, Ballarat VIC 3350',
      phone: '(03) 5331 2755',
      website: 'https://www.ballaratdentalgroup.com.au',
      description: 'Ballarat Dental Group is a leading dental practice in regional Victoria, providing comprehensive dental services to the Ballarat community. With a team of experienced dentists, the practice offers everything from preventive care to advanced restorative and cosmetic treatments in their modern Lyons Street facility.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Dentures', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Leading dental practice in regional Ballarat',
        'Multiple experienced dentists on staff',
        'Full range of dental specialties',
        'Modern facilities with latest technology',
        'Serving the Ballarat community for years',
      ],
    },
  ],

  nsw: [
    {
      name: 'City Dental / Experteeth',
      slug: 'city-dental-experteeth',
      suburb: 'Sydney',
      address: 'Suite 1203, Level 12, 97 Pitt Street, Sydney NSW 2000',
      phone: '(02) 9233 3399',
      website: 'https://www.citydental.com.au',
      description: 'City Dental, also known as Experteeth, is a premium dental practice in Sydney\'s CBD offering comprehensive dental care. Located on Pitt Street with easy access from Martin Place and Wynyard stations, the practice provides everything from routine check-ups to advanced cosmetic and restorative treatments. Their team of experienced dentists focuses on delivering exceptional results with patient comfort as a priority.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Veneers', 'Teeth Whitening', 'Invisalign', 'Root Canal Treatment', 'Dental Crowns', 'Emergency Dentistry'],
      highlights: [
        'Premium Sydney CBD location on Pitt Street',
        'Comprehensive cosmetic and restorative services',
        'Experienced team of specialist dentists',
        'Latest digital dentistry technology',
        'Convenient lunchtime and after-work appointments',
      ],
    },
    {
      name: 'The Paddington Dental Surgery',
      slug: 'the-paddington-dental-surgery',
      suburb: 'Paddington',
      address: '263 Oxford Street, Paddington NSW 2021',
      phone: '(02) 9331 2555',
      website: 'https://www.paddingtondentalsurgery.com.au',
      description: 'The Paddington Dental Surgery is a well-established dental practice on Oxford Street, serving the Paddington and surrounding Eastern Suburbs community. Known for their gentle approach and personalised care, the practice offers a full range of dental services in a welcoming, heritage-listed building. The team combines traditional values of patient care with modern dental techniques.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Bridges', 'Root Canal Treatment', 'Children\'s Dentistry', 'Gum Disease Treatment'],
      highlights: [
        'Established practice in the heart of Paddington',
        'Gentle, personalised approach to dental care',
        'Heritage-listed building with modern facilities',
        'Family-friendly with children\'s dentistry',
        'Experienced team with long-standing patients',
      ],
    },
    {
      name: 'Newcastle Dental Care',
      slug: 'newcastle-dental-care',
      suburb: 'Newcastle',
      address: '45 Hunter Street, Newcastle NSW 2300',
      phone: '(02) 4929 3135',
      website: 'https://www.newcastledentalcare.com.au',
      description: 'Newcastle Dental Care provides comprehensive dental services in the heart of Newcastle CBD. The practice offers a full range of general, cosmetic, and restorative dental treatments for patients of all ages. With a focus on preventive care and patient education, the team helps patients maintain optimal oral health through personalised treatment plans and ongoing support.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Wisdom Teeth Removal', 'Dentures', 'Emergency Dentistry'],
      highlights: [
        'Central Newcastle CBD location on Hunter Street',
        'Comprehensive dental services for all ages',
        'Focus on preventive care and patient education',
        'Digital X-rays for reduced radiation exposure',
        'Emergency dental care available',
      ],
    },
    {
      name: 'Wollongong Dental',
      slug: 'wollongong-dental',
      suburb: 'Wollongong',
      address: '1/14 Church Street, Wollongong NSW 2500',
      phone: '(02) 4227 5790',
      website: 'https://www.wollongongdental.com.au',
      description: 'Wollongong Dental is a trusted dental practice providing quality dental care to the Wollongong community. Located on Church Street in the Wollongong CBD, the practice offers a comprehensive range of dental services from preventive care to cosmetic treatments. Their friendly team is committed to making every dental visit a positive experience.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Bridges', 'Root Canal Treatment', 'Children\'s Dentistry', 'Dentures'],
      highlights: [
        'Trusted Wollongong practice with experienced team',
        'Central Church Street location',
        'Comprehensive general and cosmetic services',
        'Family-friendly with children\'s dentistry',
        'Modern facilities with digital imaging',
      ],
    },
    {
      name: 'Ellen Street Dental',
      slug: 'ellen-street-dental',
      suburb: 'Wollongong',
      address: '44 Ellen Street, Wollongong NSW 2500',
      phone: '(02) 4228 3788',
      website: 'https://www.ellenstreetdental.com.au',
      description: 'Ellen Street Dental is a modern dental practice in Wollongong offering personalised dental care in a comfortable setting. The practice provides a wide range of services including general, cosmetic, and restorative dentistry. Their caring team takes the time to understand each patient\'s needs and develop tailored treatment plans for optimal outcomes.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Veneers', 'Teeth Whitening', 'Root Canal Treatment', 'Emergency Dentistry', 'Mouthguards'],
      highlights: [
        'Modern practice with latest dental technology',
        'Personalised treatment plans for every patient',
        'Dental implant services available',
        'Emergency appointments for urgent dental needs',
        'Comfortable, relaxed practice environment',
      ],
    },
    {
      name: 'Paramount Dental Sydney',
      slug: 'paramount-dental-sydney',
      suburb: 'Sydney',
      address: 'Suite 601, 185 Elizabeth Street, Sydney NSW 2000',
      phone: '(02) 9131 8078',
      website: 'https://www.paramountdentalsydney.com.au',
      description: 'Paramount Dental Sydney is a premium dental practice in the Sydney CBD offering exceptional dental care with a focus on cosmetic excellence. Located on Elizabeth Street, the practice provides a comprehensive range of treatments using cutting-edge technology and techniques to deliver stunning results.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Veneers', 'Teeth Whitening', 'Invisalign', 'Dental Crowns', 'Root Canal Treatment'],
      highlights: [
        'Premium Sydney CBD practice on Elizabeth Street',
        'Cosmetic dentistry specialists',
        'Cutting-edge dental technology',
        'Comprehensive treatment options',
        'Experienced team focused on aesthetic results',
      ],
    },
    {
      name: 'Macquarie Dental',
      slug: 'macquarie-dental',
      suburb: 'Sydney',
      address: 'Suite 1-2, Level 6, 229-231 Macquarie Street, Sydney NSW 2000',
      phone: '(02) 9223 9000',
      website: 'https://www.macquariedental.com.au',
      description: 'Macquarie Dental is a long-established dental practice on prestigious Macquarie Street in the Sydney CBD. The practice offers comprehensive dental services from general check-ups to advanced cosmetic and implant treatments, delivered by a team of highly qualified professionals in an elegant, comfortable setting.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Veneers', 'Periodontics', 'Emergency Dentistry'],
      highlights: [
        'Prestigious Macquarie Street location',
        'Long-established Sydney dental practice',
        'Advanced implant and cosmetic services',
        'Highly qualified professional team',
        'Elegant and comfortable treatment rooms',
      ],
    },
    {
      name: 'My Local Dentists West Ryde',
      slug: 'my-local-dentists-west-ryde',
      suburb: 'West Ryde',
      address: '5 Anthony Road, West Ryde NSW 2114',
      phone: '(02) 9809 7000',
      website: 'https://www.mylocaldentists.com.au',
      description: 'My Local Dentists West Ryde is a community-focused dental practice providing quality care for families in Sydney\'s north-west. The practice offers affordable dental services in a friendly, modern environment with a team dedicated to making dental visits a positive experience for patients of all ages.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Dental Check-ups'],
      highlights: [
        'Community-focused family dental practice',
        'Affordable dental care with payment plans',
        'Modern facilities in West Ryde',
        'Welcoming team for patients of all ages',
        'Convenient location with easy parking',
      ],
    },
    {
      name: 'Sydney Dental Surgeons',
      slug: 'sydney-dental-surgeons',
      suburb: 'Sydney',
      address: '5/33 York Street, Sydney NSW 2000',
      phone: '(02) 9290 2082',
      website: 'https://www.sydneydentalsurgeons.com.au',
      description: 'Sydney Dental Surgeons is a specialist dental practice in the Sydney CBD offering advanced dental treatments including oral surgery, dental implants, and complex restorative procedures. Their team of dental surgeons brings extensive expertise to deliver exceptional outcomes for patients requiring specialised care.',
      services: ['Oral Surgery', 'Dental Implants', 'Wisdom Teeth Removal', 'General Dentistry', 'Cosmetic Dentistry', 'Root Canal Treatment', 'Dental Crowns', 'Bone Grafting'],
      highlights: [
        'Specialist dental surgery expertise',
        'Advanced implant and oral surgery services',
        'Central Sydney CBD location on York Street',
        'Highly experienced surgical team',
        'Complex restorative procedures available',
      ],
    },
    {
      name: 'Hornsby Dental',
      slug: 'hornsby-dental',
      suburb: 'Hornsby',
      address: '1 Coronation Street, Hornsby NSW 2077',
      phone: '(02) 9987 4477',
      website: 'https://www.hornsbydental.com.au',
      description: 'Hornsby Dental is an established dental practice serving the upper North Shore and Hills District communities. Located near Hornsby station, the practice provides a full range of general, cosmetic, and family dental services with a focus on gentle, patient-centred care in a modern, well-equipped facility.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Children\'s Dentistry', 'Veneers', 'Emergency Dentistry', 'Dental Crowns'],
      highlights: [
        'Established upper North Shore dental practice',
        'Conveniently located near Hornsby station',
        'Gentle care for nervous patients',
        'Family dental services for all ages',
        'Modern facilities with digital imaging',
      ],
    },
  ],

  qld: [
    {
      name: 'Brisbane CBD Dental Clinic',
      slug: 'brisbane-cbd-dental-clinic',
      suburb: 'Brisbane',
      address: 'Level 5, 245 Albert Street, Brisbane QLD 4000',
      phone: '(07) 3229 4367',
      website: 'https://www.brisbanecbddental.com.au',
      description: 'Brisbane CBD Dental Clinic is a modern dental practice conveniently located in the Brisbane CBD. The practice provides a comprehensive range of dental services with a focus on patient comfort and quality outcomes. Their team of experienced dentists uses the latest technology to deliver efficient, effective dental care for busy city professionals and families alike.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Invisalign', 'Teeth Whitening', 'Dental Crowns', 'Veneers', 'Emergency Dentistry'],
      highlights: [
        'Convenient Brisbane CBD location near Central Station',
        'Modern facilities with advanced dental technology',
        'Invisalign certified provider',
        'Same-day emergency appointments available',
        'Extended hours for busy professionals',
      ],
    },
    {
      name: 'Brisbane West Dental Group',
      slug: 'brisbane-west-dental-group',
      suburb: 'Indooroopilly',
      address: '7 Station Road, Indooroopilly QLD 4068',
      phone: '(07) 3878 0288',
      website: 'https://www.brisbanewestdentalgroup.com.au',
      description: 'Brisbane West Dental Group is a well-established dental practice in Indooroopilly, serving Brisbane\'s western suburbs. The practice offers comprehensive dental care for the whole family, from routine check-ups and preventive care to cosmetic treatments and complex restorative work. Their experienced team is known for their gentle approach and commitment to patient satisfaction.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Dental Implants', 'Orthodontics', 'Dentures', 'Root Canal Treatment', 'Teeth Whitening'],
      highlights: [
        'Serving Brisbane\'s western suburbs for over 20 years',
        'Family-friendly practice for all ages',
        'Experienced team with gentle approach',
        'Convenient Indooroopilly location near train station',
        'Full range of general and specialist services',
      ],
    },
    {
      name: 'FNQ Dental & Day Surgery',
      slug: 'fnq-dental-day-surgery',
      suburb: 'Cairns',
      address: '11 Shields Street, Cairns QLD 4870',
      phone: '(07) 4031 2134',
      website: 'https://www.fnqdental.com.au',
      description: 'FNQ Dental & Day Surgery is a comprehensive dental practice and day surgery facility in Cairns, serving Far North Queensland. The practice offers a full range of dental services from general dentistry to complex surgical procedures including wisdom teeth removal under general anaesthesia. Their modern facilities and experienced team provide high-quality dental care in a tropical setting.',
      services: ['General Dentistry', 'Oral Surgery', 'Wisdom Teeth Removal', 'Dental Implants', 'General Anaesthesia', 'Children\'s Dentistry', 'Emergency Dentistry', 'Cosmetic Dentistry'],
      highlights: [
        'On-site day surgery facility for complex procedures',
        'General anaesthesia available for dental procedures',
        'Serving Far North Queensland from central Cairns',
        'Experienced oral surgery team',
        'Comprehensive care from routine to complex treatments',
      ],
    },
    {
      name: 'Toowoomba Dental',
      slug: 'toowoomba-dental',
      suburb: 'Toowoomba',
      address: '1/162 Hume Street, Toowoomba QLD 4350',
      phone: '(07) 4632 4242',
      website: 'https://www.toowoombadental.com.au',
      description: 'Toowoomba Dental is a trusted dental practice providing quality dental care to the Toowoomba community. Located on Hume Street, the practice offers a comprehensive range of dental services delivered by an experienced and caring team. Their focus on patient education and preventive care helps patients maintain healthy smiles for life.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Children\'s Dentistry', 'Dentures', 'Emergency Dentistry'],
      highlights: [
        'Trusted Toowoomba practice with experienced team',
        'Focus on preventive care and patient education',
        'Family-friendly with children\'s dental services',
        'Modern facilities in central Toowoomba',
        'Emergency dental appointments available',
      ],
    },
    {
      name: 'L&R Dental',
      slug: 'lr-dental',
      suburb: 'Toowoomba',
      address: '3/155 Russell Street, Toowoomba QLD 4350',
      phone: '(07) 4638 2744',
      website: 'https://www.lrdental.com.au',
      description: 'L&R Dental is a modern dental practice in Toowoomba offering comprehensive dental care with a focus on quality and patient comfort. The practice provides a wide range of dental services including general, cosmetic, and restorative treatments. Their dedicated team uses contemporary techniques and technology to deliver excellent dental outcomes.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Veneers', 'Teeth Whitening', 'Orthodontics', 'Root Canal Treatment', 'Dental Crowns'],
      highlights: [
        'Modern practice with contemporary dental technology',
        'Comprehensive cosmetic and restorative services',
        'Dental implant expertise',
        'Patient-centred care with personalised treatment plans',
        'Convenient Russell Street location',
      ],
    },
    {
      name: 'Sunshine Boulevard Dental',
      slug: 'sunshine-boulevard-dental',
      suburb: 'Mermaid Waters',
      address: '156 Sunshine Boulevard, Mermaid Waters QLD 4218',
      phone: '(07) 5572 8872',
      website: 'https://www.sunshineboulevarddental.com.au',
      description: 'Sunshine Boulevard Dental is a modern dental practice on the Gold Coast providing comprehensive dental care in a relaxed, friendly environment. The practice offers everything from preventive care to advanced cosmetic treatments, serving families and individuals across the Mermaid Waters and surrounding Gold Coast areas.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Invisalign', 'Children\'s Dentistry', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Modern Gold Coast dental practice',
        'Relaxed and friendly atmosphere',
        'Comprehensive family dental services',
        'Invisalign and cosmetic specialists',
        'Convenient Mermaid Waters location',
      ],
    },
    {
      name: 'MGA Dental',
      slug: 'mga-dental',
      suburb: 'Sunnybank Hills',
      address: '202 Pinelands Road, Sunnybank Hills QLD 4109',
      phone: '(07) 3273 3343',
      website: 'https://www.mgadental.com.au',
      description: 'MGA Dental is a trusted dental practice in Sunnybank Hills providing quality dental care to Brisbane\'s south side. The practice offers a wide range of dental services with a focus on gentle care and patient comfort. Their multilingual team is dedicated to serving the diverse local community with personalised treatment plans.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Root Canal Treatment', 'Children\'s Dentistry', 'Dentures'],
      highlights: [
        'Trusted practice in Brisbane\'s south side',
        'Multilingual team serving diverse community',
        'Gentle care for anxious patients',
        'Full range of dental services',
        'Personalised treatment plans',
      ],
    },
    {
      name: 'Enhanced Dental Studios',
      slug: 'enhanced-dental-studios',
      suburb: 'Kedron',
      address: '14a/359 Gympie Road, Kedron QLD 4031',
      phone: '1800 833 844',
      website: 'https://www.enhanceddentalstudios.com.au',
      description: 'Enhanced Dental Studios is a premium dental practice in Kedron offering advanced cosmetic and general dentistry. The practice features a modern studio environment designed for patient comfort, with a team of skilled dentists specialising in smile makeovers, dental implants, and comprehensive oral care.',
      services: ['Cosmetic Dentistry', 'General Dentistry', 'Dental Implants', 'Veneers', 'Teeth Whitening', 'Invisalign', 'Smile Makeovers', 'Emergency Dentistry'],
      highlights: [
        'Premium studio-style dental practice',
        'Smile makeover specialists',
        'Advanced cosmetic dentistry expertise',
        'Modern facilities designed for comfort',
        'Free consultation for cosmetic treatments',
      ],
    },
    {
      name: 'Coastal Dental Care Robina',
      slug: 'coastal-dental-care-robina',
      suburb: 'Robina',
      address: '8/195 Ron Penhaligon Way, Robina QLD 4226',
      phone: '(07) 5593 0444',
      website: 'https://www.coastaldentalcare.com.au',
      description: 'Coastal Dental Care Robina is part of one of Australia\'s leading dental groups, providing quality dental care on the Gold Coast. The practice offers a comprehensive range of dental services with modern technology and experienced practitioners. Their Robina clinic serves families and individuals across the southern Gold Coast.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Children\'s Dentistry', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Part of leading Australian dental group',
        'Modern Gold Coast practice in Robina',
        'Comprehensive dental services for families',
        'Experienced team of practitioners',
        'Flexible appointment scheduling',
      ],
    },
    {
      name: 'Noosa Family Dental',
      slug: 'noosa-family-dental',
      suburb: 'Tewantin',
      address: '2/66 Poinciana Avenue, Tewantin QLD 4565',
      phone: '(07) 5447 3511',
      website: 'https://www.noosafamilydental.com.au',
      description: 'Noosa Family Dental is a welcoming dental practice serving the Noosa and Tewantin communities on the Sunshine Coast. The practice provides comprehensive family dental care in a relaxed, coastal setting with a focus on preventive dentistry and patient education to maintain lifelong oral health.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Dentures', 'Mouthguards'],
      highlights: [
        'Family dental practice in Noosa region',
        'Relaxed Sunshine Coast setting',
        'Focus on preventive dental care',
        'Welcoming team for all ages',
        'Patient education and oral health guidance',
      ],
    },
  ],

  sa: [
    {
      name: 'Adelaide Dental',
      slug: 'adelaide-dental',
      suburb: 'Norwood',
      address: '1/131 The Parade, Norwood SA 5067',
      phone: '(08) 8362 6090',
      website: 'https://www.adelaidedental.com.au',
      description: 'Adelaide Dental is a premium dental practice located on The Parade in Norwood, offering comprehensive dental care for the whole family. The practice combines modern technology with experienced dentistry to provide a wide range of treatments from preventive care to advanced cosmetic procedures. Their team is dedicated to creating beautiful, healthy smiles in a comfortable environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Veneers', 'Teeth Whitening', 'Invisalign', 'Dental Crowns', 'Root Canal Treatment'],
      highlights: [
        'Premium Norwood location on The Parade',
        'Comprehensive cosmetic dentistry services',
        'Invisalign certified provider',
        'Modern technology including digital scanning',
        'Experienced team with gentle approach',
      ],
    },
    {
      name: 'North Adelaide Dental Care',
      slug: 'north-adelaide-dental-care',
      suburb: 'North Adelaide',
      address: '178 Tynte Street, North Adelaide SA 5006',
      phone: '(08) 8267 3198',
      website: 'https://www.northadelaidedentalcare.com.au',
      description: 'North Adelaide Dental Care is a well-established dental practice on Tynte Street, providing quality dental care to the North Adelaide community and beyond. The practice offers a full range of dental services with a focus on gentle, personalised care. Their experienced team takes pride in building lasting relationships with patients and helping them achieve optimal oral health.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Bridges', 'Children\'s Dentistry', 'Dentures', 'Emergency Dentistry'],
      highlights: [
        'Established North Adelaide practice with loyal patient base',
        'Gentle, personalised dental care',
        'Family-friendly with children\'s dentistry services',
        'Experienced team with decades of service',
        'Emergency dental appointments available',
      ],
    },
    {
      name: 'Straight Smile Centre',
      slug: 'straight-smile-centre',
      suburb: 'Glenelg',
      address: '1/26 Jetty Road, Glenelg SA 5045',
      phone: '(08) 8294 7228',
      website: 'https://www.straightsmilecentre.com.au',
      description: 'Straight Smile Centre is a specialist orthodontic and dental practice in the heart of Glenelg. Located on the popular Jetty Road, the practice specialises in teeth straightening solutions including Invisalign, traditional braces, and cosmetic dentistry. Their team is dedicated to creating beautiful, straight smiles using the latest orthodontic technology and techniques.',
      services: ['Invisalign', 'Orthodontics', 'Traditional Braces', 'Cosmetic Dentistry', 'Teeth Whitening', 'Veneers', 'Retainers', 'General Dentistry'],
      highlights: [
        'Specialist orthodontic expertise',
        'Invisalign Diamond Provider',
        'Popular Glenelg Jetty Road location',
        'Advanced 3D treatment planning',
        'Solutions for all ages from teens to adults',
      ],
    },
    {
      name: 'Illumident',
      slug: 'illumident',
      suburb: 'Mount Gambier',
      address: '2 Elizabeth Street, Mount Gambier SA 5290',
      phone: '(08) 8725 8080',
      website: 'https://www.illumident.com.au',
      description: 'Illumident is a modern dental practice in Mount Gambier, offering comprehensive dental care with state-of-the-art technology. The practice provides a wide range of dental services from general check-ups to advanced cosmetic and restorative treatments. Their team is committed to delivering exceptional dental care to the Limestone Coast community.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Dental Crowns', 'Veneers', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Modern practice with state-of-the-art technology',
        'Dental implant services for the Limestone Coast',
        'Comprehensive cosmetic dentistry options',
        'Experienced team committed to quality care',
        'Central Mount Gambier location',
      ],
    },
    {
      name: 'Mt Gambier Dental Centre',
      slug: 'mt-gambier-dental-centre',
      suburb: 'Mount Gambier',
      address: '5 Percy Street, Mount Gambier SA 5290',
      phone: '(08) 8723 1233',
      website: 'https://www.mtgambierdentalcentre.com.au',
      description: 'Mt Gambier Dental Centre is a long-standing dental practice providing trusted dental care to the Mount Gambier community. The practice offers a comprehensive range of general and cosmetic dental services in a friendly, welcoming environment. Their experienced team focuses on preventive care and patient education to help families maintain healthy smiles.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Dentures', 'Teeth Whitening', 'Root Canal Treatment', 'Dental Crowns', 'Emergency Dentistry'],
      highlights: [
        'Long-standing trusted practice in Mount Gambier',
        'Family-friendly with children\'s dental services',
        'Comprehensive denture services',
        'Focus on preventive care and education',
        'Friendly, welcoming team and environment',
      ],
    },
    {
      name: 'Fullarton Park Dental',
      slug: 'fullarton-park-dental',
      suburb: 'Highgate',
      address: '417 Fullarton Road, Highgate SA 5063',
      phone: '(08) 8272 5271',
      website: 'https://www.fullartondental.com.au',
      description: 'Fullarton Park Dental is a well-established dental practice in Highgate providing quality dental care to Adelaide\'s eastern suburbs. The practice offers a comprehensive range of general, cosmetic, and preventive dental services in a warm, family-friendly environment with modern facilities and experienced practitioners.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Veneers', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry'],
      highlights: [
        'Established practice in Adelaide\'s eastern suburbs',
        'Warm, family-friendly environment',
        'Comprehensive general and cosmetic services',
        'Modern facilities and equipment',
        'Experienced and caring practitioners',
      ],
    },
    {
      name: 'East Adelaide Dental Studio',
      slug: 'east-adelaide-dental-studio',
      suburb: 'Glenside',
      address: '1 Allinga Avenue, Glenside SA 5065',
      phone: '(08) 8379 3529',
      website: 'https://www.eastadelaidedental.com.au',
      description: 'East Adelaide Dental Studio is a boutique dental practice in Glenside offering personalised dental care with an emphasis on cosmetic and restorative excellence. The studio-style practice provides a relaxed, comfortable setting where patients receive individually tailored treatments from a highly skilled dental team.',
      services: ['Cosmetic Dentistry', 'General Dentistry', 'Dental Implants', 'Veneers', 'Teeth Whitening', 'Invisalign', 'Smile Makeovers', 'Root Canal Treatment'],
      highlights: [
        'Boutique studio-style dental practice',
        'Cosmetic and restorative specialists',
        'Personalised, individually tailored treatments',
        'Relaxed and comfortable setting',
        'Highly skilled dental team',
      ],
    },
    {
      name: 'Adelaide One Dental',
      slug: 'adelaide-one-dental',
      suburb: 'Salisbury Downs',
      address: '287 Salisbury Highway, Salisbury Downs SA 5108',
      phone: '(08) 8258 8569',
      website: 'https://www.adelaideonedental.com.au',
      description: 'Adelaide One Dental is a modern dental practice in Salisbury Downs providing affordable, quality dental care to Adelaide\'s northern suburbs. The practice offers a full range of dental services with a focus on making dentistry accessible for families. Their friendly team is committed to delivering gentle care in a stress-free environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Dentures', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Affordable dental care in northern Adelaide',
        'Family-focused practice welcoming all ages',
        'Gentle care in a stress-free environment',
        'Modern facilities with digital X-rays',
        'Flexible payment options available',
      ],
    },
    {
      name: 'South Beach Dental',
      slug: 'south-beach-dental',
      suburb: 'Brighton',
      address: '362 Brighton Road, Brighton SA 5048',
      phone: '(08) 8296 4888',
      website: 'https://www.southbeachdental.com.au',
      description: 'South Beach Dental is a coastal dental practice in Brighton, serving Adelaide\'s southern beachside suburbs. The practice provides comprehensive dental services in a relaxed, welcoming atmosphere. Their experienced team offers everything from routine preventive care to advanced cosmetic and restorative treatments.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Veneers', 'Children\'s Dentistry', 'Root Canal Treatment', 'Dental Check-ups'],
      highlights: [
        'Coastal practice in Brighton beachside suburb',
        'Relaxed and welcoming atmosphere',
        'Comprehensive dental services available',
        'Experienced team with gentle approach',
        'Convenient southern Adelaide location',
      ],
    },
    {
      name: 'Prospect Dental Centre',
      slug: 'prospect-dental-centre',
      suburb: 'Prospect',
      address: '228 Prospect Road, Prospect SA 5082',
      phone: '(08) 8344 4022',
      website: 'https://www.prospectdentalcentre.com.au',
      description: 'Prospect Dental Centre is a well-regarded dental practice on Prospect Road providing comprehensive dental care to Adelaide\'s inner northern suburbs. The practice offers a full range of general, cosmetic, and preventive dental services with a focus on personalised care and modern treatment techniques.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Invisalign', 'Teeth Whitening', 'Veneers', 'Dental Crowns', 'Emergency Dentistry'],
      highlights: [
        'Well-regarded inner northern suburbs practice',
        'Comprehensive general and cosmetic services',
        'Personalised care for every patient',
        'Modern treatment techniques',
        'Convenient Prospect Road location',
      ],
    },
  ],

  wa: [
    {
      name: 'Perth Dental Rooms',
      slug: 'perth-dental-rooms',
      suburb: 'Perth',
      address: 'Level 4, 25 Walters Drive, Osborne Park WA 6017',
      phone: '(08) 6166 8805',
      website: 'https://www.perthdentalrooms.com.au',
      description: 'Perth Dental Rooms provides comprehensive dental care in a modern, purpose-built dental facility. The practice offers a full range of dental services from preventive care to advanced cosmetic and restorative treatments. Their team of experienced dentists uses the latest technology and techniques to deliver exceptional dental outcomes in a comfortable, relaxed setting.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Veneers', 'Teeth Whitening', 'Invisalign', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Purpose-built modern dental facility',
        'Comprehensive cosmetic dentistry services',
        'Invisalign certified provider',
        'Latest dental technology and techniques',
        'Relaxed, comfortable practice environment',
      ],
    },
    {
      name: 'West Perth Cosmetic Dental',
      slug: 'west-perth-cosmetic-dental',
      suburb: 'West Perth',
      address: '6 Havelock Street, West Perth WA 6005',
      phone: '(08) 9321 2111',
      website: 'https://www.westperthdental.com.au',
      description: 'West Perth Cosmetic Dental is a premium dental practice specialising in cosmetic and aesthetic dentistry. Located in West Perth, the practice offers transformative dental treatments including veneers, teeth whitening, and smile makeovers. Their team of skilled cosmetic dentists combines artistry with dental expertise to create beautiful, natural-looking results.',
      services: ['Cosmetic Dentistry', 'Veneers', 'Teeth Whitening', 'Smile Makeovers', 'Dental Crowns', 'Dental Implants', 'General Dentistry', 'Invisalign'],
      highlights: [
        'Specialist cosmetic dentistry expertise',
        'Smile makeover and transformation services',
        'Premium West Perth location',
        'Artistry combined with dental expertise',
        'Natural-looking cosmetic results',
      ],
    },
    {
      name: 'ADDC Dental',
      slug: 'addc-dental',
      suburb: 'Dianella',
      address: '380 Grand Promenade, Dianella WA 6059',
      phone: '(08) 9375 9466',
      website: 'https://www.addcdental.com.au',
      description: 'ADDC Dental is a comprehensive dental practice in Dianella, serving Perth\'s northern suburbs. The practice provides a wide range of dental services for the whole family, from children\'s first dental visits to complex restorative treatments for adults. Their caring team focuses on creating a comfortable, stress-free dental experience for every patient.',
      services: ['General Dentistry', 'Children\'s Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Dentures', 'Emergency Dentistry'],
      highlights: [
        'Family-friendly practice in Dianella',
        'Comprehensive services for all ages',
        'Caring team focused on patient comfort',
        'Dental implant and orthodontic services',
        'Emergency dental care available',
      ],
    },
    {
      name: 'Forrest Avenue Dental Centre',
      slug: 'forrest-avenue-dental-centre',
      suburb: 'Bunbury',
      address: '4 Forrest Avenue, Bunbury WA 6230',
      phone: '(08) 9721 8755',
      website: 'https://www.forrestavedental.com.au',
      description: 'Forrest Avenue Dental Centre is a trusted dental practice in Bunbury, providing quality dental care to the South West region of Western Australia. The practice offers a comprehensive range of dental services in a modern, well-equipped facility. Their friendly team is committed to delivering gentle, patient-centred dental care for the whole community.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Dental Crowns', 'Root Canal Treatment', 'Dentures', 'Teeth Whitening', 'Emergency Dentistry'],
      highlights: [
        'Trusted Bunbury dental practice',
        'Serving the South West WA community',
        'Modern, well-equipped facility',
        'Gentle, patient-centred care',
        'Comprehensive services for all ages',
      ],
    },
    {
      name: 'Dentistry on Marlston',
      slug: 'dentistry-on-marlston',
      suburb: 'Bunbury',
      address: '4/18 Marlston Drive, Bunbury WA 6230',
      phone: '(08) 9791 8088',
      website: 'https://www.dentistryonmarlston.com.au',
      description: 'Dentistry on Marlston is a modern dental practice in the Bunbury Marlston Waterfront precinct. The practice offers a full range of dental services with a focus on cosmetic and preventive dentistry. Their experienced team provides personalised care in a contemporary setting, helping patients achieve and maintain healthy, beautiful smiles.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Veneers', 'Dental Implants', 'Dental Crowns', 'Root Canal Treatment', 'Children\'s Dentistry'],
      highlights: [
        'Modern practice in Marlston Waterfront precinct',
        'Focus on cosmetic and preventive dentistry',
        'Contemporary facilities and technology',
        'Personalised treatment plans',
        'Experienced and friendly team',
      ],
    },
    {
      name: 'Dental at Joondalup',
      slug: 'dental-at-joondalup',
      suburb: 'Joondalup',
      address: 'Unit 7, 7 Delage Street, Joondalup WA 6027',
      phone: '(08) 9301 4088',
      website: 'https://www.dentalatjoondalup.com.au',
      description: 'Dental at Joondalup is a modern dental practice providing comprehensive care to Perth\'s northern suburbs. Located in Joondalup, the practice offers a full range of dental services from routine check-ups to advanced cosmetic and restorative treatments in a comfortable, patient-focused environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Invisalign', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Modern practice in Perth\'s northern suburbs',
        'Comprehensive cosmetic and restorative services',
        'Invisalign certified provider',
        'Patient-focused comfortable environment',
        'Convenient Joondalup location',
      ],
    },
    {
      name: 'DB Dental Joondalup',
      slug: 'db-dental-joondalup',
      suburb: 'Joondalup',
      address: '420 Joondalup Drive, Joondalup WA 6027',
      phone: '(08) 9300 3751',
      website: 'https://www.nationaldentalcare.com.au/practice/db-dental-joondalup/',
      description: 'DB Dental Joondalup is part of the National Dental Care group, providing quality dental services in Perth\'s northern corridor. The practice features modern facilities and an experienced team offering comprehensive dental care with a focus on patient comfort and outstanding outcomes.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Children\'s Dentistry', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Part of National Dental Care group',
        'Modern facilities with latest technology',
        'Experienced and professional team',
        'Comprehensive services including orthodontics',
        'Accepting new patients',
      ],
    },
    {
      name: 'Joondalup Drive Dental Clinic',
      slug: 'joondalup-drive-dental-clinic',
      suburb: 'Joondalup',
      address: 'Suite 4, 1 The Gateway, Joondalup WA 6027',
      phone: '(08) 9300 9399',
      website: 'https://www.jddc.com.au',
      description: 'Joondalup Drive Dental Clinic is an established dental practice providing trusted care to the Joondalup community. The clinic offers a wide range of dental services in a welcoming environment, with a dedicated team focused on delivering personalised treatment plans for optimal oral health outcomes.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Bridges', 'Root Canal Treatment', 'Children\'s Dentistry', 'Dental Check-ups'],
      highlights: [
        'Established and trusted Joondalup practice',
        'Welcoming environment for all patients',
        'Personalised treatment plans',
        'Experienced dedicated dental team',
        'Convenient Gateway location',
      ],
    },
    {
      name: 'DB Dental North Fremantle',
      slug: 'db-dental-north-fremantle',
      suburb: 'North Fremantle',
      address: '2 Pensioner Guard Road, North Fremantle WA 6159',
      phone: '(08) 9432 3409',
      website: 'https://www.nationaldentalcare.com.au/practice/db-dental-north-fremantle/',
      description: 'DB Dental North Fremantle offers quality dental care in a relaxed coastal setting. Part of the DB Dental and National Dental Care network, the practice provides comprehensive dental services with modern equipment and experienced practitioners serving the Fremantle and surrounding communities.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Veneers', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry'],
      highlights: [
        'Relaxed coastal setting near Fremantle',
        'Part of trusted DB Dental network',
        'Modern equipment and facilities',
        'Experienced practitioners',
        'Comprehensive services for the whole family',
      ],
    },
    {
      name: 'Kalamunda Dental Care',
      slug: 'kalamunda-dental-care',
      suburb: 'Kalamunda',
      address: '7/10 Barber Street, Kalamunda WA 6076',
      phone: '(08) 9293 2722',
      website: 'https://www.kalamundadental.com.au',
      description: 'Kalamunda Dental Care is a family-friendly dental practice in the Perth Hills providing quality dental services to the Kalamunda community. The practice offers comprehensive general, cosmetic, and preventive dentistry in a warm, welcoming environment with a team dedicated to gentle, compassionate patient care.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Dentures', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Family-friendly Perth Hills dental practice',
        'Warm and welcoming environment',
        'Gentle, compassionate patient care',
        'Comprehensive general and cosmetic services',
        'Serving the Kalamunda community',
      ],
    },
  ],

  tas: [
    {
      name: 'Pickup Bagshaw Dental',
      slug: 'pickup-bagshaw-dental',
      suburb: 'Launceston',
      address: '6 High Street, Launceston TAS 7250',
      phone: '(03) 6331 3711',
      website: 'https://www.pickupbagshawdental.com.au',
      description: 'Pickup Bagshaw Dental is one of Launceston\'s most established dental practices, with a long history of providing quality dental care to the northern Tasmanian community. The practice offers comprehensive dental services from their High Street location, combining traditional values of patient care with modern dental technology and techniques.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'One of Launceston\'s most established practices',
        'Long history of quality dental care',
        'Comprehensive services including implants and orthodontics',
        'Central High Street location',
        'Modern technology with traditional patient care values',
      ],
    },
    {
      name: 'Kings Meadows Dental Care',
      slug: 'kings-meadows-dental-care',
      suburb: 'Kings Meadows',
      address: '98 Hobart Road, Kings Meadows TAS 7249',
      phone: '(03) 6344 4566',
      website: 'https://www.kingsmeadowsdental.com.au',
      description: 'Kings Meadows Dental Care is a friendly, family-oriented dental practice in the southern Launceston suburb of Kings Meadows. The practice provides a comprehensive range of dental services for patients of all ages, with a particular focus on family and children\'s dentistry. Their caring team creates a welcoming environment where patients feel comfortable and well-cared for.',
      services: ['General Dentistry', 'Children\'s Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Dentures', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Family-oriented practice welcoming all ages',
        'Specialising in children\'s dentistry',
        'Convenient Kings Meadows location',
        'Caring, gentle approach to dental care',
        'Comprehensive general dental services',
      ],
    },
    {
      name: 'The Denture Centre',
      slug: 'the-denture-centre',
      suburb: 'Hobart',
      address: '181 Elizabeth Street, Hobart TAS 7000',
      phone: '(03) 6231 1244',
      website: 'https://www.thedenture centre.com.au',
      description: 'The Denture Centre is a specialist denture clinic in Hobart, providing expert denture services to southern Tasmania. Located on Elizabeth Street in the Hobart CBD, the practice specialises in all types of dentures including full dentures, partial dentures, and implant-retained dentures. Their experienced dental prosthetists create custom-fitted dentures for optimal comfort and function.',
      services: ['Full Dentures', 'Partial Dentures', 'Implant-Retained Dentures', 'Denture Repairs', 'Denture Relines', 'Mouthguards', 'Anti-Snoring Devices', 'Same-Day Denture Repairs'],
      highlights: [
        'Specialist denture clinic with expert prosthetists',
        'Custom-fitted dentures for comfort and function',
        'Same-day denture repair service',
        'Implant-retained denture options',
        'Central Hobart CBD location on Elizabeth Street',
      ],
    },
    {
      name: 'Devonport Dental Care',
      slug: 'devonport-dental-care',
      suburb: 'Devonport',
      address: '79 Rooke Street, Devonport TAS 7310',
      phone: '(03) 6424 1929',
      website: 'https://www.devonportdentalcare.com.au',
      description: 'Devonport Dental Care is a modern dental practice on Rooke Street, providing comprehensive dental services to the Devonport community and surrounding North West Tasmania region. The practice offers a full range of general and cosmetic dental treatments, using modern equipment and techniques to deliver quality dental care in a comfortable environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Children\'s Dentistry', 'Root Canal Treatment', 'Dentures', 'Emergency Dentistry'],
      highlights: [
        'Modern practice serving North West Tasmania',
        'Central Rooke Street location in Devonport',
        'Comprehensive general and cosmetic services',
        'Family-friendly with children\'s dentistry',
        'Emergency dental appointments available',
      ],
    },
    {
      name: 'Fanta\'s Dental Surgery',
      slug: 'fantas-dental-surgery',
      suburb: 'Devonport',
      address: '22 Stewart Street, Devonport TAS 7310',
      phone: '(03) 6424 5274',
      website: 'https://www.fantasdental.com.au',
      description: 'Fanta\'s Dental Surgery is an established dental practice in Devonport, providing trusted dental care to patients across the North West Coast of Tasmania. The practice offers a wide range of dental services with a focus on gentle, compassionate care. Their experienced team takes the time to understand each patient\'s needs and provide tailored treatment solutions.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Dental Crowns', 'Bridges', 'Dentures', 'Teeth Whitening', 'Root Canal Treatment'],
      highlights: [
        'Established practice with trusted reputation',
        'Gentle, compassionate dental care',
        'Serving the North West Coast of Tasmania',
        'Personalised treatment plans',
        'Experienced and dedicated team',
      ],
    },
    {
      name: 'Trusted Smiles',
      slug: 'trusted-smiles',
      suburb: 'Hobart',
      address: '242 Liverpool Street, Hobart TAS 7000',
      phone: '(03) 6170 7701',
      website: 'https://www.trustedsmiles.com.au',
      description: 'Trusted Smiles is a modern dental practice in central Hobart offering comprehensive dental care with a focus on patient comfort and trust. Located on Liverpool Street, the practice provides a full range of general, cosmetic, and preventive dental services in a welcoming environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Implants', 'Veneers', 'Children\'s Dentistry', 'Emergency Dentistry', 'Dental Check-ups'],
      highlights: [
        'Modern central Hobart dental practice',
        'Focus on patient comfort and trust',
        'Comprehensive general and cosmetic services',
        'Welcoming environment for all patients',
        'Convenient Liverpool Street location',
      ],
    },
    {
      name: 'Innova Dental Prospect',
      slug: 'innova-dental-prospect',
      suburb: 'Prospect',
      address: 'Shop 8, 213 Westbury Road, Prospect TAS 7250',
      phone: '(03) 6343 0654',
      website: 'https://www.innovadental.com.au',
      description: 'Innova Dental Prospect is an innovative dental practice in Launceston\'s northern suburbs offering modern dental care with a patient-first approach. The practice features contemporary facilities and a skilled team providing comprehensive treatments from routine check-ups to advanced cosmetic and restorative procedures.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Invisalign', 'Teeth Whitening', 'Veneers', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Innovative approach to dental care',
        'Contemporary facilities in Prospect',
        'Patient-first treatment philosophy',
        'Advanced cosmetic and restorative services',
        'Skilled and experienced dental team',
      ],
    },
    {
      name: 'St Lukes Dental Launceston',
      slug: 'st-lukes-dental-launceston',
      suburb: 'Launceston',
      address: '93 Cimitiere Street, Launceston TAS 7250',
      phone: '1300 651 988',
      website: 'https://www.stlukes.com.au',
      description: 'St Lukes Dental Launceston is part of the St Lukes Health network, providing quality dental care to the northern Tasmanian community. The practice offers a comprehensive range of dental services with a focus on preventive care and patient education, supported by modern technology and experienced dental professionals.',
      services: ['General Dentistry', 'Preventive Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Children\'s Dentistry', 'Root Canal Treatment', 'Dental Check-ups'],
      highlights: [
        'Part of trusted St Lukes Health network',
        'Focus on preventive care and education',
        'Modern technology and equipment',
        'Experienced dental professionals',
        'Serving northern Tasmania',
      ],
    },
    {
      name: 'Dentaltown',
      slug: 'dentaltown',
      suburb: 'Mowbray',
      address: '145 Invermay Road, Mowbray TAS 7248',
      phone: '(03) 6326 4368',
      website: 'https://www.dentaltown.net.au',
      description: 'Dentaltown is a friendly dental practice in Mowbray, Launceston, providing quality dental care for the whole family. The practice offers affordable dental services in a comfortable, relaxed setting with a team committed to making dental visits a positive experience for patients of all ages.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Dentures', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Friendly family dental practice',
        'Affordable quality dental care',
        'Comfortable, relaxed setting',
        'Positive experience for all ages',
        'Convenient Mowbray location',
      ],
    },
    {
      name: 'DDTA Dental',
      slug: 'ddta-dental',
      suburb: 'Launceston',
      address: '3-5 High Street, Launceston TAS 7250',
      phone: '(03) 6331 4099',
      website: 'https://www.ddtadental.com.au',
      description: 'DDTA Dental is an established dental practice on High Street in Launceston providing comprehensive dental services to the local community. The practice combines years of clinical experience with modern dental technology to deliver quality outcomes across general, cosmetic, and restorative dentistry.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Veneers', 'Root Canal Treatment', 'Dental Crowns'],
      highlights: [
        'Established Launceston dental practice',
        'Years of clinical experience',
        'Modern dental technology',
        'Comprehensive general and cosmetic services',
        'Central High Street location',
      ],
    },
  ],

  nt: [
    {
      name: 'National Dental Care Darwin',
      slug: 'national-dental-care-darwin',
      suburb: 'Darwin',
      address: 'Suite 1, 43 Cavenagh Street, Darwin NT 0800',
      phone: '(08) 8981 4288',
      website: 'https://www.nationaldentalcare.com.au/practice/darwin/',
      description: 'National Dental Care Darwin is part of the National Dental Care network, providing quality dental services in the Darwin CBD. The practice offers a comprehensive range of dental treatments with a focus on patient comfort and quality outcomes. Their team of experienced dentists provides care for the whole family, from routine check-ups to complex dental procedures.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry'],
      highlights: [
        'Part of trusted National Dental Care network',
        'Central Darwin CBD location',
        'Comprehensive services for the whole family',
        'Experienced team of dental professionals',
        'Modern facilities with latest technology',
      ],
    },
    {
      name: 'Smith Street Dental',
      slug: 'smith-street-dental',
      suburb: 'Darwin',
      address: '70 Smith Street, Darwin NT 0800',
      phone: '(08) 8941 0551',
      website: 'https://www.smithstreetdental.com.au',
      description: 'Smith Street Dental is a well-established dental practice in the Darwin CBD, providing comprehensive dental care to the Darwin community. Located on the iconic Smith Street, the practice offers a full range of general and cosmetic dental services. Their friendly team is known for their warm approach and commitment to delivering quality dental care in a relaxed atmosphere.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Bridges', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry'],
      highlights: [
        'Established Darwin CBD practice on Smith Street',
        'Friendly team with warm, welcoming approach',
        'Comprehensive general and cosmetic services',
        'Relaxed, comfortable atmosphere',
        'Emergency dental care available',
      ],
    },
    {
      name: 'Acacia Family Dental Clinic',
      slug: 'acacia-family-dental-clinic',
      suburb: 'Coolalinga',
      address: 'Shop 24, Coolalinga Central, Stuart Highway, Coolalinga NT 0839',
      phone: '(08) 8983 1766',
      website: 'https://www.acaciadental.com.au',
      description: 'Acacia Family Dental Clinic is a family-friendly dental practice in Coolalinga, serving Darwin\'s rural area communities. Located in the Coolalinga Central shopping centre, the practice provides convenient access to quality dental care for families in the greater Darwin region. Their caring team specialises in creating a positive dental experience for patients of all ages.',
      services: ['General Dentistry', 'Children\'s Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Dentures', 'Emergency Dentistry', 'Mouthguards'],
      highlights: [
        'Family-friendly practice serving rural Darwin area',
        'Convenient Coolalinga Central shopping centre location',
        'Specialising in children\'s and family dentistry',
        'Caring team creating positive dental experiences',
        'Comprehensive general dental services',
      ],
    },
    {
      name: 'NT Oral Health Services Darwin',
      slug: 'nt-oral-health-services-darwin',
      suburb: 'Darwin',
      address: 'Dental Building, Royal Darwin Hospital Campus, Rocklands Drive, Tiwi NT 0810',
      phone: '(08) 8922 6466',
      website: 'https://health.nt.gov.au/professionals/oral-health-services',
      description: 'NT Oral Health Services Darwin is the Northern Territory Government\'s public dental service, based at the Royal Darwin Hospital campus in Tiwi. The service provides dental care to eligible patients including children, concession card holders, and emergency patients. Their team of public dental professionals delivers essential dental care to the Top End community.',
      services: ['General Dentistry', 'Emergency Dentistry', 'Children\'s Dentistry', 'Dentures', 'Oral Surgery', 'Preventive Dentistry', 'Dental Extractions', 'Fillings'],
      highlights: [
        'Northern Territory Government public dental service',
        'Located at Royal Darwin Hospital campus',
        'Dental care for eligible and concession card patients',
        'Emergency dental services available',
        'Comprehensive children\'s dental programs',
      ],
    },
    {
      name: 'NT Oral Health Services Alice Springs',
      slug: 'nt-oral-health-services-alice-springs',
      suburb: 'Alice Springs',
      address: 'Alice Springs Hospital, Gap Road, Alice Springs NT 0870',
      phone: '(08) 8951 6713',
      website: 'https://health.nt.gov.au/professionals/oral-health-services',
      description: 'NT Oral Health Services Alice Springs is the Northern Territory Government\'s public dental service in Central Australia, based at the Alice Springs Hospital. The service provides essential dental care to eligible patients in Alice Springs and surrounding remote communities. Their team delivers public dental services including emergency care, general dentistry, and children\'s dental programs.',
      services: ['General Dentistry', 'Emergency Dentistry', 'Children\'s Dentistry', 'Dental Extractions', 'Fillings', 'Dentures', 'Preventive Dentistry', 'Remote Community Dental Services'],
      highlights: [
        'Public dental service for Central Australia',
        'Based at Alice Springs Hospital',
        'Services for remote and Indigenous communities',
        'Emergency dental care available',
        'Children\'s dental health programs',
      ],
    },
    {
      name: 'Palmerston Dental Surgery',
      slug: 'palmerston-dental-surgery',
      suburb: 'Palmerston',
      address: 'Suite 4, 6 Maluka Drive, Palmerston NT 0830',
      phone: '(08) 8932 1544',
      website: 'https://www.palmerstondentalsurgerynt.com.au',
      description: 'Palmerston Dental Surgery is a trusted dental practice providing comprehensive care to the Palmerston and greater Darwin community. The practice offers a full range of general, cosmetic, and family dental services with a focus on gentle, compassionate care in a modern, comfortable facility.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Dentures', 'Emergency Dentistry'],
      highlights: [
        'Trusted practice in Palmerston community',
        'Gentle, compassionate dental care',
        'Modern and comfortable facility',
        'Family dental services for all ages',
        'Emergency appointments available',
      ],
    },
    {
      name: 'Your Smile Dental',
      slug: 'your-smile-dental',
      suburb: 'Rosebery',
      address: '1st Floor, 164 Forrest Parade, Rosebery NT 0832',
      phone: '(08) 7999 7750',
      website: 'https://www.yoursmiledental.com.au',
      description: 'Your Smile Dental is a patient-focused dental practice in Rosebery, Darwin, providing quality dental care in a friendly, modern environment. The practice offers comprehensive dental services with a commitment to helping patients achieve and maintain healthy, beautiful smiles through personalised treatment plans.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Veneers', 'Invisalign', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Patient-focused approach to dental care',
        'Modern practice in Rosebery, Darwin',
        'Personalised treatment plans',
        'Comprehensive cosmetic services',
        'Friendly and welcoming team',
      ],
    },
    {
      name: 'Your Dentist Darwin',
      slug: 'your-dentist-darwin',
      suburb: 'Casuarina',
      address: '3/7c Gsell Street, Casuarina NT 0810',
      phone: '(08) 8928 0060',
      website: 'https://www.yourdentistdarwin.com.au',
      description: 'Your Dentist Darwin is a friendly dental practice in Casuarina offering quality dental care to the Darwin northern suburbs community. The practice provides a comprehensive range of dental services with experienced practitioners focused on delivering excellent results in a comfortable, stress-free environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Dental Check-ups', 'Emergency Dentistry'],
      highlights: [
        'Friendly practice in Darwin\'s northern suburbs',
        'Experienced dental practitioners',
        'Stress-free comfortable environment',
        'Comprehensive services for the whole family',
        'Convenient Casuarina location',
      ],
    },
    {
      name: 'Trower Dental',
      slug: 'trower-dental',
      suburb: 'Darwin',
      address: 'Suite 8, 266 Trower Road, Darwin NT 0810',
      phone: '(08) 8945 4022',
      website: 'https://www.trowerdental.com.au',
      description: 'Trower Dental is an established dental practice on Trower Road in Darwin providing trusted dental care to the local community. The practice offers a wide range of dental services including general, cosmetic, and restorative treatments, delivered by an experienced team in a professional, welcoming setting.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Dental Crowns', 'Bridges', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Established practice on Trower Road',
        'Trusted by the Darwin community',
        'Wide range of dental services',
        'Experienced professional team',
        'Welcoming and professional setting',
      ],
    },
    {
      name: 'Darwin Dental Group',
      slug: 'darwin-dental-group',
      suburb: 'Darwin',
      address: '20 Knuckey Street, Darwin NT 0800',
      phone: '(08) 8941 1170',
      website: 'https://www.darwindentalgroup.com.au',
      description: 'Darwin Dental Group is a comprehensive dental practice in the Darwin CBD providing quality care for individuals and families. Located on Knuckey Street, the practice offers a full range of dental services with a team of experienced dentists committed to excellent oral health outcomes and patient satisfaction.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Children\'s Dentistry', 'Wisdom Teeth Removal', 'Emergency Dentistry'],
      highlights: [
        'Comprehensive Darwin CBD dental practice',
        'Full range of dental services',
        'Experienced team of dentists',
        'Family and individual care',
        'Central Knuckey Street location',
      ],
    },
  ],

  act: [
    {
      name: 'Downtown Dental Canberra',
      slug: 'downtown-dental-canberra',
      suburb: 'Braddon',
      address: '1/30 Lonsdale Street, Braddon ACT 2612',
      phone: '(02) 6257 2896',
      website: 'https://www.downtowndental.com.au',
      description: 'Downtown Dental Canberra is a modern dental practice in the vibrant Braddon precinct, providing comprehensive dental care to the Canberra community. The practice offers a full range of dental services from routine check-ups to advanced cosmetic treatments. Their team of experienced dentists combines modern technology with personalised care to deliver exceptional dental outcomes.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Invisalign', 'Teeth Whitening', 'Veneers', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Modern practice in vibrant Braddon precinct',
        'Invisalign certified provider',
        'Comprehensive cosmetic dentistry services',
        'Latest dental technology and digital scanning',
        'Experienced team with personalised care approach',
      ],
    },
    {
      name: 'My Dentist Canberra',
      slug: 'my-dentist-canberra',
      suburb: 'Bruce',
      address: 'Jamison Centre, Bowman Street, Bruce ACT 2617',
      phone: '(02) 6251 5554',
      website: 'https://www.mydentistcanberra.com.au',
      description: 'My Dentist Canberra is a family-friendly dental practice located in the Jamison Centre at Bruce. The practice serves the Belconnen district and surrounding areas with comprehensive dental services for patients of all ages. Their caring team provides gentle dental care with a focus on patient comfort and education, making dental visits a positive experience for the whole family.',
      services: ['General Dentistry', 'Children\'s Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Dentures', 'Emergency Dentistry'],
      highlights: [
        'Family-friendly practice in Jamison Centre',
        'Serving the Belconnen district and beyond',
        'Gentle care with focus on patient comfort',
        'Comprehensive services for all ages',
        'Convenient shopping centre location with parking',
      ],
    },
    {
      name: 'Belconnen Dental Centre',
      slug: 'belconnen-dental-centre',
      suburb: 'Belconnen',
      address: 'Level 1, Westfield Belconnen, Benjamin Way, Belconnen ACT 2617',
      phone: '(02) 6251 2288',
      website: 'https://www.belconnendentalcentre.com.au',
      description: 'Belconnen Dental Centre is conveniently located within Westfield Belconnen, providing easy access to quality dental care for Canberra\'s north side residents. The practice offers a comprehensive range of dental services with extended hours to suit busy schedules. Their experienced team delivers professional dental care in a modern, comfortable environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Bridges', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry'],
      highlights: [
        'Convenient Westfield Belconnen location',
        'Extended hours including weekends',
        'Easy parking at shopping centre',
        'Professional team with modern facilities',
        'Walk-in emergency appointments welcome',
      ],
    },
    {
      name: 'Woden Dental Centre',
      slug: 'woden-dental-centre',
      suburb: 'Phillip',
      address: 'Level 1, Woden Plaza, Keltie Street, Phillip ACT 2606',
      phone: '(02) 6281 4744',
      website: 'https://www.wodendentalcentre.com.au',
      description: 'Woden Dental Centre is located in Woden Plaza, providing convenient access to quality dental care for Canberra\'s south side. The practice offers a full range of general and cosmetic dental services for patients of all ages. Their team of experienced dental professionals is committed to delivering quality care with a gentle, patient-focused approach.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Children\'s Dentistry', 'Dentures', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Convenient Woden Plaza location',
        'Serving Canberra\'s south side community',
        'Comprehensive services for all ages',
        'Gentle, patient-focused approach',
        'Easy access with shopping centre parking',
      ],
    },
    {
      name: 'Capital Dentistry',
      slug: 'capital-dentistry',
      suburb: 'Phillip',
      address: '1/22 Corinna Street, Phillip ACT 2606',
      phone: '(02) 6281 6669',
      website: 'https://www.capitaldentistry.com.au',
      description: 'Capital Dentistry is a premium dental practice in Phillip, Woden, offering comprehensive dental care with a focus on cosmetic and restorative excellence. The practice provides a wide range of dental treatments using the latest technology and techniques. Their skilled team is dedicated to creating beautiful, healthy smiles for the Canberra community.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Veneers', 'Teeth Whitening', 'Invisalign', 'Dental Crowns', 'Root Canal Treatment'],
      highlights: [
        'Premium practice with cosmetic and restorative focus',
        'Dental implant expertise',
        'Invisalign certified provider',
        'Latest technology and techniques',
        'Dedicated to creating beautiful, healthy smiles',
      ],
    },
    {
      name: 'Gungahlin Dental Surgery',
      slug: 'gungahlin-dental-surgery',
      suburb: 'Gungahlin',
      address: '37 Anthony Rolfe Avenue, Gungahlin ACT 2912',
      phone: '(02) 6242 7288',
      website: 'https://www.gungahlindental.com.au',
      description: 'Gungahlin Dental Surgery provides quality family dental care in the heart of Gungahlin Town Centre. The practice offers a comprehensive range of dental services from routine check-ups and preventive care to cosmetic and restorative treatments in a comfortable, welcoming environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Dental Check-ups'],
      highlights: [
        'Conveniently located in Gungahlin Town Centre',
        'Family-friendly practice welcoming all ages',
        'Comprehensive preventive and cosmetic services',
        'Emergency dental appointments available',
        'Caring team focused on patient comfort',
      ],
    },
    {
      name: 'Pacific Smiles Dental Tuggeranong',
      slug: 'pacific-smiles-dental-tuggeranong',
      suburb: 'Tuggeranong',
      address: 'South Point Shopping Centre, Tuggeranong ACT 2900',
      phone: '(02) 6233 9301',
      website: 'https://www.pacificsmilesdental.com.au',
      description: 'Pacific Smiles Dental Tuggeranong is part of Australia\'s leading dental group, located in the South Point Shopping Centre. The practice provides high-quality dental care with a focus on making dentistry accessible and affordable for individuals and families in the Tuggeranong Valley.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Orthodontics', 'Dental Implants', 'Teeth Whitening', 'Children\'s Dentistry', 'Emergency Dentistry', 'Dental Check-ups'],
      highlights: [
        'Part of Australia\'s largest dental group',
        'Convenient South Point Shopping Centre location',
        'Affordable dental care with flexible payments',
        'Modern facilities with digital X-rays',
        'Accepting new patients of all ages',
      ],
    },
    {
      name: 'Northside Family Dental',
      slug: 'northside-family-dental',
      suburb: 'Gungahlin',
      address: 'Suite 1.7, Level 1, 33 Hibberson Street, Gungahlin ACT 2912',
      phone: '(02) 6242 7777',
      website: 'https://www.northsidefamilydental.com.au',
      description: 'Northside Family Dental is a welcoming dental practice in Gungahlin providing comprehensive dental care for the whole family. The practice offers a full range of general, cosmetic, and preventive dental services with a team dedicated to delivering gentle, high-quality care in a modern setting.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Veneers', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Welcoming family dental practice',
        'Gentle, high-quality dental care',
        'Modern Gungahlin location',
        'Comprehensive services for all ages',
        'Dedicated and caring dental team',
      ],
    },
    {
      name: 'Franklin Bright Smiles',
      slug: 'franklin-bright-smiles',
      suburb: 'Franklin',
      address: '3/54 Nullarbor Avenue, Franklin ACT 2913',
      phone: '(02) 6274 0404',
      website: 'https://www.franklinbrightsmiles.com.au',
      description: 'Franklin Bright Smiles is a modern dental practice in Canberra\'s growing Franklin suburb, providing quality dental care for the Gungahlin district. The practice offers a range of general, cosmetic, and preventive dental services with a friendly team committed to creating bright, healthy smiles.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Children\'s Dentistry', 'Dental Crowns', 'Root Canal Treatment', 'Dental Check-ups', 'Emergency Dentistry'],
      highlights: [
        'Modern practice in growing Franklin suburb',
        'Quality care for the Gungahlin district',
        'Friendly and approachable team',
        'General and cosmetic dental services',
        'Convenient local dental care',
      ],
    },
    {
      name: 'Identity Dentistry',
      slug: 'identity-dentistry',
      suburb: 'Deakin',
      address: '27 Hopetoun Circuit, Deakin ACT 2600',
      phone: '(02) 6285 3288',
      website: 'https://www.identitydentistry.com.au',
      description: 'Identity Dentistry is a premium dental practice in Deakin offering exceptional cosmetic and general dental care. The practice is known for its focus on aesthetic excellence and patient satisfaction, with a team of skilled professionals delivering personalised treatments using the latest dental technology and techniques.',
      services: ['Cosmetic Dentistry', 'General Dentistry', 'Dental Implants', 'Veneers', 'Teeth Whitening', 'Invisalign', 'Smile Makeovers', 'Root Canal Treatment'],
      highlights: [
        'Premium Deakin dental practice',
        'Cosmetic dentistry specialists',
        'Focus on aesthetic excellence',
        'Latest dental technology and techniques',
        'Personalised treatment approach',
      ],
    },
  ],
};

// ============================================================
// HELPERS
// ============================================================
const outDir = __dirname;

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function topServices(services, n = 3) {
  return services.slice(0, n);
}

// State-specific gradient colours for placeholders
const stateColors = {
  vic: ['#134e4a', '#0d9488'],
  nsw: ['#0e7490', '#06b6d4'],
  qld: ['#991b1b', '#dc2626'],
  sa: ['#9a3412', '#ea580c'],
  wa: ['#854d0e', '#ca8a04'],
  tas: ['#166534', '#16a34a'],
  nt: ['#92400e', '#d97706'],
  act: ['#115e59', '#14b8a6'],
};

function practicePlaceholder(practice, stateSlug, size = 'sm') {
  const colors = stateColors[stateSlug] || stateColors.vic;
  const initial = practice.name.charAt(0).toUpperCase();
  const sizeClass = size === 'lg' ? 'placeholder-lg' : 'placeholder-sm';
  const imgClass = size === 'lg' ? 'practice-img-lg' : 'practice-img-sm';

  // If practice has an image property, use that
  if (practice.image) {
    return `<img src="${escapeHtml(practice.image)}" alt="${escapeHtml(practice.name)}" class="${imgClass}" loading="lazy">`;
  }

  // Check for website screenshot
  const screenshotPath = path.join(__dirname, 'images', 'screenshots', stateSlug, `${practice.slug}.jpg`);
  if (fs.existsSync(screenshotPath)) {
    return `<img src="/images/screenshots/${stateSlug}/${practice.slug}.jpg" alt="${escapeHtml(practice.name)} website" class="${imgClass}" loading="lazy">`;
  }

  return `<div class="practice-placeholder ${sizeClass}" style="background: linear-gradient(135deg, ${colors[0]}, ${colors[1]});">
    <span class="placeholder-initial">${initial}</span>
    <i class="fa-solid fa-tooth placeholder-icon"></i>
  </div>`;
}

function googleMapsEmbed(address) {
  const encoded = encodeURIComponent(address);
  return `<iframe src="https://maps.google.com/maps?q=${encoded}&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="280" style="border:0; border-radius:12px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Practice location"></iframe>`;
}

function stateNav(currentSlug) {
  const stateLinks = states
    .map(
      (s) =>
        `<a href="/${s.slug}/"${s.slug === currentSlug ? ' class="active"' : ''}>${s.abbr}</a>`
    )
    .join('\n              ');
  return stateLinks + `
              <span class="nav-divider"></span>
              <a href="/about/">About</a>
              <a href="/submit-listing/" class="nav-cta"><i class="fa-solid fa-tooth"></i> List Your Practice</a>`;
}

// ============================================================
// HTML TEMPLATES
// ============================================================

function htmlShell({ title, metaDescription, bodyClass, content, canonical }) {
  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(metaDescription)}">
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/images/favicon-192.png" type="image/png" sizes="192x192">
  <link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
  <link rel="stylesheet" href="/styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="${bodyClass}">
  <header class="site-header">
    <div class="container header-inner">
      <a href="/" class="site-logo"><img src="/images/logo.png" alt="GoDental.au" height="36"></a>
      <nav class="site-nav">
        ${stateNav('')}
      </nav>
      <button class="nav-toggle" aria-label="Toggle navigation">&#9776;</button>
    </div>
  </header>
  ${content}
  <footer class="site-footer">
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} GoDental.au. All rights reserved.</p>
    </div>
  </footer>
  <script>
    document.querySelector('.nav-toggle').addEventListener('click', function() {
      document.querySelector('.site-nav').classList.toggle('open');
    });
  </script>
</body>
</html>`;
}

// --- Homepage ---
function buildHomepage() {
  const stateCards = states
    .map((s) => {
      const count = practices[s.slug].length;
      return `
        <a href="/${s.slug}/" class="state-card">
          <h2>${s.name}</h2>
          <span class="state-abbr">${s.abbr}</span>
          <p>${count} dental practice${count !== 1 ? 's' : ''}</p>
        </a>`;
    })
    .join('\n');

  const totalPractices = Object.values(practices).reduce((sum, arr) => sum + arr.length, 0);

  const content = `
  <section class="hero">
    <div class="hero-bg">
      <img src="/images/hero-dental-desk.png" alt="" width="1400" height="420">
    </div>
    <div class="container hero-content">
      <h1>Find Your Perfect Dentist</h1>
      <p class="hero-sub">Australia&rsquo;s trusted dental directory &mdash; browse ${totalPractices} verified practices across every state and territory.</p>
      <div class="hero-stats">
        <div class="hero-stat"><i class="fa-solid fa-tooth hero-stat-icon"></i><span class="hero-stat-number">${totalPractices}</span><span class="hero-stat-label">Practices</span></div>
        <div class="hero-stat"><i class="fa-solid fa-map-location-dot hero-stat-icon"></i><span class="hero-stat-number">${states.length}</span><span class="hero-stat-label">States &amp; Territories</span></div>
        <div class="hero-stat"><i class="fa-solid fa-magnifying-glass hero-stat-icon"></i><span class="hero-stat-number">100%</span><span class="hero-stat-label">Free to Search</span></div>
      </div>
    </div>
  </section>
  <main class="container">
    <h2 class="section-heading">Browse by State</h2>
    <section class="state-grid">
      ${stateCards}
    </section>
    <section class="home-cta">
      <div class="home-cta-inner">
        <h2>Are you a dental practice?</h2>
        <p>Get your practice listed on GoDental.au and reach thousands of Australians searching for a dentist.</p>
        <a href="/submit-listing/" class="btn btn-call btn-lg">Submit Your Listing</a>
      </div>
    </section>
  </main>`;

  return htmlShell({
    title: 'GoDental.au — Find a Dentist Near You',
    metaDescription:
      'Browse trusted dental practices across Australia. Find dentists in VIC, NSW, QLD, SA, WA, TAS, NT, and ACT with addresses, phone numbers, and services.',
    bodyClass: 'page-home',
    content,
  });
}

// --- State index ---
function buildStateIndex(state) {
  const statePractices = practices[state.slug];
  const practiceCards = statePractices
    .map((p) => {
      const tags = topServices(p.services)
        .map((s) => `<span class="tag">${escapeHtml(s)}</span>`)
        .join(' ');
      return `
        <div class="practice-card">
          <a href="/${state.slug}/${p.slug}/" class="practice-card-thumb">
            ${practicePlaceholder(p, state.slug, 'sm')}
          </a>
          <div class="practice-card-body">
            <h2><a href="/${state.slug}/${p.slug}/">${escapeHtml(p.name)}</a></h2>
            <p class="practice-address"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(p.address)}</p>
            <div class="tags">${tags}</div>
          </div>
          <div class="practice-card-action">
            <a href="tel:${p.phone.replace(/[^+\d]/g, '')}" class="btn btn-call"><i class="fa-solid fa-phone"></i>${escapeHtml(p.phone)}</a>
          </div>
        </div>`;
    })
    .join('\n');

  const content = `
  <main class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Home</a> &rsaquo; <span>${escapeHtml(state.name)}</span>
    </nav>
    <h1>Dentists in ${escapeHtml(state.name)}</h1>
    <p class="state-intro">Browse ${statePractices.length} dental practices in ${escapeHtml(state.name)}.</p>
    <div class="practice-list">
      ${practiceCards}
    </div>
  </main>`;

  return htmlShell({
    title: `Dentists in ${state.name} — GoDental.au`,
    metaDescription: `Find trusted dental practices in ${state.name}. Browse ${statePractices.length} dentists with addresses, phone numbers, and services across ${state.abbr}.`,
    bodyClass: 'page-state',
    content,
  });
}

// --- Practice detail ---
function buildPracticeDetail(state, practice) {
  const topSvc = topServices(practice.services);
  const servicesList = practice.services
    .map((s) => `<li>${escapeHtml(s)}</li>`)
    .join('\n              ');
  const highlightsList = practice.highlights
    .map((h) => `<li>${escapeHtml(h)}</li>`)
    .join('\n              ');
  const tags = topSvc
    .map((s) => `<span class="tag">${escapeHtml(s)}</span>`)
    .join(' ');

  // Cross-links
  const otherPractices = practices[state.slug]
    .filter((p) => p.slug !== practice.slug)
    .map(
      (p) =>
        `<li><a href="/${state.slug}/${p.slug}/">${escapeHtml(p.name)}</a> &mdash; ${escapeHtml(p.suburb)}</li>`
    )
    .join('\n              ');

  // Structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: practice.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: practice.address,
    },
    telephone: practice.phone,
    url: practice.website,
  };

  const content = `
  <script type="application/ld+json">${JSON.stringify(structuredData, null, 2)}</script>
  <main class="container practice-detail">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Home</a> &rsaquo; <a href="/${state.slug}/">${escapeHtml(state.name)}</a> &rsaquo; <span>${escapeHtml(practice.name)}</span>
    </nav>

    <div class="detail-hero-img">
      ${practicePlaceholder(practice, state.slug, 'lg')}
    </div>

    <div class="detail-layout">
      <div class="detail-main">
        <header class="detail-header">
          <h1>${escapeHtml(practice.name)}</h1>
          <p class="practice-address"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(practice.address)}</p>
          <div class="tags">${tags}</div>
        </header>

        <section class="detail-section">
          <h2>About ${escapeHtml(practice.name)}</h2>
          <p>${escapeHtml(practice.description)}</p>
        </section>

        <section class="detail-section">
          <h2>Services</h2>
          <ul class="services-list">
              ${servicesList}
          </ul>
        </section>

        <section class="detail-section">
          <h2>Why Choose ${escapeHtml(practice.name)}</h2>
          <ul class="highlights-list">
              ${highlightsList}
          </ul>
        </section>

        ${buildReviewsSection(state.slug, practice.slug)}

        <section class="detail-section">
          <h2><i class="fa-solid fa-map-location-dot"></i> Location</h2>
          <div class="map-embed">
            ${googleMapsEmbed(practice.name + ', ' + practice.address)}
          </div>
        </section>

        <section class="detail-section">
          <h2>Other Dentists in ${escapeHtml(state.name)}</h2>
          <ul class="cross-links">
              ${otherPractices}
          </ul>
        </section>
      </div>

      <aside class="detail-sidebar">
        <div class="sidebar-card">
          <h3>Contact</h3>
          <a href="tel:${practice.phone.replace(/[^+\d]/g, '')}" class="btn btn-call btn-block"><i class="fa-solid fa-phone"></i>Call ${escapeHtml(practice.phone)}</a>
          <a href="${escapeHtml(practice.website)}" target="_blank" rel="noopener nofollow" class="btn btn-website btn-block"><i class="fa-solid fa-globe"></i> Visit Website</a>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(practice.name + ' ' + practice.address)}" target="_blank" rel="noopener nofollow" class="btn btn-reviews btn-block"><i class="fa-solid fa-star"></i> Google Reviews</a>
          <p class="sidebar-address"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(practice.address)}</p>
        </div>
      </aside>
    </div>
  </main>`;

  const metaDescription = `${practice.name} in ${practice.suburb}, ${state.abbr}. Services include ${topSvc.join(', ')}. Call ${practice.phone} to book an appointment.`;

  return htmlShell({
    title: `${practice.name} — Dentist in ${practice.suburb}, ${state.abbr}`,
    metaDescription,
    bodyClass: 'page-practice',
    content,
  });
}

// --- About page ---
function buildAboutPage() {
  const content = `
  <main class="container page-content">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Home</a> &rsaquo; <span>About Us</span>
    </nav>

    <div class="content-layout">
      <div class="content-main">
        <h1>About GoDental.au</h1>

        <section class="detail-section">
          <h2>Our Mission</h2>
          <p>GoDental.au is Australia&rsquo;s dedicated dental practice directory, built to make finding the right dentist simple, fast, and stress-free. We believe everyone deserves easy access to quality dental care, and our directory connects patients with trusted dental practices across every state and territory.</p>
        </section>

        <section class="detail-section">
          <h2>What We Do</h2>
          <p>We curate and maintain a comprehensive directory of dental practices across Australia. Each listing includes verified contact details, addresses, services offered, and key highlights to help you make an informed decision about your dental care. Whether you&rsquo;re looking for a general check-up, cosmetic dentistry, emergency care, or specialist treatment, GoDental.au helps you find the right practice near you.</p>
        </section>

        <section class="detail-section">
          <h2>Why Choose GoDental.au</h2>
          <ul class="highlights-list">
            <li>Comprehensive coverage across all 8 Australian states and territories</li>
            <li>Verified practice details including addresses, phone numbers, and websites</li>
            <li>Detailed service listings so you know what each practice offers</li>
            <li>Click-to-call functionality for instant contact</li>
            <li>Completely free for patients to search and browse</li>
            <li>Mobile-friendly design for searching on the go</li>
          </ul>
        </section>

        <section class="detail-section">
          <h2>For Dental Practices</h2>
          <p>GoDental.au is designed exclusively for dental practices. We do not list other healthcare providers, ensuring that patients searching our directory find exactly what they&rsquo;re looking for. If you run a dental practice and would like to be featured in our directory, we&rsquo;d love to hear from you.</p>
          <p style="margin-top: 1rem;"><a href="/submit-listing/" class="btn btn-call">Submit Your Practice</a></p>
        </section>

        <section class="detail-section">
          <h2>Contact Us</h2>
          <p>Have a question or suggestion? We&rsquo;re always looking to improve the directory and welcome your feedback. Reach out to us at <a href="mailto:hello@godental.au">hello@godental.au</a>.</p>
        </section>
      </div>

      <aside class="detail-sidebar">
        <div class="sidebar-card">
          <h3>Quick Links</h3>
          <ul class="sidebar-links">
            <li><a href="/">Browse All States</a></li>
            <li><a href="/submit-listing/">Submit a Listing</a></li>
            <li><a href="mailto:hello@godental.au">Contact Us</a></li>
          </ul>
        </div>
        <div class="sidebar-card" style="margin-top: 1rem;">
          <h3>Directory Stats</h3>
          <ul class="sidebar-links">
            <li>${Object.values(practices).reduce((s, a) => s + a.length, 0)} dental practices listed</li>
            <li>8 states &amp; territories</li>
            <li>Free for patients</li>
          </ul>
        </div>
      </aside>
    </div>
  </main>`;

  return htmlShell({
    title: 'About Us — GoDental.au',
    metaDescription: "Learn about GoDental.au, Australia's dedicated dental practice directory. Find trusted dentists across every state and territory, completely free.",
    bodyClass: 'page-about',
    content,
  });
}

// --- Submit Listing page ---
function buildSubmitListingPage() {
  const stateOptions = states
    .map((s) => `<option value="${s.abbr}">${s.name}</option>`)
    .join('\n                  ');

  const content = `
  <main class="container page-content">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Home</a> &rsaquo; <span>Submit a Listing</span>
    </nav>

    <div class="content-layout">
      <div class="content-main">
        <h1>List Your Dental Practice</h1>
        <p class="page-intro">GoDental.au is exclusively for <strong>dental practices</strong>. We do not accept listings from other healthcare providers, product companies, or service businesses. Complete the form below to submit your dental practice for review.</p>

        <div class="info-banner">
          <i class="fa-solid fa-circle-check"></i> <strong>What gets listed:</strong> Dental clinics, orthodontic practices, oral surgery centres, prosthodontic clinics, paediatric dental practices, and other dedicated dental care providers across Australia.
        </div>

        <div class="agency-warning">
          <i class="fa-solid fa-triangle-exclamation"></i> <strong>No agencies, please.</strong> We only accept submissions directly from dental practice owners, managers, or staff. Submissions from marketing agencies, SEO companies, or third-party listing services will not be accepted.
        </div>

        <div class="form-tabs">
          <button class="form-tab active" data-tab="single"><i class="fa-solid fa-building"></i> Single Practice</button>
          <button class="form-tab" data-tab="bulk"><i class="fa-solid fa-buildings"></i> Bulk Submission</button>
        </div>

        <form class="listing-form" id="single-form" action="https://formsubmit.co/james@jamesis.co" method="POST">
          <input type="hidden" name="_subject" value="GoDental.au — New Listing Submission">
          <input type="hidden" name="_captcha" value="false">
          <input type="hidden" name="_next" value="https://godental.au/submit-listing/?success=1">
          <input type="hidden" name="_template" value="table">
          <input type="text" name="_honey" style="display:none">
          <fieldset>
            <legend>Practice Details</legend>

            <div class="form-group">
              <label for="practice-name">Practice Name <span class="required">*</span></label>
              <input type="text" id="practice-name" name="practice_name" required placeholder="e.g. Smile Solutions">
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="practice-suburb">Suburb / City <span class="required">*</span></label>
                <input type="text" id="practice-suburb" name="suburb" required placeholder="e.g. Melbourne">
              </div>
              <div class="form-group">
                <label for="practice-state">State / Territory <span class="required">*</span></label>
                <select id="practice-state" name="state" required>
                  <option value="">Select state&hellip;</option>
                  ${stateOptions}
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="practice-address">Full Street Address <span class="required">*</span></label>
              <input type="text" id="practice-address" name="address" required placeholder="e.g. Level 1, 171 Collins Street, Melbourne VIC 3000">
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="practice-phone">Phone Number <span class="required">*</span></label>
                <input type="tel" id="practice-phone" name="phone" required placeholder="e.g. (03) 9650 2222">
              </div>
              <div class="form-group">
                <label for="practice-website">Website</label>
                <input type="url" id="practice-website" name="website" placeholder="e.g. https://www.example.com.au">
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>About Your Practice</legend>

            <div class="form-group">
              <label for="practice-description">Practice Description <span class="required">*</span></label>
              <textarea id="practice-description" name="description" rows="5" required placeholder="Tell us about your practice, your team, and what makes you unique. This will appear on your listing page."></textarea>
            </div>

            <div class="form-group">
              <label for="practice-services">Services Offered <span class="required">*</span></label>
              <textarea id="practice-services" name="services" rows="3" required placeholder="List your main services, separated by commas. e.g. General Dentistry, Cosmetic Dentistry, Dental Implants, Teeth Whitening"></textarea>
            </div>

            <div class="form-group">
              <label for="practice-highlights">Key Highlights</label>
              <textarea id="practice-highlights" name="highlights" rows="3" placeholder="What sets your practice apart? List 3-5 highlights, one per line. e.g. Over 20 years experience, State-of-the-art facilities"></textarea>
            </div>
          </fieldset>

          <fieldset>
            <legend>Contact Person</legend>

            <div class="form-row">
              <div class="form-group">
                <label for="contact-name">Your Name <span class="required">*</span></label>
                <input type="text" id="contact-name" name="contact_name" required placeholder="e.g. Dr Jane Smith">
              </div>
              <div class="form-group">
                <label for="contact-email">Your Email <span class="required">*</span></label>
                <input type="email" id="contact-email" name="contact_email" required placeholder="e.g. jane@example.com.au">
              </div>
            </div>

            <div class="form-group">
              <label for="contact-role">Your Role</label>
              <input type="text" id="contact-role" name="contact_role" placeholder="e.g. Practice Manager, Principal Dentist">
            </div>
          </fieldset>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" name="confirm_dental" required>
              I confirm this is a dental practice (not another type of healthcare or business) <span class="required">*</span>
            </label>
          </div>

          <div class="premium-offer">
            <div class="premium-offer-header">
              <i class="fa-solid fa-crown"></i> <strong>Premium Listing (Optional)</strong>
            </div>
            <p>Get your practice featured at the <strong>top of your state&rsquo;s results page</strong> with a highlighted listing badge. Simply add a link back to GoDental.au from your practice website.</p>
            <label class="checkbox-label premium-checkbox">
              <input type="checkbox" name="premium_backlink">
              <span>I have added (or will add) a link to <strong>godental.au</strong> on my practice website in exchange for a premium listing placement</span>
            </label>
            <p class="premium-note"><i class="fa-solid fa-circle-info"></i> We&rsquo;ll verify the backlink before activating your premium placement. The link can be in your footer, partners page, or links page.</p>
          </div>

          <button type="submit" class="btn btn-call btn-lg btn-submit">Submit Listing for Review</button>
          <p class="form-note">Submissions are reviewed manually. We&rsquo;ll be in touch within a few business days.</p>
        </form>

        <form class="listing-form bulk-form" id="bulk-form" style="display:none;" action="https://formsubmit.co/james@jamesis.co" method="POST">
          <input type="hidden" name="_subject" value="GoDental.au — Bulk Listing Submission">
          <input type="hidden" name="_captcha" value="false">
          <input type="hidden" name="_next" value="https://godental.au/submit-listing/?success=1">
          <input type="hidden" name="_template" value="table">
          <input type="text" name="_honey" style="display:none">
          <fieldset>
            <legend><i class="fa-solid fa-list"></i> Bulk Practice Submission</legend>
            <p style="color:#475569; margin-bottom:1rem; line-height:1.7;">Submitting multiple practices? Paste your practice details below in CSV format, or describe each practice separated by a blank line. We&rsquo;ll process them all together.</p>

            <div class="info-banner" style="margin-bottom:1.25rem;">
              <strong>CSV Format:</strong> Practice Name, Address, Suburb, State, Phone, Website (one practice per line)
            </div>

            <div class="form-group">
              <label for="bulk-data">Practice Details <span class="required">*</span></label>
              <textarea id="bulk-data" name="bulk_data" rows="10" required placeholder="Smile Solutions, Level 1 171 Collins St Melbourne VIC 3000, Melbourne, VIC, (03) 9650 2222, https://www.smilesolutions.com.au&#10;Another Dental, 45 King St Sydney NSW 2000, Sydney, NSW, (02) 9000 1234, https://www.anotherdental.com.au"></textarea>
            </div>
          </fieldset>

          <fieldset>
            <legend>Contact Person</legend>
            <div class="form-row">
              <div class="form-group">
                <label for="bulk-contact-name">Your Name <span class="required">*</span></label>
                <input type="text" id="bulk-contact-name" name="contact_name" required placeholder="e.g. Dr Jane Smith">
              </div>
              <div class="form-group">
                <label for="bulk-contact-email">Your Email <span class="required">*</span></label>
                <input type="email" id="bulk-contact-email" name="contact_email" required placeholder="e.g. jane@example.com.au">
              </div>
            </div>
            <div class="form-group">
              <label for="bulk-contact-role">Your Role</label>
              <input type="text" id="bulk-contact-role" name="contact_role" placeholder="e.g. Practice Manager, Group Owner">
            </div>
          </fieldset>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" name="confirm_dental" required>
              I confirm all submissions are dental practices and I am submitting on behalf of the practice(s) directly &mdash; not as an agency <span class="required">*</span>
            </label>
          </div>

          <div class="premium-offer">
            <div class="premium-offer-header">
              <i class="fa-solid fa-crown"></i> <strong>Premium Listing (Optional)</strong>
            </div>
            <p>Get your practices featured at the <strong>top of their state&rsquo;s results page</strong> with highlighted listing badges. Simply add a link back to GoDental.au from each practice website.</p>
            <label class="checkbox-label premium-checkbox">
              <input type="checkbox" name="premium_backlink">
              <span>I have added (or will add) a link to <strong>godental.au</strong> on the practice website(s) in exchange for premium listing placement</span>
            </label>
            <p class="premium-note"><i class="fa-solid fa-circle-info"></i> We&rsquo;ll verify backlinks before activating premium placements. Links can be in footers, partner pages, or link pages.</p>
          </div>

          <button type="submit" class="btn btn-call btn-lg btn-submit">Submit Bulk Listing for Review</button>
          <p class="form-note">Bulk submissions are reviewed manually. We&rsquo;ll be in touch within a few business days.</p>
        </form>
      </div>

      <aside class="detail-sidebar">
        <div class="sidebar-card">
          <h3>Listing Guidelines</h3>
          <ul class="sidebar-links guidelines">
            <li>Must be an Australian dental practice</li>
            <li>Accurate, current contact details required</li>
            <li>No product companies or non-dental businesses</li>
            <li>No agency or third-party submissions</li>
            <li>One listing per physical location</li>
            <li>Listings are free of charge</li>
          </ul>
        </div>
        <div class="sidebar-card" style="margin-top: 1rem;">
          <h3>What You Get</h3>
          <p class="sidebar-address" style="margin-bottom: 0.75rem;">Every listing is built to help your practice get found in Google, Google Maps, and AI search tools like ChatGPT and Perplexity.</p>
          <ul class="sidebar-links guidelines">
            <li>&#128279; Backlink from a relevant .au dental directory</li>
            <li>&#128205; Consistent NAP data</li>
            <li>&#129302; AI search visibility</li>
            <li>&#127973; Your services and highlights</li>
            <li>&#128202; Location-based structure</li>
          </ul>
        </div>
        <div class="sidebar-card" style="margin-top: 1rem;">
          <h3>Need Help?</h3>
          <p class="sidebar-address">Email us at <a href="mailto:hello@godental.au">hello@godental.au</a> if you have any questions about the listing process.</p>
        </div>
      </aside>
    </div>
  </main>
  <script>
    if (window.location.search.indexOf('success=1') !== -1) {
      var forms = document.querySelectorAll('.listing-form');
      forms.forEach(function(f) { f.style.display = 'none'; });
      var tabs = document.querySelector('.form-tabs');
      if (tabs) tabs.style.display = 'none';
      var msg = document.createElement('div');
      msg.style.cssText = 'background:#e8f5e9;border:2px solid #43a047;border-radius:12px;padding:2.5rem;text-align:center;margin:2rem 0;';
      msg.innerHTML = '<h2 style="color:#2e7d32;margin-bottom:0.5rem;">✓ Listing Submitted!</h2><p style="font-size:1.1rem;color:#333;">Thanks for submitting your practice. We\\'ll review it and be in touch shortly.</p><a href="/submit-listing/" style="display:inline-block;margin-top:1rem;color:#0077b6;">Submit another listing</a>';
      var main = document.querySelector('.listing-form-section') || document.querySelector('main');
      if (main) main.prepend(msg);
    }
    document.querySelectorAll('.form-tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        document.querySelectorAll('.form-tab').forEach(function(t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var target = tab.getAttribute('data-tab');
        document.getElementById('single-form').style.display = target === 'single' ? '' : 'none';
        document.getElementById('bulk-form').style.display = target === 'bulk' ? '' : 'none';
      });
    });
  </script>`;

  return htmlShell({
    title: 'Submit a Listing — GoDental.au',
    metaDescription: "Submit your dental practice to GoDental.au, Australia's trusted dental directory. Free listings for dental clinics across all states and territories.",
    bodyClass: 'page-submit',
    content,
  });
}

// ============================================================
// BUILD ALL PAGES
// ============================================================
// Load reviews data if available
let reviewsData = {};
const reviewsJsonPath = path.join(__dirname, 'reviews.json');
if (fs.existsSync(reviewsJsonPath)) {
  try {
    reviewsData = JSON.parse(fs.readFileSync(reviewsJsonPath, 'utf8'));
    const reviewCount = Object.values(reviewsData).filter(r => r && r.length > 0).length;
    console.log(`Loaded reviews for ${reviewCount} practices.\n`);
  } catch (e) {
    console.log('Warning: Could not parse reviews.json\n');
  }
}

function buildReviewsSection(stateSlug, practiceSlug) {
  const key = `${stateSlug}/${practiceSlug}`;
  const reviews = reviewsData[key];
  if (!reviews || reviews.length === 0) return '';

  const starHtml = (count) => {
    let s = '';
    for (let i = 0; i < count; i++) s += '★';
    for (let i = count; i < 5; i++) s += '☆';
    return s;
  };

  const reviewCards = reviews.map(r => `
            <div class="review-card">
              <div class="review-header">
                <span class="review-author">${escapeHtml(r.author)}</span>
                <span class="review-stars">${starHtml(r.stars || 5)}</span>
              </div>
              <p class="review-text">&ldquo;${escapeHtml(r.text)}&rdquo;</p>
              ${r.date ? `<span class="review-date">${escapeHtml(r.date)}</span>` : ''}
              <span class="review-source"><i class="fa-brands fa-google"></i> Google Review</span>
            </div>`).join('\n');

  return `
        <section class="detail-section">
          <h2><i class="fa-solid fa-star"></i> Patient Reviews</h2>
          <div class="reviews-list">
            ${reviewCards}
          </div>
        </section>`;
}

function build() {
  console.log('Building dental directory...\n');

  // 1. Homepage
  const homepageHtml = buildHomepage();
  fs.writeFileSync(path.join(outDir, 'index.html'), homepageHtml);
  console.log('  index.html');

  // 2. State pages + practice pages
  let practiceCount = 0;
  for (const state of states) {
    const stateDir = path.join(outDir, state.slug);
    ensureDir(stateDir);

    const stateHtml = buildStateIndex(state);
    fs.writeFileSync(path.join(stateDir, 'index.html'), stateHtml);
    console.log(`  ${state.slug}/index.html`);

    for (const practice of practices[state.slug]) {
      const practiceDir = path.join(stateDir, practice.slug);
      ensureDir(practiceDir);

      const practiceHtml = buildPracticeDetail(state, practice);
      fs.writeFileSync(path.join(practiceDir, 'index.html'), practiceHtml);
      console.log(`  ${state.slug}/${practice.slug}/index.html`);
      practiceCount++;
    }
  }

  // 3. About page
  const aboutDir = path.join(outDir, 'about');
  ensureDir(aboutDir);
  fs.writeFileSync(path.join(aboutDir, 'index.html'), buildAboutPage());
  console.log('  about/index.html');

  // 4. Submit listing page
  const submitDir = path.join(outDir, 'submit-listing');
  ensureDir(submitDir);
  fs.writeFileSync(path.join(submitDir, 'index.html'), buildSubmitListingPage());
  console.log('  submit-listing/index.html');

  const total = 1 + states.length + practiceCount + 2;
  console.log(`\nDone! Built 1 homepage + ${states.length} state pages + ${practiceCount} practice pages + 2 extra pages = ${total} pages total.`);
}

build();
