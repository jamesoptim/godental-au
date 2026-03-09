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
    {
      name: 'Hawthorn East Dental',
      slug: 'hawthorn-east-dental',
      suburb: 'Hawthorn East',
      address: '22 Camberwell Road, Hawthorn East VIC 3123',
      phone: '(03) 9882 6606',
      website: 'https://www.hawthorneastdental.com.au',
      description: 'Hawthorn East Dental provides comprehensive dental care in Melbourne\'s inner east. The clinic offers a full range of general and cosmetic dental services to patients of all ages, with a focus on personalised, high-quality care in a comfortable, modern environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Children\'s Dentistry'],
      highlights: [
        'Inner east Melbourne location in Hawthorn East',
        'Comprehensive general and cosmetic dental services',
        'Experienced and caring dental team',
        'Modern facilities with digital imaging',
        'Welcoming environment for patients of all ages',
      ],
    },
    {
      name: 'Camberwell Dental Group',
      slug: 'camberwell-dental-group',
      suburb: 'Camberwell',
      address: '1341 Toorak Road, Camberwell VIC 3124',
      phone: '(03) 9889 2675',
      website: 'https://www.camberwelldentalgroup.com.au',
      description: 'Camberwell Dental Group has been providing quality family dentistry since 1974. Located on Toorak Road, the practice offers a full range of dental treatments with a team of experienced dentists dedicated to maintaining the highest standards of care for the Camberwell community.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry'],
      highlights: [
        'Established family practice since 1974',
        'Conveniently located on Toorak Road, Camberwell',
        'Experienced team with decades of combined expertise',
        'Full range of general and specialist services',
        'Welcoming atmosphere for the whole family',
      ],
    },
    {
      name: 'Tendler Dental',
      slug: 'tendler-dental',
      suburb: 'Hawthorn East',
      address: '428 Toorak Road, Hawthorn East VIC 3123',
      phone: '(03) 9813 3855',
      website: 'https://tendlerdental.com.au',
      description: 'Tendler Dental is a well-regarded dental practice in Hawthorn East offering a comprehensive range of dental treatments. The practice is known for its attention to detail, patient comfort, and commitment to using the latest dental technologies and techniques.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Veneers', 'Teeth Whitening', 'Invisalign', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Trusted dental practice in Hawthorn East',
        'Advanced dental technology and techniques',
        'Focus on patient comfort and personalised care',
        'Cosmetic and restorative dentistry expertise',
        'Convenient Toorak Road location',
      ],
    },
    {
      name: 'Brunswick Dental Group',
      slug: 'brunswick-dental-group',
      suburb: 'Brunswick',
      address: '266 Sydney Road, Brunswick VIC 3056',
      phone: '(03) 9380 1305',
      website: 'https://brunswickdentalgroup.com.au',
      description: 'Brunswick Dental Group is a trusted family dental clinic on iconic Sydney Road. The practice provides comprehensive dental care including general, cosmetic, and emergency treatments in a friendly and welcoming environment, serving the Brunswick and wider northern suburbs community.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry', 'Dental Crowns', 'Bridges'],
      highlights: [
        'Located on Sydney Road, Brunswick',
        'Family-friendly dental practice for all ages',
        'General, cosmetic, and emergency care',
        'Experienced dental professionals',
        'Welcoming and relaxed environment',
      ],
    },
    {
      name: 'Coburg Hill Oral Care',
      slug: 'coburg-hill-oral-care',
      suburb: 'Coburg North',
      address: '7 Shorts Road, Coburg North VIC 3058',
      phone: '(03) 9354 9714',
      website: 'https://www.coburghilloralcare.com.au',
      description: 'Coburg Hill Oral Care is a modern family dental practice in Coburg North, providing quality dental care in a beautiful and peaceful environment. The clinic serves patients from Coburg, Preston, Reservoir, Brunswick, and surrounding northern suburbs.',
      services: ['General Dentistry', 'Family Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Root Canal Treatment', 'Dental Crowns', 'Children\'s Dentistry', 'Emergency Dentistry'],
      highlights: [
        'Modern, purpose-built dental clinic',
        'Serving Coburg, Preston, and surrounding suburbs',
        'Family dentistry for patients of all ages',
        'Peaceful and welcoming environment',
        'Comprehensive general and cosmetic services',
      ],
    },
    {
      name: 'Apollo Family Dental',
      slug: 'apollo-family-dental',
      suburb: 'Coburg',
      address: '76 Sydney Road, Coburg VIC 3058',
      phone: '(03) 9386 5225',
      website: 'https://www.apollofamilydental.com.au',
      description: 'Apollo Family Dental is an affordable family dental clinic on Sydney Road in Coburg. The practice provides a wide range of dental services with a focus on preventive care and patient education, making quality dentistry accessible to the whole community.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Affordable dental care in Coburg',
        'Conveniently located on Sydney Road',
        'Family-friendly with children\'s dentistry',
        'Focus on preventive care and education',
        'Same-day emergency appointments available',
      ],
    },
    {
      name: 'Box Hill Dental',
      slug: 'box-hill-dental',
      suburb: 'Box Hill',
      address: '7 Elgar Road, Box Hill VIC 3128',
      phone: '(03) 9890 3399',
      website: 'https://boxhilldental.com.au',
      description: 'Box Hill Dental has been serving the eastern suburbs of Melbourne for over 25 years. The practice offers comprehensive dental care with experienced dentists who use the latest technology to deliver outstanding results in a comfortable and caring environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Veneers', 'Root Canal Treatment', 'Wisdom Teeth Removal'],
      highlights: [
        'Over 25 years serving Melbourne\'s eastern suburbs',
        'Experienced team of dental professionals',
        'Latest dental technology and equipment',
        'Comprehensive general and cosmetic services',
        'Close to Box Hill Central shopping centre',
      ],
    },
    {
      name: 'East Bentleigh Dental Group',
      slug: 'east-bentleigh-dental-group',
      suburb: 'Bentleigh East',
      address: '781 Centre Road, Bentleigh East VIC 3165',
      phone: '(03) 9575 1100',
      website: 'https://www.ebdg.com.au',
      description: 'East Bentleigh Dental Group offers a comprehensive range of dental services in Melbourne\'s bayside area. The practice provides general, cosmetic, and restorative dentistry with a team dedicated to delivering high-quality care in a relaxed and friendly environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Children\'s Dentistry', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Comprehensive dental services in Bentleigh East',
        'Experienced team of general and specialist dentists',
        'Family-friendly practice welcoming all ages',
        'Modern facilities with advanced technology',
        'Convenient Centre Road location',
      ],
    },
    {
      name: 'Focus On Dental',
      slug: 'focus-on-dental',
      suburb: 'Footscray',
      address: 'Level 1, 31-33 Paisley Street, Footscray VIC 3011',
      phone: '(03) 9689 1014',
      website: 'https://focusondental.com.au',
      description: 'Focus On Dental is a well-established dental clinic in the heart of Footscray, providing expert dental care to Melbourne\'s western suburbs community for over 50 years. Located just minutes from Footscray Station, the practice offers comprehensive general and cosmetic dentistry.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Root Canal Treatment', 'Dental Crowns', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Over 50 years serving the Footscray community',
        'Minutes walk from Footscray Station',
        'Comprehensive general and cosmetic services',
        'Experienced and caring dental team',
        'Western suburbs dental experts',
      ],
    },
    {
      name: 'Sunshine Dental Group',
      slug: 'sunshine-dental-group',
      suburb: 'Sunshine',
      address: '13 Devonshire Road, Sunshine VIC 3020',
      phone: '(03) 9311 1056',
      website: 'https://sunshinedentalgroup.com.au',
      description: 'Sunshine Dental Group has been a cornerstone of dental care in Melbourne\'s western suburbs for close to four decades. The practice provides comprehensive general, emergency, and cosmetic dentistry to the Sunshine, Footscray, and Werribee communities.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Emergency Dentistry', 'Dental Implants', 'Teeth Whitening', 'Children\'s Dentistry', 'Dentures', 'Root Canal Treatment'],
      highlights: [
        'Nearly 40 years serving western Melbourne',
        'Multiple locations including Sunshine and Werribee',
        'Emergency dental appointments available',
        'Family-friendly practice for all ages',
        'Comprehensive range of dental treatments',
      ],
    },
    {
      name: 'The Dental Gallery',
      slug: 'the-dental-gallery',
      suburb: 'Point Cook',
      address: '4/2 Main Street, Point Cook VIC 3030',
      phone: '(03) 9395 8400',
      website: 'https://thedentalgallery.com.au',
      description: 'The Dental Gallery has been providing dental care to families in Point Cook and Melbourne\'s western suburbs since 2004. The practice offers comprehensive services from routine check-ups to cosmetic treatments, serving Sanctuary Lakes, Williams Landing, Altona, and surrounding communities.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Children\'s Dentistry', 'Teeth Whitening', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Serving Point Cook families since 2004',
        'Comprehensive dental care for the whole family',
        'Modern practice with advanced technology',
        'Covering Point Cook, Sanctuary Lakes and surrounds',
        'Experienced team of dental professionals',
      ],
    },
    {
      name: 'Point Cook Dental Group',
      slug: 'point-cook-dental-group',
      suburb: 'Point Cook',
      address: '76 Boardwalk Boulevard, Point Cook VIC 3030',
      phone: '(03) 9395 8826',
      website: 'https://www.pcdentalgroup.com.au',
      description: 'Point Cook Dental Group is a leading dental clinic serving Melbourne\'s western suburbs. Open 7 days a week, the practice provides a full range of dental services with a team of experienced professionals dedicated to delivering quality care.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Children\'s Dentistry', 'Emergency Dentistry', 'Wisdom Teeth Removal'],
      highlights: [
        'Open 7 days a week for your convenience',
        'Leading dental clinic in Point Cook',
        'Full range of general and cosmetic services',
        'Family-friendly with children\'s dental care',
        'Experienced team of dental professionals',
      ],
    },
    {
      name: 'Richmond Fine Dentistry',
      slug: 'richmond-fine-dentistry',
      suburb: 'Richmond',
      address: '33 Lennox Street, Richmond VIC 3121',
      phone: '(03) 9429 0011',
      website: 'https://www.richmondfinedentistry.com.au',
      description: 'Richmond Fine Dentistry offers premium dental care in one of Melbourne\'s most vibrant inner suburbs. The boutique practice provides exceptional general and cosmetic dentistry with attention to detail and patient comfort in a modern, stylish setting.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Veneers', 'Teeth Whitening', 'Dental Implants', 'Invisalign', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Boutique dental practice in Richmond',
        'Premium cosmetic and general dentistry',
        'Attention to detail and patient comfort',
        'Modern, stylish practice environment',
        'Convenient inner-city Melbourne location',
      ],
    },
    {
      name: 'Prahran Dental Group',
      slug: 'prahran-dental-group',
      suburb: 'Prahran',
      address: '310 Malvern Road, Prahran VIC 3181',
      phone: '(03) 9510 3188',
      website: 'https://prahrandentalgroup.com.au',
      description: 'Prahran Dental Group is a trusted dental practice serving the inner south-east suburbs of Melbourne including Prahran, South Yarra, St Kilda, and Malvern. The practice offers a comprehensive range of dental services with a focus on quality care and patient satisfaction.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Veneers', 'Children\'s Dentistry', 'Emergency Dentistry'],
      highlights: [
        'Trusted inner south-east Melbourne practice',
        'Serving Prahran, South Yarra, and St Kilda',
        'Full range of general and cosmetic services',
        'Experienced and friendly dental team',
        'Modern clinic with advanced technology',
      ],
    },
    {
      name: 'Chapel Gate Dental',
      slug: 'chapel-gate-dental',
      suburb: 'St Kilda',
      address: 'Level 1, 118 Chapel Street, St Kilda VIC 3182',
      phone: '(03) 9531 3742',
      website: 'https://chapelgatedental.com',
      description: 'Chapel Gate Dental is a modern dental practice on Chapel Street in St Kilda, offering comprehensive dental services to the bayside suburbs of Melbourne. The practice combines experienced dentistry with contemporary facilities to provide outstanding care.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Veneers', 'Dental Crowns', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry'],
      highlights: [
        'Modern practice on Chapel Street, St Kilda',
        'Comprehensive general and cosmetic dentistry',
        'Serving Melbourne\'s bayside suburbs',
        'Experienced dental professionals',
        'Contemporary facilities and technology',
      ],
    },
    {
      name: 'The Dental Place',
      slug: 'the-dental-place',
      suburb: 'Reservoir',
      address: '161 Broadway, Reservoir VIC 3073',
      phone: '(03) 9460 9611',
      website: 'https://www.thedentalplace.com.au',
      description: 'The Dental Place is a modern and spacious dental clinic in the heart of Reservoir with a welcoming, family-friendly atmosphere. The practice serves patients of all ages from Reservoir, Preston, Coburg, Bundoora, and surrounding northern suburbs.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Root Canal Treatment', 'Dental Crowns', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Modern, spacious clinic in Reservoir',
        'Family-friendly atmosphere for all ages',
        'Serving northern suburbs of Melbourne',
        'Comprehensive general and cosmetic services',
        'Experienced and caring dental team',
      ],
    },
    {
      name: 'Bundoora Family Dental',
      slug: 'bundoora-family-dental',
      suburb: 'Bundoora',
      address: '8 Dohrmann Drive, Bundoora VIC 3083',
      phone: '(03) 8560 1697',
      website: 'https://ourdental.com.au',
      description: 'Bundoora Family Dental Clinic provides safe and gentle dental care in a beautiful and peaceful environment. The clinic serves Bundoora, Greensborough, Mill Park, Heidelberg, and surrounding northern suburbs with a comprehensive range of dental treatments.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Root Canal Treatment', 'Teeth Whitening', 'Children\'s Dentistry', 'Wisdom Teeth Removal', 'Dental Crowns', 'Emergency Dentistry'],
      highlights: [
        'Safe and gentle dental care',
        'Beautiful, peaceful clinic environment',
        'Serving Bundoora and surrounding suburbs',
        'Comprehensive range of treatments',
        'Family dental care for all ages',
      ],
    },
    {
      name: 'Ringwood Dental',
      slug: 'ringwood-dental',
      suburb: 'Ringwood',
      address: '8 Warrandyte Road, Ringwood VIC 3134',
      phone: '(03) 9870 6030',
      website: 'https://ringwooddental.com.au',
      description: 'Ringwood Dental has been the trusted dental practice in Melbourne\'s eastern suburbs for generations. Operating from a state-of-the-art purpose-built facility across from Eastland Shopping Centre, the practice provides comprehensive dental care for the whole family.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Veneers', 'Children\'s Dentistry', 'Emergency Dentistry'],
      highlights: [
        'Trusted eastern suburbs practice for generations',
        'State-of-the-art purpose-built facility',
        'Opposite Eastland Shopping Centre',
        'Full range of general and cosmetic services',
        'Family dental care for all ages',
      ],
    },
    {
      name: 'Evercare Dental Group',
      slug: 'evercare-dental-group',
      suburb: 'Eltham',
      address: '918 Main Road, Eltham VIC 3095',
      phone: '(03) 9439 7771',
      website: 'https://www.evercaredental.com.au',
      description: 'Evercare Dental Group provides general and cosmetic dentistry to residents of Eltham and the surrounding suburbs. Established for over 20 years, the practice offers a comprehensive range of treatments including veneers, teeth whitening, and dental implants.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Veneers', 'Teeth Whitening', 'Dental Implants', 'Children\'s Dentistry', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Over 20 years serving the Eltham community',
        'General and cosmetic dentistry expertise',
        'Serving Eltham, Greensborough, and Diamond Creek',
        'Experienced and established dental team',
        'Comprehensive treatment options',
      ],
    },
    {
      name: 'The Pines Dental Centre',
      slug: 'the-pines-dental-centre',
      suburb: 'Templestowe',
      address: 'The Pines Shopping Centre, Reynolds Road, Templestowe VIC 3106',
      phone: '(03) 9846 2385',
      website: 'https://thepinesdentalcentre.com.au',
      description: 'The Pines Dental Centre is a trusted dental clinic in Templestowe providing comprehensive care to Doncaster East, Warrandyte, Ringwood, and nearby suburbs. The practice offers general dentistry, cosmetic treatments, braces, and Invisalign in a welcoming environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Invisalign', 'Braces', 'Dentures', 'Teeth Whitening', 'Children\'s Dentistry', 'Emergency Dentistry'],
      highlights: [
        'Conveniently located in The Pines Shopping Centre',
        'Serving Templestowe, Doncaster, and surrounds',
        'Orthodontics including Invisalign',
        'Family dental care for all ages',
        'Easy parking at shopping centre',
      ],
    },
    {
      name: 'Doncaster Hill Dental',
      slug: 'doncaster-hill-dental',
      suburb: 'Doncaster',
      address: '660 Doncaster Road, Doncaster VIC 3108',
      phone: '(03) 9848 5651',
      website: 'https://doncasterhilldental.com.au',
      description: 'Doncaster Hill Dental is a trusted dental provider serving Doncaster, Templestowe, Box Hill, and the surrounding eastern suburbs. Their experienced dental team provides comprehensive treatments from routine check-ups to advanced cosmetic and restorative procedures.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Veneers', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry'],
      highlights: [
        'Trusted dental provider in Doncaster',
        'Experienced team with comprehensive services',
        'Serving eastern suburbs of Melbourne',
        'Advanced cosmetic and restorative procedures',
        'Patient-centred approach to dental care',
      ],
    },
    {
      name: 'Frankston Dental Group',
      slug: 'frankston-dental-group',
      suburb: 'Frankston',
      address: '37 Playne Street, Frankston VIC 3199',
      phone: '(03) 9783 4485',
      website: 'https://www.frankstondental.com.au',
      description: 'Frankston Dental Group is a specialist dental practice in the heart of Frankston, offering comprehensive services including general dentistry, cosmetic treatments, dental implants, and facial aesthetics. The practice provides high-quality care to the Frankston and Mornington Peninsula community.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Veneers', 'Teeth Whitening', 'Facial Aesthetics', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Specialist dental practice in Frankston',
        'Comprehensive cosmetic and implant services',
        'Facial aesthetics treatments available',
        'Serving the Mornington Peninsula',
        'Modern facilities with latest technology',
      ],
    },
    {
      name: 'Casey Smiles Dental',
      slug: 'casey-smiles-dental',
      suburb: 'Cranbourne',
      address: '2/14 Stawell Street, Cranbourne VIC 3977',
      phone: '(03) 5996 6400',
      website: 'https://caseysmiles.com.au',
      description: 'Casey Smiles Dental is a family dental clinic in Cranbourne providing quality dental care to the Casey and surrounding communities. The practice offers comprehensive services including preventive, cosmetic, and restorative treatments with a focus on gentle, caring dentistry.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Family dental clinic in Cranbourne',
        'Serving the Casey community and surrounds',
        'Gentle and caring approach to dentistry',
        'Comprehensive preventive and cosmetic services',
        'Affordable dental care for families',
      ],
    },
    {
      name: 'Peninsula Gateway Dental',
      slug: 'peninsula-gateway-dental',
      suburb: 'Frankston',
      address: '2 Cranbourne Road, Frankston VIC 3199',
      phone: '(03) 9781 4430',
      website: 'https://gatewaydental.com.au',
      description: 'Peninsula Gateway Dental is a modern dental clinic on Cranbourne Road in Frankston, serving the Mornington Peninsula and surrounding suburbs. The practice provides high-quality dental care with an emphasis on preventive and family dentistry.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Children\'s Dentistry', 'Root Canal Treatment', 'Emergency Dentistry', 'Wisdom Teeth Removal'],
      highlights: [
        'Modern dental clinic in Frankston',
        'Serving the Mornington Peninsula',
        'Focus on preventive and family dentistry',
        'High-quality dental care',
        'Convenient Cranbourne Road location',
      ],
    },
    {
      name: 'Valley Gentle Dental',
      slug: 'valley-gentle-dental',
      suburb: 'Traralgon',
      address: '116 Hotham Street, Traralgon VIC 3844',
      phone: '(03) 5174 4016',
      website: 'https://www.valleygentledental.com.au',
      description: 'Valley Gentle Dental is a modern dental practice in Traralgon CBD providing gentle dental care to the Gippsland region. The practice offers emergency, general, and cosmetic dental services with a team of experienced and caring dental professionals.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Emergency Dentistry', 'Teeth Whitening', 'Root Canal Treatment', 'Dental Crowns', 'Children\'s Dentistry', 'Dentures'],
      highlights: [
        'Gentle dental care in Traralgon CBD',
        'Emergency dental services available',
        'Serving the wider Gippsland region',
        'Experienced and caring dental team',
        'Modern facilities with latest equipment',
      ],
    },
    {
      name: 'Latrobe Family Dental',
      slug: 'latrobe-family-dental',
      suburb: 'Traralgon',
      address: '44 Breed Street, Traralgon VIC 3844',
      phone: '(03) 5176 3500',
      website: 'https://latrobefamilydental.com.au',
      description: 'Latrobe Family Dental has been Gippsland\'s trusted family dental practice for over 35 years. The clinic provides comprehensive dental care from routine check-ups to advanced treatments, with a commitment to gentle, affordable dentistry for the Latrobe Valley community.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Dental Implants', 'Teeth Whitening', 'Root Canal Treatment', 'Dentures', 'Emergency Dentistry'],
      highlights: [
        'Over 35 years serving the Latrobe Valley',
        'Trusted family dental practice in Gippsland',
        'Gentle, affordable dental care',
        'Comprehensive services for all ages',
        'Experienced and caring team',
      ],
    },
    {
      name: 'Maude Street Dental',
      slug: 'maude-street-dental',
      suburb: 'Shepparton',
      address: '77 Maude Street, Shepparton VIC 3630',
      phone: '(03) 5831 2675',
      website: 'https://www.maudestreetdental.com.au',
      description: 'Maude Street Dental is a locally owned dental practice in Shepparton providing comprehensive dental care to the Goulburn Valley region. The practice offers modern dentistry with a focus on quality care, patient comfort, and community service.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Children\'s Dentistry', 'Root Canal Treatment', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Locally owned practice in Shepparton',
        'Serving the Goulburn Valley region',
        'Modern dentistry with quality focus',
        'Community-focused dental care',
        'Comprehensive treatment options',
      ],
    },
    {
      name: 'Knight Street Dentists',
      slug: 'knight-street-dentists',
      suburb: 'Shepparton',
      address: '118 Knight Street, Shepparton VIC 3630',
      phone: '(03) 5821 2288',
      website: 'https://www.knightstreetdentists.com.au',
      description: 'Knight Street Dentists offers a modern, progressive, and friendly approach to dentistry in Shepparton. The practice provides a full range of dental services with the latest technology and a team committed to making every dental visit as comfortable as possible.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Orthodontics', 'Dental Implants', 'Teeth Whitening', 'Children\'s Dentistry', 'Emergency Dentistry', 'Wisdom Teeth Removal'],
      highlights: [
        'Modern, progressive dental practice',
        'Friendly and welcoming approach',
        'Latest dental technology',
        'Full range of services including orthodontics',
        'Comfortable dental experience',
      ],
    },
    {
      name: 'Gippsland Dental',
      slug: 'gippsland-dental',
      suburb: 'Morwell',
      address: '230 Commercial Road, Morwell VIC 3840',
      phone: '(03) 5134 2255',
      website: 'https://gippslanddental.com.au',
      description: 'Gippsland Dental in Morwell provides comprehensive dental care to the Latrobe Valley and wider Gippsland community. The practice offers a full range of general and cosmetic dental treatments with experienced practitioners in a modern, welcoming environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Root Canal Treatment', 'Dentures', 'Children\'s Dentistry', 'Emergency Dentistry', 'Teeth Whitening'],
      highlights: [
        'Experienced dental team in Morwell',
        'Serving the Latrobe Valley and Gippsland',
        'Full range of dental treatments',
        'Modern and welcoming clinic',
        'Open Monday to Friday',
      ],
    },
    {
      name: 'Dental Smile Frankston',
      slug: 'dental-smile-frankston',
      suburb: 'Frankston',
      address: '37 Young Street, Frankston VIC 3199',
      phone: '(03) 9770 1122',
      website: 'https://dentalsmile.com.au',
      description: 'Dental Smile is a general family dental practice servicing the greater Frankston and Mornington Peninsula area. The practice provides a welcoming environment with a focus on patient comfort, offering comprehensive dental care for the whole family.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry', 'Dental Crowns', 'Dentures'],
      highlights: [
        'Family dental practice in Frankston',
        'Serving the Mornington Peninsula area',
        'Focus on patient comfort',
        'Comprehensive dental care for all ages',
        'Welcoming and caring environment',
      ],
    },
    {
      name: 'Victoria Street Dental',
      slug: 'victoria-street-dental',
      suburb: 'Richmond',
      address: '263 Victoria Street, Richmond VIC 3121',
      phone: '(03) 9427 0883',
      website: 'https://www.victoriastreetdental.com.au',
      description: 'Victoria Street Dental is a boutique dental clinic in Richmond offering outstanding general and cosmetic dentistry. The practice provides personalised care with an experienced team, conveniently located on Victoria Street near Richmond station.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Veneers', 'Root Canal Treatment', 'Dental Crowns', 'Emergency Dentistry', 'Children\'s Dentistry'],
      highlights: [
        'Boutique dental clinic in Richmond',
        'Outstanding general and cosmetic dentistry',
        'Personalised care with experienced team',
        'Near Richmond train station',
        'Modern and comfortable environment',
      ],
    },
    {
      name: 'Welsford Dental',
      slug: 'welsford-dental',
      suburb: 'Shepparton',
      address: '40 Welsford Street, Shepparton VIC 3630',
      phone: '(03) 5821 4899',
      website: 'https://www.welsforddental.com.au',
      description: 'Welsford Dental is a Shepparton dental clinic currently welcoming new patients. The practice offers high-quality family and cosmetic dental care in a comfortable and caring environment, with a focus on personalised treatment plans for each patient.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Family Dentistry', 'Teeth Whitening', 'Root Canal Treatment', 'Dental Crowns', 'Children\'s Dentistry', 'Emergency Dentistry'],
      highlights: [
        'Accepting new patients in Shepparton',
        'High-quality family and cosmetic dentistry',
        'Personalised treatment plans',
        'Comfortable and caring environment',
        'Experienced dental professionals',
      ],
    },
    {
      name: 'Radiant Smiles Dental Bundoora',
      slug: 'radiant-smiles-bundoora',
      suburb: 'Bundoora',
      address: '2 Plenty Road, Bundoora VIC 3083',
      phone: '(03) 9466 7843',
      website: 'https://radiantsmilesdb.com.au',
      description: 'Radiant Smiles Dental Bundoora provides trusted dental care for individuals and families across Bundoora, Reservoir, Thomastown, Greensborough, Eltham, and nearby suburbs. The practice offers a full range of dental services in a welcoming environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Root Canal Treatment', 'Children\'s Dentistry', 'Dental Crowns', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Trusted dental care in Bundoora',
        'Serving northern suburbs of Melbourne',
        'Comprehensive services for individuals and families',
        'Welcoming and professional environment',
        'Full range of treatments available',
      ],
    },
    {
      name: 'Crystal Dental Box Hill',
      slug: 'crystal-dental-box-hill',
      suburb: 'Box Hill',
      address: '1029 Whitehorse Road, Box Hill VIC 3128',
      phone: '(03) 9890 7888',
      website: 'https://www.crystaldentalboxhill.com',
      description: 'Crystal Dental Clinic is a family dental practice in Box Hill providing quality dental care to Melbourne\'s eastern suburbs. Located on Whitehorse Road, the practice offers comprehensive services with a focus on gentle, patient-centred care.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry', 'Dental Crowns'],
      highlights: [
        'Family dental practice in Box Hill',
        'Convenient Whitehorse Road location',
        'Gentle, patient-centred approach',
        'Comprehensive general and cosmetic services',
        'Serving Melbourne\'s eastern suburbs',
      ],
    },
    {
      name: 'Brighton Dental Clinic',
      slug: 'brighton-dental-clinic',
      suburb: 'Brighton',
      address: '173 Martin Street, Brighton VIC 3186',
      phone: '(03) 8560 5450',
      website: 'https://www.brightondental.com.au',
      description: 'Brighton Dental Clinic provides quality dental care in Melbourne\'s bayside suburb of Brighton. The practice offers a comprehensive range of dental treatments with a focus on delivering exceptional care in a professional, welcoming environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Implants', 'Veneers', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry'],
      highlights: [
        'Quality dental care in Brighton',
        'Bayside Melbourne location',
        'Comprehensive range of treatments',
        'Professional and welcoming environment',
        'Experienced dental team',
      ],
    },
    {
      name: 'Dental Care Group Armadale',
      slug: 'dental-care-group-armadale',
      suburb: 'Armadale',
      address: '95 Wattletree Road, Armadale VIC 3143',
      phone: '(03) 9509 1500',
      website: 'https://dentalcaregroup.com.au',
      description: 'Dental Care Group is a trusted dental practice on Wattletree Road in Armadale, offering same-day emergency appointments and comprehensive dental care. The practice serves South Yarra, Prahran, Toorak, and surrounding inner-south suburbs with a team of experienced dentists.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Emergency Dentistry', 'Dental Implants', 'Teeth Whitening', 'Invisalign', 'Root Canal Treatment', 'Children\'s Dentistry'],
      highlights: [
        'Same-day emergency appointments available',
        'Trusted practice in Armadale',
        'Serving South Yarra, Prahran, and Toorak',
        'Experienced team of dentists',
        'Comprehensive dental services',
      ],
    },
    {
      name: 'Werribee Dental Clinic',
      slug: 'werribee-dental-clinic',
      suburb: 'Werribee',
      address: '157 Watton Street, Werribee VIC 3030',
      phone: '(03) 9741 1079',
      website: 'https://sunshinedentalgroup.com.au/werribee-dentist/',
      description: 'This Werribee dental clinic is part of the Sunshine Dental Group, bringing quality dental care to Melbourne\'s western growth corridor. The practice provides comprehensive general, cosmetic, and emergency dental services to the Werribee and Wyndham communities.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Emergency Dentistry', 'Teeth Whitening', 'Root Canal Treatment', 'Children\'s Dentistry', 'Dentures', 'Dental Crowns'],
      highlights: [
        'Trusted dental care in Werribee',
        'Part of established Sunshine Dental Group',
        'Emergency dental services available',
        'Serving the Wyndham community',
        'Comprehensive family dental care',
      ],
    },
    {
      name: 'Dental Republic Traralgon',
      slug: 'dental-republic-traralgon',
      suburb: 'Traralgon',
      address: '101 Franklin Street, Traralgon VIC 3844',
      phone: '(03) 5174 3100',
      website: 'https://www.dentalrepublic.com.au',
      description: 'Dental Republic is a modern dental clinic in the heart of Traralgon, providing comprehensive dental care to the Gippsland community. The practice offers a wide range of general and cosmetic dental treatments with a patient-focused approach.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Veneers', 'Root Canal Treatment', 'Emergency Dentistry', 'Children\'s Dentistry'],
      highlights: [
        'Modern dental clinic in Traralgon',
        'Comprehensive dental care for Gippsland',
        'Wide range of general and cosmetic services',
        'Patient-focused approach',
        'Contemporary facilities and technology',
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
    {
      name: 'Sydney CBD Dentistry',
      slug: 'sydney-cbd-dentistry',
      suburb: 'Sydney',
      address: 'Suite 1103, Level 11, 187 Macquarie Street, Sydney NSW 2000',
      phone: '(02) 8090 1105',
      website: 'https://www.sydneycbddentistry.com.au',
      description: 'Sydney CBD Dentistry is a modern dental practice in the heart of Sydney, offering comprehensive dental care including general, cosmetic, and emergency treatments. Conveniently located on Macquarie Street, the practice serves city workers and residents with a wide range of dental services.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Implants', 'Invisalign', 'Veneers', 'Emergency Dentistry', 'Root Canal Treatment'],
      highlights: [
        'Central Sydney CBD location on Macquarie Street',
        'Comprehensive general and cosmetic services',
        'Emergency dental appointments available',
        'Modern facilities with digital technology',
        'Convenient for city workers and residents',
      ],
    },
    {
      name: 'Quay Dental Sydney',
      slug: 'quay-dental-sydney',
      suburb: 'Sydney',
      address: '1 Alfred Street, Sydney NSW 2000',
      phone: '(02) 9241 2038',
      website: 'https://quaydental.com.au',
      description: 'Quay Dental Sydney offers comprehensive general, surgical, and cosmetic dentistry in the heart of Sydney. Located near Circular Quay, the practice provides a full range of dental treatments with a focus on quality care and patient satisfaction.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Oral Surgery', 'Dental Implants', 'Teeth Whitening', 'Root Canal Treatment', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Prime location near Circular Quay',
        'General, surgical, and cosmetic dentistry',
        'Experienced team of dental professionals',
        'Serving Sydney CBD and Surry Hills',
        'Quality care in modern facilities',
      ],
    },
    {
      name: 'Bondi Dental',
      slug: 'bondi-dental',
      suburb: 'Bondi Beach',
      address: '130 Curlewis Street, Bondi Beach NSW 2026',
      phone: '(02) 9365 3988',
      website: 'https://bondidental.com.au',
      description: 'Bondi Dental is a trusted dental practice in the iconic Bondi Beach area, offering comprehensive dental care to the eastern suburbs community. The practice provides a full range of services from routine check-ups to advanced cosmetic and restorative treatments.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Veneers', 'Root Canal Treatment', 'Emergency Dentistry', 'Children\'s Dentistry'],
      highlights: [
        'Located in iconic Bondi Beach',
        'Comprehensive dental care for eastern suburbs',
        'Full range of cosmetic and general services',
        'Experienced and caring dental team',
        'Modern facilities and technology',
      ],
    },
    {
      name: 'Randwick City Dental',
      slug: 'randwick-city-dental',
      suburb: 'Randwick',
      address: '29 Belmore Road, Randwick NSW 2031',
      phone: '(02) 9398 5251',
      website: 'https://www.randwickcitydental.com.au',
      description: 'Randwick City Dental provides quality dental care on Belmore Road in Randwick, serving the eastern suburbs of Sydney. The practice offers comprehensive family and cosmetic dental services with a patient-centred approach and modern treatment options.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Root Canal Treatment', 'Dental Crowns', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Quality dental care in Randwick',
        'Serving Sydney\'s eastern suburbs',
        'Family and cosmetic dental services',
        'Patient-centred approach',
        'Modern treatment options',
      ],
    },
    {
      name: 'Smile by Design',
      slug: 'smile-by-design',
      suburb: 'Bondi Junction',
      address: 'Level 1, 4 Spring Street, Bondi Junction NSW 2022',
      phone: '(02) 9389 3333',
      website: 'https://smilebydesign.com.au',
      description: 'Smile by Design is a leading cosmetic dental practice in Bondi Junction, specialising in smile makeovers, veneers, and advanced dental treatments. The practice combines artistry with dental science to create beautiful, natural-looking results.',
      services: ['Cosmetic Dentistry', 'Veneers', 'Dental Implants', 'Teeth Whitening', 'Invisalign', 'General Dentistry', 'Smile Makeovers', 'Dental Crowns'],
      highlights: [
        'Leading cosmetic dental practice',
        'Smile makeover specialists',
        'Artistry combined with dental science',
        'Bondi Junction location',
        'Natural-looking cosmetic results',
      ],
    },
    {
      name: 'Coogee Dental',
      slug: 'coogee-dental',
      suburb: 'Coogee',
      address: '234 Coogee Bay Road, Coogee NSW 2034',
      phone: '(02) 9665 7574',
      website: 'https://coogeedental.com.au',
      description: 'Coogee Dental provides comprehensive dental care to the eastern suburbs of Sydney including Coogee, Randwick, Maroubra, and surrounding areas. The practice offers a full range of general, cosmetic, and family dental services in a welcoming environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Trusted dental care in Coogee',
        'Serving eastern suburbs of Sydney',
        'Full range of general and cosmetic services',
        'Welcoming, family-friendly environment',
        'Experienced dental professionals',
      ],
    },
    {
      name: 'Clear Dental Chatswood',
      slug: 'clear-dental-chatswood',
      suburb: 'Chatswood',
      address: '3/12 Thomas Street, Chatswood NSW 2067',
      phone: '(02) 9411 5663',
      website: 'https://www.cleardental.com.au',
      description: 'Clear Dental Chatswood is a comprehensive dental practice on Sydney\'s North Shore, open 7 days a week. Located in the heart of Chatswood with easy access to public transport and parking, the practice serves patients across the lower North Shore including Lane Cove, Artarmon, and St Leonards.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Children\'s Dentistry', 'Emergency Dentistry', 'Root Canal Treatment'],
      highlights: [
        'Open 7 days a week',
        'Central Chatswood location',
        'Easy access to public transport and parking',
        'Serving the North Shore community',
        'Comprehensive dental services',
      ],
    },
    {
      name: 'Crows Nest Dentists',
      slug: 'crows-nest-dentists',
      suburb: 'Crows Nest',
      address: '9 Albany Street, Crows Nest NSW 2065',
      phone: '(02) 9906 6024',
      website: 'https://crowsnestdentists.com.au',
      description: 'Crows Nest Dentists is an established dental practice with over 40 years of experience serving the lower North Shore of Sydney. Located near St Leonards station with free underground parking, the practice provides comprehensive dental care for patients of all ages.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Children\'s Dentistry', 'Root Canal Treatment', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Over 40 years of dental experience',
        'Free underground parking available',
        'Near St Leonards train station',
        'Serving the lower North Shore',
        'Comprehensive care for all ages',
      ],
    },
    {
      name: 'Forum Dentistry',
      slug: 'forum-dentistry',
      suburb: 'St Leonards',
      address: 'Shop 6P7, The Forum, 201 Pacific Highway, St Leonards NSW 2065',
      phone: '(02) 9438 1772',
      website: 'https://www.forumdentistry.com.au',
      description: 'Forum Dentistry is conveniently located at The Forum within St Leonards train station, providing quality dental care to the North Shore community. The practice offers comprehensive dental services with experienced dentists serving St Leonards, Wollstonecraft, North Sydney, and Chatswood.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Implants', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry', 'Dental Crowns'],
      highlights: [
        'Located within St Leonards train station',
        'Convenient North Shore location',
        'Experienced dental professionals',
        'Serving multiple North Shore suburbs',
        'Comprehensive dental services',
      ],
    },
    {
      name: 'Parramatta Dentistry',
      slug: 'parramatta-dentistry',
      suburb: 'Parramatta',
      address: 'Suite 25, Level 3, 27 Hunter Street, Parramatta NSW 2150',
      phone: '(02) 8090 1109',
      website: 'https://www.parramattadentist.sydney',
      description: 'Parramatta Dentistry offers quality dental care in the heart of western Sydney. Located on Hunter Street, the practice provides a full range of dental services from routine check-ups to advanced cosmetic and restorative treatments for the Parramatta community.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Veneers', 'Root Canal Treatment', 'Emergency Dentistry', 'Children\'s Dentistry'],
      highlights: [
        'Central Parramatta location',
        'Full range of dental services',
        'Serving western Sydney community',
        'Advanced cosmetic and restorative treatments',
        'Experienced dental team',
      ],
    },
    {
      name: 'Winning Smiles Dental',
      slug: 'winning-smiles-dental',
      suburb: 'Blacktown',
      address: '19 Second Avenue, Blacktown NSW 2148',
      phone: '(02) 9622 3333',
      website: 'https://winningsmilesdentists.com.au',
      description: 'Winning Smiles Dental Surgery is a comprehensive dental practice in Blacktown providing quality general, cosmetic, and emergency dental care. The practice specialises in pain-free dentistry and serves the greater western Sydney area with multiple locations.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Emergency Dentistry', 'Sleep Dentistry', 'Dental Implants', 'Teeth Whitening', 'Root Canal Treatment', 'Children\'s Dentistry'],
      highlights: [
        'Pain-free dentistry specialists',
        'Emergency dental services available',
        'Serving greater western Sydney',
        'Sleep dentistry options for anxious patients',
        'Multiple locations available',
      ],
    },
    {
      name: 'Smiles on Chapel Bankstown',
      slug: 'smiles-on-chapel-bankstown',
      suburb: 'Bankstown',
      address: '72 Chapel Road, Bankstown NSW 2200',
      phone: '(02) 8760 0130',
      website: 'https://smilesonchapel.com.au',
      description: 'Smiles on Chapel provides leading-edge cosmetic dentistry and complete dental care solutions in Bankstown. The practice offers a comprehensive range of services from general check-ups to advanced cosmetic treatments, serving the Bankstown and surrounding southwest Sydney communities.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Veneers', 'Orthodontics', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Leading-edge cosmetic dentistry',
        'Complete dental care solutions',
        'Serving Bankstown and southwest Sydney',
        'Comprehensive range of services',
        'Modern facilities and technology',
      ],
    },
    {
      name: 'iDental Surgery',
      slug: 'idental-surgery',
      suburb: 'Newtown',
      address: '541 King Street, Newtown NSW 2042',
      phone: '(02) 9519 5577',
      website: 'https://identalsurgery.com.au',
      description: 'iDental Surgery is a modern dental practice on iconic King Street in Newtown. The practice provides comprehensive dental care to the inner west community with a focus on quality, patient comfort, and contemporary dental techniques.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Iconic King Street Newtown location',
        'Modern dental practice with contemporary techniques',
        'Serving the inner west community',
        'Focus on quality and patient comfort',
        'Comprehensive general and cosmetic services',
      ],
    },
    {
      name: 'Garners Dental',
      slug: 'garners-dental',
      suburb: 'Marrickville',
      address: '51 Garners Avenue, Marrickville NSW 2204',
      phone: '(02) 9569 3378',
      website: 'https://garnersdental.com.au',
      description: 'Garners Dental has been serving the Marrickville and inner west community with quality dental care. The practice offers a range of services including dental crowns, bridges, implants, and whitening, with a focus on achieving excellence in dental care.',
      services: ['General Dentistry', 'Dental Crowns', 'Bridges', 'Dental Implants', 'Teeth Whitening', 'Root Canal Treatment', 'Emergency Dentistry', 'Cosmetic Dentistry'],
      highlights: [
        'Established dental practice in Marrickville',
        'Excellence in dental care',
        'Serving the inner west community',
        'Comprehensive restorative services',
        'Experienced dental professionals',
      ],
    },
    {
      name: 'Blue Tooth Dental',
      slug: 'blue-tooth-dental',
      suburb: 'Newtown',
      address: '311 King Street, Newtown NSW 2042',
      phone: '(02) 9519 2691',
      website: 'https://bluetoothdental.com.au',
      description: 'Blue Tooth Dental provides professional dental care in the vibrant suburb of Newtown. The practice offers a full range of general and cosmetic dental services with a friendly, approachable team dedicated to making every visit comfortable and stress-free.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry', 'Dental Crowns', 'Veneers'],
      highlights: [
        'Professional dental care in Newtown',
        'Friendly and approachable team',
        'Comfortable and stress-free visits',
        'Full range of dental services',
        'Vibrant King Street location',
      ],
    },
    {
      name: 'Shire Dental Centre',
      slug: 'shire-dental-centre',
      suburb: 'Miranda',
      address: '594 Kingsway, Miranda NSW 2228',
      phone: '(02) 9524 6644',
      website: 'https://www.shiredental.com.au',
      description: 'Shire Dental Centre is a team of highly qualified and experienced dentists creating healthy smiles for the Sutherland Shire community from their surgery in Miranda. The practice provides comprehensive dental services close to Cronulla with a focus on quality and patient care.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Experienced team in Miranda',
        'Serving the Sutherland Shire community',
        'Comprehensive dental services',
        'Close to Cronulla',
        'Focus on quality patient care',
      ],
    },
    {
      name: 'Cronulla Dental Centre',
      slug: 'cronulla-dental-centre',
      suburb: 'Cronulla',
      address: 'Suite 18, 17 Surf Road, Cronulla NSW 2230',
      phone: '(02) 9523 4598',
      website: 'https://cronulladentalcentre.com.au',
      description: 'Cronulla Dental Centre is a premium dental practice conveniently located in the heart of Cronulla. The practice provides affordable, high-quality dental care to the Sutherland Shire community with a comprehensive range of general and cosmetic treatments.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Implants', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Premium dental practice in Cronulla',
        'Affordable, high-quality care',
        'Serving the Sutherland Shire',
        'Comprehensive general and cosmetic treatments',
        'Convenient beachside location',
      ],
    },
    {
      name: 'Pinnacle Dental Miranda',
      slug: 'pinnacle-dental-miranda',
      suburb: 'Miranda',
      address: 'Suite 3, 1 Wandella Road, Miranda NSW 2228',
      phone: '(02) 9540 1355',
      website: 'https://www.pinnacledentalgroup.com.au',
      description: 'Pinnacle Dental Group is one of the most trusted family and cosmetic dental teams in the Sutherland Shire, providing dental services in Miranda for over 40 years. The practice offers comprehensive care with a focus on gentle, patient-centred dentistry.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Family Dentistry', 'Dental Implants', 'Teeth Whitening', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry'],
      highlights: [
        'Over 40 years serving the Sutherland Shire',
        'Trusted family and cosmetic dental team',
        'Gentle, patient-centred dentistry',
        'Comprehensive range of treatments',
        'Experienced and established practice',
      ],
    },
    {
      name: 'Newcastle City Dental',
      slug: 'newcastle-city-dental',
      suburb: 'Newcastle',
      address: '46 Hunter Street, Newcastle NSW 2300',
      phone: '(02) 4929 3778',
      website: 'https://newcastlecitydental.com.au',
      description: 'Newcastle City Dental is a family dental practice in the heart of Newcastle providing quality dental care to the Hunter Valley region. The practice offers comprehensive general and cosmetic dental services with a friendly and experienced team.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Children\'s Dentistry', 'Root Canal Treatment', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Central Newcastle location on Hunter Street',
        'Family dental practice for all ages',
        'Serving the Hunter Valley region',
        'Friendly and experienced team',
        'Comprehensive dental services',
      ],
    },
    {
      name: 'The Good Dentist Newcastle',
      slug: 'the-good-dentist-newcastle',
      suburb: 'Cooks Hill',
      address: '1/93 Darby Street, Cooks Hill NSW 2300',
      phone: '(02) 4929 6369',
      website: 'https://thegooddentist.com.au',
      description: 'The Good Dentist is a modern dental clinic on Darby Street in Cooks Hill, Newcastle. The practice provides a comfortable and welcoming environment for patients seeking quality general and cosmetic dental care in the Newcastle area.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Implants', 'Veneers', 'Root Canal Treatment', 'Emergency Dentistry', 'Children\'s Dentistry'],
      highlights: [
        'Modern dental clinic on Darby Street',
        'Comfortable and welcoming environment',
        'Quality general and cosmetic care',
        'Serving the Newcastle community',
        'Contemporary facilities and techniques',
      ],
    },
    {
      name: 'Wollongong Family Dental',
      slug: 'wollongong-family-dental',
      suburb: 'Wollongong',
      address: '1 Burelli Street, Wollongong NSW 2500',
      phone: '(02) 4295 4446',
      website: 'https://wollongongfamilydental.com.au',
      description: 'Wollongong Family Dental provides quality dental care for families in the Illawarra region. The practice offers comprehensive general and cosmetic dental services with a focus on patient comfort and preventive care.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Root Canal Treatment', 'Dental Crowns', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Family dental care in Wollongong',
        'Serving the Illawarra region',
        'Focus on preventive care',
        'Comprehensive general and cosmetic services',
        'Comfortable and welcoming environment',
      ],
    },
    {
      name: 'CBD Dental Wollongong',
      slug: 'cbd-dental-wollongong',
      suburb: 'Wollongong',
      address: '1/47 Crown Street, Wollongong NSW 2500',
      phone: '(02) 4225 0505',
      website: 'https://cbd-dental.com.au',
      description: 'CBD Dental is a professional dental clinic on Crown Street in Wollongong, providing comprehensive dental care to the Illawarra community. The practice offers modern dental treatments with experienced practitioners in a convenient CBD location.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Root Canal Treatment', 'Veneers', 'Emergency Dentistry', 'Wisdom Teeth Removal'],
      highlights: [
        'Central Wollongong CBD location',
        'Professional and experienced team',
        'Modern dental treatments',
        'Serving the Illawarra community',
        'Comprehensive range of services',
      ],
    },
    {
      name: 'Dentistry Illawarra',
      slug: 'dentistry-illawarra',
      suburb: 'Wollongong',
      address: '88 Crown Street, Wollongong NSW 2500',
      phone: '(02) 4228 9205',
      website: 'https://www.dentistryillawarra.com.au',
      description: 'Dentistry Illawarra is a well-established dental practice in the heart of Wollongong on Crown Street. The practice provides comprehensive cosmetic and general dental services with a team of experienced dentists dedicated to quality oral health care.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Veneers', 'Root Canal Treatment', 'Emergency Dentistry', 'Orthodontics'],
      highlights: [
        'Well-established Wollongong practice',
        'Crown Street CBD location',
        'Experienced team of dentists',
        'Comprehensive cosmetic and general services',
        'Quality oral health care',
      ],
    },
    {
      name: 'Sydney Road Dental Care',
      slug: 'sydney-road-dental-care',
      suburb: 'Manly',
      address: '1/57 Sydney Road, Manly NSW 2095',
      phone: '(02) 9977 3288',
      website: 'https://sydneyroaddentalcare.com.au',
      description: 'Sydney Road Dental Care is a top-rated dental practice in Manly, offering cosmetic, orthodontic, implant treatments, and dental surgery. The practice serves the Northern Beaches community with a focus on delivering exceptional dental care.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Dental Surgery', 'Veneers', 'Emergency Dentistry'],
      highlights: [
        'Top-rated practice in Manly',
        'Cosmetic, orthodontic, and implant expertise',
        'Serving the Northern Beaches',
        'Exceptional dental care',
        'Convenient Manly location',
      ],
    },
    {
      name: 'Dental Design Dee Why',
      slug: 'dental-design-dee-why',
      suburb: 'Dee Why',
      address: '25/884 Pittwater Road, Dee Why NSW 2099',
      phone: '(02) 9971 8992',
      website: 'https://www.dentaldesign.com.au',
      description: 'Dental Design is a modern dental practice in Dee Why providing quality general dentistry and comprehensive dental care to the Northern Beaches community. The practice offers personalised treatment in contemporary facilities on Pittwater Road.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Modern dental practice in Dee Why',
        'Serving the Northern Beaches community',
        'Personalised dental treatment',
        'Contemporary facilities on Pittwater Road',
        'Quality general and cosmetic dentistry',
      ],
    },
    {
      name: 'Kingsway Dental Dee Why',
      slug: 'kingsway-dental-dee-why',
      suburb: 'Dee Why',
      address: '5/729 Pittwater Road, Dee Why NSW 2099',
      phone: '(02) 9972 1880',
      website: 'https://kingswaydental.com.au',
      description: 'Kingsway Dental is a family dental practice in Dee Why offering comprehensive dental care to the Northern Beaches. The practice provides a full range of general, cosmetic, and restorative treatments with a friendly and experienced team.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Family Dentistry', 'Teeth Whitening', 'Root Canal Treatment', 'Dental Crowns', 'Emergency Dentistry', 'Children\'s Dentistry'],
      highlights: [
        'Family dental practice in Dee Why',
        'Comprehensive Northern Beaches dental care',
        'Friendly and experienced team',
        'Full range of treatments',
        'Convenient Pittwater Road location',
      ],
    },
    {
      name: 'Hills Dental Care',
      slug: 'hills-dental-care',
      suburb: 'Castle Hill',
      address: '1/18 Victoria Avenue, Castle Hill NSW 2154',
      phone: '(02) 9899 3066',
      website: 'https://hillsdentalcare.com.au',
      description: 'Hills Dental Care has been providing comprehensive dental care for individuals and families across the Hills District since 2003. Conveniently located in Castle Hill, the practice serves Cherrybrook, West Pennant Hills, Kellyville, and surrounding suburbs.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Children\'s Dentistry', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Trusted Hills District practice since 2003',
        'Serving Castle Hill and surrounding suburbs',
        'Comprehensive family dental care',
        'Experienced dental professionals',
        'Modern facilities with advanced technology',
      ],
    },
    {
      name: 'Rawson Dental Epping',
      slug: 'rawson-dental-epping',
      suburb: 'Epping',
      address: '1/190 Beecroft Road, Epping NSW 2121',
      phone: '(02) 9868 1567',
      website: 'https://rawsondental.com.au',
      description: 'Rawson Dental is a well-established dental clinic in Epping serving the local community with quality general and cosmetic dental care. Located on Beecroft Road, the practice offers comprehensive treatments with a patient-focused approach.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Veneers', 'Root Canal Treatment', 'Emergency Dentistry', 'Children\'s Dentistry'],
      highlights: [
        'Established dental clinic in Epping',
        'Convenient Beecroft Road location',
        'Quality general and cosmetic dental care',
        'Patient-focused approach',
        'Serving the Epping community',
      ],
    },
    {
      name: 'Dental Square West Ryde',
      slug: 'dental-square-west-ryde',
      suburb: 'West Ryde',
      address: '7 Anthony Road, West Ryde NSW 2114',
      phone: '(02) 9874 6195',
      website: 'https://www.dentalsquare.com.au',
      description: 'Dental Square is a modern, state-of-the-art, purpose-built dental practice in West Ryde. The practice offers a full range of dental services including cosmetic dentistry, dental implants, orthodontics, and children\'s dentistry for the Ryde community.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Children\'s Dentistry', 'Teeth Whitening', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Purpose-built, state-of-the-art facility',
        'Full range of dental services',
        'Cosmetic, implant, and orthodontic expertise',
        'Family dental care including children\'s dentistry',
        'Modern practice in West Ryde',
      ],
    },
    {
      name: 'North Ryde Dentistry',
      slug: 'north-ryde-dentistry',
      suburb: 'North Ryde',
      address: '1/28 Epping Road, North Ryde NSW 2113',
      phone: '(02) 9878 5000',
      website: 'https://www.northrydedentistry.com.au',
      description: 'North Ryde Dentistry provides quality and affordable dental care to patients in North Ryde and Macquarie Park. The practice offers comprehensive dental services with a focus on delivering exceptional care using modern technology and techniques.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Emergency Dentistry', 'Root Canal Treatment', 'Children\'s Dentistry', 'Veneers'],
      highlights: [
        'Quality and affordable dental care',
        'Serving North Ryde and Macquarie Park',
        'Modern technology and techniques',
        'Comprehensive dental services',
        'Emergency appointments available',
      ],
    },
    {
      name: 'Bondi Family Dentist',
      slug: 'bondi-family-dentist',
      suburb: 'Bondi',
      address: '134 Bondi Road, Bondi NSW 2026',
      phone: '(02) 9387 1032',
      website: 'https://bondifamilydentist.com',
      description: 'Bondi Family Dentist is a general dental practice that has been serving the eastern suburbs community for 25 years. Located between Bondi Junction and Bondi Beach on Bondi Road, the practice provides trusted family dental care for patients of all ages.',
      services: ['General Dentistry', 'Family Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Root Canal Treatment', 'Dental Crowns', 'Emergency Dentistry', 'Cosmetic Dentistry'],
      highlights: [
        '25 years serving the eastern suburbs',
        'Trusted family dental practice',
        'Between Bondi Junction and Bondi Beach',
        'Care for patients of all ages',
        'Experienced and reliable dental team',
      ],
    },
    {
      name: 'Chats Dental Chatswood',
      slug: 'chats-dental-chatswood',
      suburb: 'Chatswood',
      address: '11/809 Pacific Highway, Chatswood NSW 2067',
      phone: '(02) 9412 4488',
      website: 'https://chatsdental.com.au',
      description: 'Chats Dental is a trusted dental clinic on the Pacific Highway in Chatswood, providing comprehensive dental care on Sydney\'s North Shore. The practice offers a wide range of general and cosmetic dental treatments for the Chatswood community.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Implants', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Trusted North Shore dental clinic',
        'Pacific Highway Chatswood location',
        'Comprehensive dental care',
        'Wide range of treatments',
        'Serving the Chatswood community',
      ],
    },
    {
      name: 'Bathurst Dental Care',
      slug: 'bathurst-dental-care',
      suburb: 'Bathurst',
      address: '154 Bentinck Street, Bathurst NSW 2795',
      phone: '(02) 6331 3884',
      website: 'https://bathurstdentalcare.com.au',
      description: 'Bathurst Dental Care provides quality and affordable dentistry in the heart of regional NSW. Located on Bentinck Street in Bathurst, the practice offers comprehensive dental services with experienced dentists serving the Central West community.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry', 'Dental Crowns', 'Dentures'],
      highlights: [
        'Quality dental care in regional NSW',
        'Serving the Central West community',
        'Affordable dentistry',
        'Experienced dental team',
        'Central Bathurst location',
      ],
    },
    {
      name: 'Happy Smiles Dental Tamworth',
      slug: 'happy-smiles-dental-tamworth',
      suburb: 'Tamworth',
      address: '138 Marius Street, Tamworth NSW 2340',
      phone: '(02) 6766 2236',
      website: 'https://happysmiles.com.au',
      description: 'Happy Smiles Dental Care has been helping the Tamworth community since 2007, providing quality dental care in regional NSW. The practice offers comprehensive general and cosmetic dental services in a friendly and welcoming environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry', 'Dental Crowns', 'Dentures'],
      highlights: [
        'Serving Tamworth since 2007',
        'Quality dental care in regional NSW',
        'Friendly and welcoming environment',
        'Comprehensive general and cosmetic services',
        'Experienced dental professionals',
      ],
    },
    {
      name: 'Orange Family Dental',
      slug: 'orange-family-dental',
      suburb: 'Orange',
      address: '177 Lords Place, Orange NSW 2800',
      phone: '(02) 6362 3036',
      website: 'https://www.orangefamilydental.com.au',
      description: 'Orange Family Dental provides comprehensive dental care to the Orange and Central West NSW community. The practice offers a full range of general, cosmetic, and family dental services with a focus on patient comfort and quality care.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Root Canal Treatment', 'Dental Crowns', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Comprehensive dental care in Orange',
        'Serving the Central West NSW community',
        'Full range of family dental services',
        'Focus on patient comfort',
        'Quality dental care in regional NSW',
      ],
    },
    {
      name: 'Maven Dental Newcastle',
      slug: 'maven-dental-newcastle',
      suburb: 'Newcastle',
      address: '175 Scott Street, Newcastle NSW 2300',
      phone: '(02) 4961 4402',
      website: 'https://mavendental.com.au/dentists/maven-dental-newcastle/',
      description: 'Maven Dental Newcastle is a modern dental practice in the heart of Newcastle, offering comprehensive general and cosmetic dental services. Part of the Maven Dental network, the practice provides quality care with experienced dentists serving the Hunter Valley region.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Veneers', 'Root Canal Treatment', 'Emergency Dentistry', 'Children\'s Dentistry'],
      highlights: [
        'Modern dental practice in central Newcastle',
        'Part of the Maven Dental network',
        'Quality care with experienced dentists',
        'Serving the Hunter Valley region',
        'Comprehensive general and cosmetic services',
      ],
    },
    {
      name: 'Signature Smile Dental Randwick',
      slug: 'signature-smile-dental-randwick',
      suburb: 'Randwick',
      address: 'Suite 3, 126-128 Avoca Street, Randwick NSW 2031',
      phone: '(02) 9398 9398',
      website: 'https://www.signaturesmiledental.com.au',
      description: 'Signature Smile Dental is a comprehensive dental clinic in Randwick offering orthodontic, general, and cosmetic dentistry to Sydney\'s eastern suburbs. The practice provides personalised treatment plans with a focus on achieving beautiful, healthy smiles.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Orthodontics', 'Teeth Whitening', 'Dental Implants', 'Veneers', 'Children\'s Dentistry', 'Emergency Dentistry'],
      highlights: [
        'Comprehensive dental clinic in Randwick',
        'Orthodontic and cosmetic expertise',
        'Serving Sydney\'s eastern suburbs',
        'Personalised treatment plans',
        'Focus on beautiful, healthy smiles',
      ],
    },
    {
      name: 'Lumina Dental Newtown',
      slug: 'lumina-dental-newtown',
      suburb: 'Newtown',
      address: '204 King Street, Newtown NSW 2042',
      phone: '(02) 8668 4411',
      website: 'https://luminadental.com.au',
      description: 'Lumina Dental is a contemporary dental practice on King Street in Newtown, offering comprehensive dental care to the inner west of Sydney. The practice provides modern dental treatments with a focus on patient comfort and exceptional results.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Implants', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Contemporary dental practice on King Street',
        'Serving Newtown and the inner west',
        'Modern treatments with exceptional results',
        'Focus on patient comfort',
        'Comprehensive dental services',
      ],
    },
    {
      name: 'Albert Street Dental',
      slug: 'albert-street-dental',
      suburb: 'Taree',
      address: '80 Albert Street, Taree NSW 2430',
      phone: '(02) 6551 5077',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Albert Street Dental is part of the Smile On dental network, providing quality dental care to the Taree and Manning Valley community. The practice offers comprehensive general, cosmetic, and restorative dentistry with a commitment to patient comfort and modern dental techniques.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Children\'s Dentistry', 'Emergency Dentistry', 'Root Canal Treatment', 'Dentures'],
      highlights: [
        'Part of the Smile On dental network',
        'Serving the Taree and Manning Valley community',
        'Comprehensive general and cosmetic services',
        'Modern dental techniques and equipment',
        'Patient comfort focused approach',
      ],
    },
    {
      name: 'Avoca Beach Dental',
      slug: 'avoca-beach-dental',
      suburb: 'Avoca Beach',
      address: '7/188 Avoca Drive, Avoca Beach NSW 2251',
      phone: '(02) 4381 1888',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Avoca Beach Dental is part of the Smile On dental network, offering quality dental care on the Central Coast. Located on Avoca Drive, the practice provides comprehensive dental services in a relaxed coastal setting with experienced practitioners dedicated to oral health excellence.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Children\'s Dentistry', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Part of the Smile On dental network',
        'Relaxed Central Coast location',
        'Comprehensive dental services',
        'Experienced practitioners',
        'Family-friendly coastal practice',
      ],
    },
    {
      name: 'Bonnells Bay Dental',
      slug: 'bonnells-bay-dental',
      suburb: 'Bonnells Bay',
      address: '14/330 Fishery Point Road, Bonnells Bay NSW 2264',
      phone: '(02) 4970 5400',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Bonnells Bay Dental is part of the Smile On dental network, serving the Lake Macquarie community. The practice provides quality dental care with a focus on general, cosmetic, and preventive dentistry in a modern, patient-friendly environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Children\'s Dentistry', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Part of the Smile On dental network',
        'Serving the Lake Macquarie community',
        'Modern patient-friendly environment',
        'Comprehensive preventive dental care',
        'Convenient Fishery Point Road location',
      ],
    },
    {
      name: 'Country Dental Gunnedah',
      slug: 'country-dental-gunnedah',
      suburb: 'Gunnedah',
      address: '81 Marquis Street, Gunnedah NSW 2380',
      phone: '(02) 6742 3222',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Country Dental Gunnedah is part of the Smile On dental network, bringing quality dental care to the Gunnedah community in regional NSW. The practice offers comprehensive dental services with a friendly country approach and modern facilities.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Dentures', 'Root Canal Treatment', 'Emergency Dentistry', 'Dental Crowns'],
      highlights: [
        'Part of the Smile On dental network',
        'Quality dental care in regional NSW',
        'Friendly country practice approach',
        'Comprehensive dental services',
        'Modern facilities in Gunnedah',
      ],
    },
    {
      name: 'Delroy Park Dental Care',
      slug: 'delroy-park-dental-care',
      suburb: 'Dubbo',
      address: 'Shop 2/1 Torvean Avenue, Dubbo NSW 2830',
      phone: '(02) 6882 8819',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Delroy Park Dental Care is part of the Smile On dental network, providing quality dental services to the Dubbo community in western NSW. The practice offers a full range of general and cosmetic dental treatments with experienced practitioners in a comfortable setting.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Children\'s Dentistry', 'Dentures', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Part of the Smile On dental network',
        'Serving the Dubbo community',
        'Experienced dental practitioners',
        'Full range of general and cosmetic treatments',
        'Comfortable practice setting',
      ],
    },
    {
      name: 'Empire Bay Dental',
      slug: 'empire-bay-dental',
      suburb: 'Empire Bay',
      address: '7 Sorrento Road, Empire Bay NSW 2257',
      phone: '(02) 4369 0165',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Empire Bay Dental is part of the Smile On dental network, offering dental care to the Central Coast community. Located on Sorrento Road, the practice provides comprehensive dental services in a relaxed setting with a focus on preventive and family dentistry.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Children\'s Dentistry', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Part of the Smile On dental network',
        'Central Coast community practice',
        'Relaxed and welcoming setting',
        'Preventive and family dentistry focus',
        'Comprehensive dental services',
      ],
    },
    {
      name: 'Gunyah Dental',
      slug: 'gunyah-dental',
      suburb: 'Terrigal',
      address: '168 Terrigal Drive, Terrigal NSW 2260',
      phone: '(02) 4385 1838',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Gunyah Dental is part of the Smile On dental network, providing comprehensive dental care on Terrigal Drive on the Central Coast. The practice offers a wide range of dental services including general, cosmetic, and specialist treatments in a modern coastal practice environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Orthodontics', 'Children\'s Dentistry', 'Emergency Dentistry', 'Root Canal Treatment'],
      highlights: [
        'Part of the Smile On dental network',
        'Modern Central Coast practice',
        'Wide range of dental specialties',
        'Experienced team of dental professionals',
        'Convenient Terrigal location',
      ],
    },
    {
      name: 'Hunter Family Dentistry',
      slug: 'hunter-family-dentistry',
      suburb: 'Terrigal',
      address: '168 Terrigal Drive, Terrigal NSW 2260',
      phone: '(02) 4384 4090',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Hunter Family Dentistry is part of the Smile On dental network, offering family-focused dental care on the Central Coast. The practice specialises in providing gentle, comprehensive dental treatments for the whole family in a comfortable and caring environment.',
      services: ['General Dentistry', 'Children\'s Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Part of the Smile On dental network',
        'Family-focused dental care',
        'Gentle approach for all ages',
        'Comfortable and caring environment',
        'Comprehensive family dental services',
      ],
    },
    {
      name: 'Lakeside Dental Swansea',
      slug: 'lakeside-dental-swansea',
      suburb: 'Swansea',
      address: '5/2 Belmont Street, Swansea NSW 2281',
      phone: '(02) 4971 3366',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Lakeside Dental Swansea is part of the Smile On dental network, providing dental care to the Swansea and Lake Macquarie community. The practice offers comprehensive general and cosmetic dental services with a relaxed lakeside approach to patient care.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Children\'s Dentistry', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Part of the Smile On dental network',
        'Serving Swansea and Lake Macquarie',
        'Relaxed and friendly practice',
        'Comprehensive dental services',
        'Convenient Belmont Street location',
      ],
    },
    {
      name: 'Mid North Coast Oral Surgery',
      slug: 'mid-north-coast-oral-surgery',
      suburb: 'Coffs Harbour',
      address: '3/18-20 Scarba Street, Coffs Harbour NSW 2450',
      phone: '(02) 6653 6264',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Mid North Coast Oral Surgery is part of the Smile On dental network, providing specialist oral surgery services in Coffs Harbour. The practice offers expert surgical dental care including wisdom teeth removal, dental implants, and complex extractions for the Mid North Coast community.',
      services: ['Oral Surgery', 'Dental Implants', 'Wisdom Teeth Removal', 'Complex Extractions', 'Bone Grafting', 'General Dentistry', 'Emergency Dentistry', 'Sedation Dentistry'],
      highlights: [
        'Part of the Smile On dental network',
        'Specialist oral surgery services',
        'Expert wisdom teeth removal',
        'Dental implant specialists',
        'Serving the Mid North Coast community',
      ],
    },
    {
      name: 'Mingara Dental',
      slug: 'mingara-dental',
      suburb: 'Tumbi Umbi',
      address: '2/11 Mingara Drive, Tumbi Umbi NSW 2261',
      phone: '(02) 4311 9320',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Mingara Dental is part of the Smile On dental network, providing comprehensive dental care near Mingara Recreation Club on the Central Coast. The practice offers quality general and cosmetic dental services in a convenient location with a focus on patient comfort.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Children\'s Dentistry', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Dental Implants'],
      highlights: [
        'Part of the Smile On dental network',
        'Convenient Central Coast location',
        'Quality general and cosmetic services',
        'Patient comfort focused',
        'Near Mingara Recreation Club',
      ],
    },
    {
      name: 'Nelson Bay Dental',
      slug: 'nelson-bay-dental',
      suburb: 'Nelson Bay',
      address: '3/63 Donald Street, Nelson Bay NSW 2315',
      phone: '(02) 4981 1576',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Nelson Bay Dental is part of the Smile On dental network, offering quality dental care in the Port Stephens region. Located on Donald Street, the practice provides comprehensive dental services for locals and visitors in a modern, welcoming environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Children\'s Dentistry', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Part of the Smile On dental network',
        'Serving the Port Stephens region',
        'Modern welcoming environment',
        'Comprehensive dental services',
        'Convenient Nelson Bay location',
      ],
    },
    {
      name: 'New England Oral Surgery',
      slug: 'new-england-oral-surgery',
      suburb: 'Armidale',
      address: '138 Marsh Street, Armidale NSW 2350',
      phone: '(02) 6653 6264',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'New England Oral Surgery is part of the Smile On dental network, providing specialist oral surgery services in Armidale. The practice offers expert surgical dental treatments to the New England region including dental implants, wisdom teeth removal, and complex oral procedures.',
      services: ['Oral Surgery', 'Dental Implants', 'Wisdom Teeth Removal', 'Complex Extractions', 'Bone Grafting', 'General Dentistry', 'Sedation Dentistry', 'Emergency Dentistry'],
      highlights: [
        'Part of the Smile On dental network',
        'Specialist oral surgery in the New England region',
        'Expert dental implant services',
        'Wisdom teeth removal specialists',
        'Serving Armidale and surrounds',
      ],
    },
    {
      name: 'Poynton Place Dental',
      slug: 'poynton-place-dental',
      suburb: 'Thornton',
      address: '2 Poynton Place, Thornton NSW 2322',
      phone: '(02) 4044 1840',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Poynton Place Dental and Implant Centre is part of the Smile On dental network, providing comprehensive dental and implant services in Thornton. The practice specialises in dental implants alongside a full range of general and cosmetic dental treatments for the Hunter Valley community.',
      services: ['Dental Implants', 'General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Children\'s Dentistry'],
      highlights: [
        'Part of the Smile On dental network',
        'Dental implant specialists',
        'Serving the Hunter Valley community',
        'Comprehensive general and cosmetic services',
        'Modern implant technology',
      ],
    },
    {
      name: 'Saratoga Dental',
      slug: 'saratoga-dental',
      suburb: 'Saratoga',
      address: '12/10 Village Road, Saratoga NSW 2251',
      phone: '(02) 4363 1449',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Saratoga Dental is part of the Smile On dental network, offering quality dental care in the Saratoga area on the Central Coast. The practice provides comprehensive dental services in a friendly village setting with experienced practitioners committed to patient care.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Children\'s Dentistry', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Part of the Smile On dental network',
        'Friendly village setting on the Central Coast',
        'Experienced dental practitioners',
        'Comprehensive dental services',
        'Patient-focused approach',
      ],
    },
    {
      name: 'Smile On Cootamundra',
      slug: 'smile-on-cootamundra',
      suburb: 'Cootamundra',
      address: '2 Cooper Street, Cootamundra NSW 2590',
      phone: '(02) 6942 1700',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Smile On Cootamundra is part of the Smile On dental network, providing quality dental care to the Cootamundra community in the Riverina region. The practice offers comprehensive general and cosmetic dental services with modern equipment and a dedicated team.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Children\'s Dentistry', 'Dentures', 'Root Canal Treatment', 'Emergency Dentistry', 'Dental Crowns'],
      highlights: [
        'Part of the Smile On dental network',
        'Serving the Cootamundra community',
        'Modern equipment and facilities',
        'Comprehensive dental services',
        'Dedicated regional dental team',
      ],
    },
    {
      name: 'Smile On Dubbo',
      slug: 'smile-on-dubbo',
      suburb: 'Dubbo',
      address: '177 Macquarie Street, Dubbo NSW 2830',
      phone: '(02) 5806 0848',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Smile On Dubbo is part of the Smile On dental network, offering quality dental care on Macquarie Street in Dubbo. The practice provides a full range of dental services to western NSW with modern facilities and a commitment to making dental care accessible for the regional community.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Children\'s Dentistry', 'Emergency Dentistry', 'Root Canal Treatment', 'Dentures'],
      highlights: [
        'Part of the Smile On dental network',
        'Central Dubbo location on Macquarie Street',
        'Modern dental facilities',
        'Comprehensive services for regional NSW',
        'Accessible dental care for the community',
      ],
    },
    {
      name: 'Smile On Griffith',
      slug: 'smile-on-griffith',
      suburb: 'Griffith',
      address: '2 Palla Street, Griffith NSW 2680',
      phone: '(02) 6964 1888',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Smile On Griffith is part of the Smile On dental network, providing quality dental care to the Griffith community in the Riverina. The practice offers comprehensive dental services with experienced practitioners and modern facilities dedicated to the oral health of regional NSW.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Children\'s Dentistry', 'Dental Crowns', 'Dentures', 'Root Canal Treatment', 'Emergency Dentistry'],
      highlights: [
        'Part of the Smile On dental network',
        'Serving the Griffith and Riverina community',
        'Experienced dental practitioners',
        'Modern facilities and equipment',
        'Committed to regional dental health',
      ],
    },
    {
      name: 'Smile On Kotara',
      slug: 'smile-on-kotara',
      suburb: 'Kotara',
      address: 'Westfield Kotara, Park Avenue & Northcott Drive, Kotara NSW 2289',
      phone: '(02) 4093 0929',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Smile On Kotara is part of the Smile On dental network, conveniently located inside Westfield Kotara shopping centre. The practice offers comprehensive dental care with the convenience of shopping centre access, making dental visits easy for busy families and individuals in the Newcastle region.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Children\'s Dentistry', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Part of the Smile On dental network',
        'Convenient Westfield Kotara location',
        'Easy shopping centre access',
        'Comprehensive dental services',
        'Serving the Newcastle region',
      ],
    },
    {
      name: 'Smile On Medowie',
      slug: 'smile-on-medowie',
      suburb: 'Medowie',
      address: '2/5 Muir Street, Medowie NSW 2318',
      phone: '(02) 4072 0014',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Smile On Medowie is part of the Smile On dental network, providing quality dental care to the growing Medowie community in the Hunter region. The practice offers comprehensive dental services in a modern, family-friendly environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Children\'s Dentistry', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Part of the Smile On dental network',
        'Serving the Medowie community',
        'Modern family-friendly environment',
        'Comprehensive dental care',
        'Convenient Hunter region location',
      ],
    },
    {
      name: 'Smile On Mona Vale',
      slug: 'smile-on-mona-vale',
      suburb: 'Mona Vale',
      address: '1731 Pittwater Road, Mona Vale NSW 2103',
      phone: '(02) 9997 1122',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Smile On Mona Vale is part of the Smile On dental network, offering quality dental care on Pittwater Road in Sydney\'s Northern Beaches. The practice provides comprehensive dental services in a modern setting, serving the Mona Vale and surrounding Northern Beaches community.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Children\'s Dentistry', 'Root Canal Treatment', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Part of the Smile On dental network',
        'Sydney Northern Beaches location',
        'Comprehensive general and cosmetic services',
        'Modern practice facilities',
        'Serving the Mona Vale community',
      ],
    },
    {
      name: 'Smile On Narromine',
      slug: 'smile-on-narromine',
      suburb: 'Narromine',
      address: '127 Dandaloo Street, Narromine NSW 2821',
      phone: '(02) 6889 1699',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Smile On Narromine is part of the Smile On dental network, bringing quality dental care to the Narromine community in western NSW. The practice provides comprehensive dental services with a commitment to making quality dentistry accessible in regional areas.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Children\'s Dentistry', 'Dentures', 'Root Canal Treatment', 'Emergency Dentistry', 'Dental Crowns'],
      highlights: [
        'Part of the Smile On dental network',
        'Serving the Narromine community',
        'Quality dentistry in regional NSW',
        'Comprehensive dental services',
        'Committed to accessible dental care',
      ],
    },
    {
      name: 'Smile On Penrith',
      slug: 'smile-on-penrith',
      suburb: 'Penrith',
      address: 'Westfield Penrith, 585 High Street, Penrith NSW 2750',
      phone: '(02) 4702 0797',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Smile On Penrith is part of the Smile On dental network, conveniently located inside Westfield Penrith. The practice offers comprehensive dental care with easy shopping centre access, serving families and individuals across western Sydney and the Blue Mountains foothills.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Children\'s Dentistry', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Orthodontics'],
      highlights: [
        'Part of the Smile On dental network',
        'Convenient Westfield Penrith location',
        'Easy access within shopping centre',
        'Serving western Sydney community',
        'Comprehensive family dental care',
      ],
    },
    {
      name: 'Smile On Tuggerah',
      slug: 'smile-on-tuggerah',
      suburb: 'Tuggerah',
      address: 'Westfield Tuggerah, 50 Wyong Road, Tuggerah NSW 2259',
      phone: '(02) 4319 8197',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Smile On Tuggerah is part of the Smile On dental network, located inside Westfield Tuggerah on the Central Coast. The practice provides comprehensive dental services with the convenience of a major shopping centre location, making dental care easy and accessible for the whole family.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Children\'s Dentistry', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Part of the Smile On dental network',
        'Convenient Westfield Tuggerah location',
        'Central Coast shopping centre access',
        'Family-friendly dental services',
        'Comprehensive care for all ages',
      ],
    },
    {
      name: 'Smile On Vincentia',
      slug: 'smile-on-vincentia',
      suburb: 'Vincentia',
      address: '157 Elizabeth Drive, Vincentia NSW 2540',
      phone: '(02) 4441 5706',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Smile On Vincentia is part of the Smile On dental network, providing quality dental care to the Jervis Bay and Shoalhaven community. The practice offers comprehensive dental services in a relaxed coastal setting with a focus on patient comfort and preventive care.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Children\'s Dentistry', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Part of the Smile On dental network',
        'Serving the Jervis Bay community',
        'Relaxed coastal practice setting',
        'Preventive care focus',
        'Comprehensive dental services',
      ],
    },
    {
      name: 'Smile On Wagga Wagga',
      slug: 'smile-on-wagga-wagga',
      suburb: 'Mount Austin',
      address: '53 Heath Street, Mount Austin NSW 2650',
      phone: '(02) 6925 4536',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Smile On Wagga Wagga is part of the Smile On dental network, providing comprehensive dental care to the Wagga Wagga community in the Riverina. Located in Mount Austin, the practice offers a full range of dental services with a commitment to quality regional dental care.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Children\'s Dentistry', 'Root Canal Treatment', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Part of the Smile On dental network',
        'Serving the Wagga Wagga community',
        'Comprehensive dental services',
        'Committed to regional dental care',
        'Modern facilities in Mount Austin',
      ],
    },
    {
      name: 'Tailored Teeth',
      slug: 'tailored-teeth',
      suburb: 'Burwood',
      address: '11-15 Deane Street, Burwood NSW 2134',
      phone: '(02) 8069 7945',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Tailored Teeth is part of the Smile On dental network, offering personalised dental care in Burwood in Sydney\'s inner west. The practice focuses on tailored treatment plans for each patient, providing comprehensive general and cosmetic dental services with attention to individual needs.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Veneers', 'Root Canal Treatment', 'Emergency Dentistry', 'Orthodontics'],
      highlights: [
        'Part of the Smile On dental network',
        'Personalised treatment plans',
        'Inner west Sydney location',
        'Comprehensive cosmetic services',
        'Tailored approach to dental care',
      ],
    },
    {
      name: 'Terrigal Endodontics',
      slug: 'terrigal-endodontics',
      suburb: 'Terrigal',
      address: '168 Terrigal Drive, Terrigal NSW 2260',
      phone: '(02) 4385 1838',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Terrigal Endodontics is part of the Smile On dental network, providing specialist endodontic (root canal) treatment on the Central Coast. The practice specialises in saving damaged teeth through expert root canal therapy and related procedures with advanced techniques and technology.',
      services: ['Endodontics', 'Root Canal Treatment', 'Retreatment', 'Apicoectomy', 'Emergency Dentistry', 'Dental Trauma', 'General Dentistry', 'Sedation Dentistry'],
      highlights: [
        'Part of the Smile On dental network',
        'Specialist endodontic practice',
        'Expert root canal therapy',
        'Advanced techniques and technology',
        'Central Coast specialist dental care',
      ],
    },
    {
      name: 'Tuncurry Dental',
      slug: 'tuncurry-dental',
      suburb: 'Tuncurry',
      address: '49 Manning Street, Tuncurry NSW 2428',
      phone: '(02) 6555 2777',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Tuncurry Dental is part of the Smile On dental network, providing quality dental care to the Great Lakes community on the Mid North Coast. The practice offers comprehensive general and cosmetic dental services with experienced practitioners in a friendly coastal setting.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Children\'s Dentistry', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Part of the Smile On dental network',
        'Serving the Great Lakes community',
        'Friendly Mid North Coast practice',
        'Experienced dental practitioners',
        'Comprehensive dental services',
      ],
    },
    {
      name: 'Warnervale Dental',
      slug: 'warnervale-dental',
      suburb: 'Woongarrah',
      address: '38-46 Mountain View Drive, Woongarrah NSW 2259',
      phone: '(02) 4392 0990',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Warnervale Dental is part of the Smile On dental network, providing dental care to the Woongarrah and Warnervale community on the Central Coast. The practice offers comprehensive dental services in a modern environment with a focus on family dentistry.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Children\'s Dentistry', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Dental Implants'],
      highlights: [
        'Part of the Smile On dental network',
        'Serving Woongarrah and Warnervale',
        'Modern dental environment',
        'Family dentistry focus',
        'Comprehensive Central Coast dental care',
      ],
    },
    {
      name: 'White Space Dental',
      slug: 'white-space-dental',
      suburb: 'Manly',
      address: '3 Darley Road, Manly NSW 2095',
      phone: '(02) 7204 0600',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'White Space Dental is part of the Smile On dental network, offering premium dental care in the heart of Manly on Sydney\'s Northern Beaches. The practice provides comprehensive cosmetic and general dental services in a stylish, modern setting just moments from Manly Beach.',
      services: ['Cosmetic Dentistry', 'General Dentistry', 'Dental Implants', 'Teeth Whitening', 'Veneers', 'Invisalign', 'Emergency Dentistry', 'Root Canal Treatment'],
      highlights: [
        'Part of the Smile On dental network',
        'Premium Manly Beach location',
        'Stylish modern practice',
        'Comprehensive cosmetic services',
        'Northern Beaches dental excellence',
      ],
    },
    {
      name: 'Xouris Family Dental Corrimal',
      slug: 'xouris-family-dental-corrimal',
      suburb: 'Corrimal',
      address: '7 Russell Street, Corrimal NSW 2518',
      phone: '(02) 4217 0047',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Xouris Family Dental Corrimal is part of the Smile On dental network, providing quality family dental care in the Illawarra region. The practice offers comprehensive dental services for the whole family with a gentle, caring approach in a modern environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Part of the Smile On dental network',
        'Family dental care in the Illawarra',
        'Gentle and caring approach',
        'Modern dental environment',
        'Comprehensive services for all ages',
      ],
    },
    {
      name: 'Xouris Family Dental Port Kembla',
      slug: 'xouris-family-dental-port-kembla',
      suburb: 'Port Kembla',
      address: '82 Wentworth Street, Port Kembla NSW 2505',
      phone: '(02) 4274 1069',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Xouris Family Dental Port Kembla is part of the Smile On dental network, offering family dental care on Wentworth Street in Port Kembla. The practice provides quality dental services to the southern Illawarra community with experienced practitioners and a welcoming environment.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Part of the Smile On dental network',
        'Serving the southern Illawarra community',
        'Experienced dental practitioners',
        'Welcoming family environment',
        'Quality dental care in Port Kembla',
      ],
    },
    {
      name: 'Xouris Family Dental Warrawong',
      slug: 'xouris-family-dental-warrawong',
      suburb: 'Warrawong',
      address: '232 Cowper Street, Warrawong NSW 2502',
      phone: '(02) 4274 3844',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Xouris Family Dental Warrawong is part of the Smile On dental network, providing comprehensive family dental care on Cowper Street in Warrawong. The practice serves the Illawarra community with quality general and cosmetic dental services in a comfortable, family-friendly setting.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Part of the Smile On dental network',
        'Comprehensive family dental care',
        'Serving the Illawarra community',
        'Comfortable family-friendly setting',
        'Quality general and cosmetic services',
      ],
    },
    {
      name: 'Your Tamworth Dentist',
      slug: 'your-tamworth-dentist',
      suburb: 'West Tamworth',
      address: 'Level 2, 80 Bridge Street, West Tamworth NSW 2340',
      phone: '(02) 6765 4104',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Your Tamworth Dentist is part of the Smile On dental network, providing quality dental care on Bridge Street in West Tamworth. The practice offers comprehensive dental services to the Tamworth and New England community with modern facilities and a dedicated team of dental professionals.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Children\'s Dentistry', 'Root Canal Treatment', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Part of the Smile On dental network',
        'Serving the Tamworth and New England community',
        'Modern dental facilities',
        'Dedicated team of professionals',
        'Comprehensive dental services',
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
    {
      name: 'Smile On Camp Hill',
      slug: 'smile-on-camp-hill',
      suburb: 'Camp Hill',
      address: '5 Stanley Road, Camp Hill QLD 4152',
      phone: '(07) 3843 1894',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Smile On Camp Hill is part of the Smile On dental network, offering quality dental care to Brisbane\'s eastern suburbs. Located on Stanley Road, the practice provides comprehensive general and cosmetic dentistry in a modern, welcoming environment with a focus on patient comfort and long-term oral health.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Children\'s Dentistry', 'Emergency Dentistry', 'Root Canal Treatment', 'Veneers'],
      highlights: [
        'Part of the Smile On dental network',
        'Serving Brisbane\'s eastern suburbs',
        'Modern and welcoming environment',
        'Comprehensive general and cosmetic services',
        'Focus on patient comfort and long-term care',
      ],
    },
    {
      name: 'Sunshine Coast Smile Centre',
      slug: 'sunshine-coast-smile-centre',
      suburb: 'Maroochydore',
      address: 'Level 2, Cnr The Esplanade & Second Avenue, Maroochydore QLD 4558',
      phone: '(07) 5443 2800',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Sunshine Coast Smile Centre is part of the Smile On dental network, providing comprehensive dental care in Maroochydore on the Sunshine Coast. The practice offers a full range of general, cosmetic, and specialist dental services with ocean-close convenience and a team dedicated to creating healthy, beautiful smiles.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Children\'s Dentistry', 'Emergency Dentistry', 'Oral Surgery'],
      highlights: [
        'Part of the Smile On dental network',
        'Sunshine Coast location in Maroochydore',
        'Full range of general and specialist services',
        'Experienced team of dental professionals',
        'Convenient Esplanade location',
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
      name: 'Smile On Adelaide',
      slug: 'smile-on-adelaide',
      suburb: 'Adelaide',
      address: '282 Gilbert Street, Adelaide SA 5000',
      phone: '(08) 8231 5882',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Smile On Adelaide is part of the Smile On dental network, providing quality dental care on Gilbert Street in Adelaide CBD. The practice offers comprehensive general and cosmetic dentistry with a patient-first approach, helping South Australians achieve and maintain healthy, confident smiles.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry', 'Veneers'],
      highlights: [
        'Part of the Smile On dental network',
        'Central Adelaide CBD location',
        'Comprehensive general and cosmetic services',
        'Patient-first approach to dental care',
        'Modern practice with experienced team',
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
    {
      name: 'Goldfields Family Dental',
      slug: 'goldfields-family-dental',
      suburb: 'Kalgoorlie',
      address: '83 Maritana Street, Kalgoorlie WA 6430',
      phone: '(08) 9000 3514',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Goldfields Family Dental is part of the Smile On dental network, providing comprehensive dental care to the Kalgoorlie-Boulder community in Western Australia\'s Goldfields region. The practice offers a full range of family dental services with modern facilities and experienced practitioners dedicated to regional dental health.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Children\'s Dentistry', 'Teeth Whitening', 'Dental Crowns', 'Root Canal Treatment', 'Emergency Dentistry', 'Dentures'],
      highlights: [
        'Part of the Smile On dental network',
        'Serving the Kalgoorlie-Boulder community',
        'Comprehensive family dental services',
        'Modern facilities in the Goldfields region',
        'Experienced practitioners committed to regional care',
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
    {
      name: 'Trusted Smiles Hobart',
      slug: 'trusted-smiles-hobart',
      suburb: 'Hobart',
      address: '242 Liverpool Street, Hobart TAS 7000',
      phone: '(03) 6170 7701',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Trusted Smiles Hobart is part of the Smile On dental network, providing quality dental care on Liverpool Street in Hobart CBD. The practice offers a comprehensive range of dental services for the whole family, from routine check-ups to cosmetic treatments and emergency dental care.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Children\'s Dentistry', 'Emergency Dentistry', 'Root Canal Treatment', 'Veneers'],
      highlights: [
        'Part of the Smile On dental network',
        'Central Hobart CBD location',
        'Comprehensive family dental services',
        'Modern practice with experienced team',
        'Emergency dental appointments available',
      ],
    },
    {
      name: 'Trusted Smiles Westbury',
      slug: 'trusted-smiles-westbury',
      suburb: 'Westbury',
      address: '82A Meander Valley Road, Westbury TAS 7303',
      phone: '(03) 6347 7990',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Trusted Smiles Westbury is part of the Smile On dental network, serving the Meander Valley community in northern Tasmania. The practice offers quality dental care in a relaxed country setting, with a focus on preventive dentistry and personalised treatment plans for patients of all ages.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Teeth Whitening', 'Children\'s Dentistry', 'Dentures', 'Root Canal Treatment', 'Emergency Dentistry', 'Dental Crowns'],
      highlights: [
        'Part of the Smile On dental network',
        'Serving the Meander Valley community',
        'Relaxed country practice setting',
        'Preventive dentistry focus',
        'Welcoming patients of all ages',
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
    {
      name: 'Integrated Dental Canberra',
      slug: 'integrated-dental-canberra',
      suburb: 'Canberra',
      address: '5/16 Moore Street, Canberra ACT 2601',
      phone: '(02) 6249 8551',
      website: 'https://www.smileon.com.au',
      featured: true,
      description: 'Integrated Dental Canberra is part of the Smile On dental network, offering comprehensive dental care in the heart of Canberra CBD. The practice provides a full range of general, cosmetic, and restorative dental services with a focus on patient comfort and long-term oral health outcomes.',
      services: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Teeth Whitening', 'Root Canal Treatment', 'Children\'s Dentistry', 'Emergency Dentistry', 'Orthodontics'],
      highlights: [
        'Part of the Smile On dental network',
        'Central Canberra CBD location on Moore Street',
        'Comprehensive general and cosmetic services',
        'Patient-focused approach to dental care',
        'Modern facilities with latest dental technology',
      ],
    },
  ],
};

// ============================================================
// STATE PAGE CONTENT (intro, below-fold, FAQs)
// ============================================================
const stateContent = {
  vic: {
    intro: {
      heading: 'Your Guide to Dentists in Victoria',
      paragraphs: [
        'Victoria is home to more than 6.7 million residents, with dental practices spread across Melbourne and major regional centres including Geelong, Ballarat, Bendigo, and the Mornington Peninsula. Whether you need a routine check-up in the CBD or specialist care in a growing outer suburb, our directory makes it easy to compare practices and find the right fit.',
        'From family-friendly clinics offering children\'s dentistry and preventive care, to specialist practices focusing on cosmetic treatments, dental implants, and orthodontics, Victorian dentists cover a broad range of services to suit every patient and budget.',
      ],
    },
    belowFold: {
      heading: 'Dental Care Across Victoria',
      paragraphs: [
        'Victoria has one of the most developed dental networks in Australia, with practices across metropolitan Melbourne and well-serviced regional hubs. Many Victorian clinics offer extended evening and Saturday hours to accommodate busy schedules, and most accept major health funds with on-the-spot HICAPS claiming.',
        'Regional areas like Gippsland, the Latrobe Valley, and Shepparton have seen strong growth in dental services over recent years, meaning quality care is increasingly accessible beyond Melbourne. If you are looking for emergency dental, cosmetic work, or simply a trusted local dentist, start by browsing the practices listed above.',
      ],
    },
    faqs: [
      { question: 'How do I find an emergency dentist in Melbourne?', answer: 'Several Melbourne dental practices offer same-day emergency appointments for issues like toothache, broken teeth, or dental trauma. Browse the Melbourne-based listings above and look for practices that include Emergency Dentistry in their services. Many CBD and inner-suburban clinics accept walk-in emergencies during business hours.' },
      { question: 'Are there dentists in regional Victoria on GoDental.au?', answer: 'Yes — GoDental.au lists dental practices across regional Victoria including Geelong, Ballarat, Bendigo, Gippsland, Shepparton, and the Mornington Peninsula. Use the listings above to find practices outside metropolitan Melbourne.' },
      { question: 'What should I expect at a first dental visit?', answer: 'A typical first visit in Victoria includes a comprehensive oral examination, X-rays if required, and a discussion about any concerns or symptoms. Most practices will provide a treatment plan and cost estimate before proceeding with any work. Health fund members can usually claim on the spot via HICAPS.' },
      { question: 'Do Victorian dentists offer payment plans?', answer: 'Many dental practices across Victoria offer flexible payment options including interest-free payment plans, health fund claiming, and some accept government dental vouchers. Check individual practice listings for details on their payment and billing options.' },
    ],
  },
  nsw: {
    intro: {
      heading: 'Your Guide to Dentists in New South Wales',
      paragraphs: [
        'New South Wales is Australia\'s most populous state, with over 8 million residents and dental practices spanning from Sydney\'s CBD and eastern suburbs to the Central Coast, Hunter Valley, Illawarra, and far-west regional towns. Our directory helps you compare practices by location, services, and contact details so you can book with confidence.',
        'NSW dental clinics range from large multi-specialist practices in Sydney to trusted family dentists serving communities in Newcastle, Wollongong, the Blue Mountains, and beyond. Whether you need general check-ups, cosmetic work, orthodontics, or emergency care, you\'ll find a wide choice of providers listed here.',
      ],
    },
    belowFold: {
      heading: 'Dental Care Across New South Wales',
      paragraphs: [
        'Sydney and its surrounding regions are home to some of Australia\'s most advanced dental facilities, with many practices investing in digital scanning, same-day crowns, and laser dentistry. The city\'s competitive market means patients benefit from a strong range of services and extended appointment hours, including weekends.',
        'Beyond Sydney, regional NSW has seen significant investment in dental infrastructure. Towns like Tamworth, Orange, Dubbo, and Wagga Wagga now offer comprehensive dental services that were once only available in the capital. If you live in regional NSW, browse the listings above — many practices are part of established networks with consistent quality and pricing.',
      ],
    },
    faqs: [
      { question: 'How do I find a dentist near me in Sydney?', answer: 'Browse the NSW listings above to find dental practices across Sydney — from the CBD and eastern suburbs to Parramatta, the Northern Beaches, and the Sutherland Shire. Each listing shows the full address and phone number so you can find and contact a practice close to your home or workplace.' },
      { question: 'Are there bulk-billing dentists in NSW?', answer: 'Some NSW dental practices offer bulk-billing for eligible patients under the Child Dental Benefits Schedule (CDBS) or other government programs. Check individual listings or call the practice directly to ask about bulk-billing availability and eligibility requirements.' },
      { question: 'What dental services are commonly available in NSW?', answer: 'Most NSW practices offer general dentistry, preventive care, teeth whitening, crowns and bridges, root canal treatment, and children\'s dentistry. Many also provide specialist services including dental implants, orthodontics, Invisalign, and oral surgery. Check the services listed on each practice page for details.' },
      { question: 'Can I find an emergency dentist in Newcastle or Wollongong?', answer: 'Yes — GoDental.au lists multiple dental practices in both Newcastle and Wollongong that offer emergency dental services. Look for practices listing Emergency Dentistry in their services and call ahead to confirm same-day availability.' },
    ],
  },
  qld: {
    intro: {
      heading: 'Your Guide to Dentists in Queensland',
      paragraphs: [
        'Queensland stretches from the Gold Coast and Brisbane to the Sunshine Coast, Townsville, Cairns, and Toowoomba, with dental practices serving communities across this vast state. Whether you\'re in a busy metropolitan area or a growing regional centre, our directory helps you find trusted dental care close to home.',
        'Queensland dentists offer everything from routine check-ups and family dentistry to advanced cosmetic procedures, dental implants, and specialist oral surgery. Many practices cater to tourists and new residents with flexible appointment scheduling and modern facilities.',
      ],
    },
    belowFold: {
      heading: 'Dental Care Across Queensland',
      paragraphs: [
        'With a warm climate and active lifestyle, Queenslanders place a premium on dental health and aesthetics. Brisbane and the Gold Coast are home to numerous cosmetic and general dental practices, while the Sunshine Coast and Toowoomba offer well-established clinics serving growing populations.',
        'North Queensland cities like Townsville and Cairns have developed strong dental services in recent years, including specialist and surgical practices. If you\'re relocating to or visiting Queensland, the listings above are a great starting point for finding quality dental care.',
      ],
    },
    faqs: [
      { question: 'How do I find a dentist on the Gold Coast or Sunshine Coast?', answer: 'Browse the QLD listings above to find dental practices on the Gold Coast, Sunshine Coast, and throughout South-East Queensland. Each listing includes a full address and phone number for easy contact.' },
      { question: 'Are Queensland dentists open on weekends?', answer: 'Many Queensland dental practices offer Saturday morning appointments, and some larger practices in Brisbane and the Gold Coast are open on Sundays for emergencies. Check individual listings or call the practice to confirm weekend availability.' },
      { question: 'What specialist dental services are available in QLD?', answer: 'Queensland has a wide range of dental specialists including orthodontists, periodontists, oral surgeons, and prosthodontists. Many general practices also offer specialist services in-house, such as dental implants and Invisalign. Browse the services listed on each practice page for details.' },
      { question: 'Can I use my health fund at Queensland dentists?', answer: 'Most Queensland dental practices accept all major health funds and offer on-the-spot HICAPS claiming. Some also offer gap-free preventive treatments for eligible fund members. Contact the practice directly for details about your specific fund.' },
    ],
  },
  sa: {
    intro: {
      heading: 'Your Guide to Dentists in South Australia',
      paragraphs: [
        'South Australia\'s dental practices are concentrated in Adelaide and its surrounding suburbs, with additional services available in regional centres like Mount Gambier, Murray Bridge, and the Barossa Valley. Our directory helps you compare local practices and find quality dental care that suits your needs.',
        'From CBD practices offering cutting-edge cosmetic dentistry to suburban family clinics focused on preventive care and children\'s dentistry, South Australian dentists provide a broad range of services at competitive prices.',
      ],
    },
    belowFold: {
      heading: 'Dental Care Across South Australia',
      paragraphs: [
        'Adelaide is known for its accessible and well-priced dental services compared to larger capitals like Sydney and Melbourne. Many practices in South Australia offer extended hours, flexible payment plans, and accept all major health funds with on-the-spot claiming.',
        'The South Australian government also supports dental care for eligible patients through public dental services and the Child Dental Benefits Schedule. Whether you are seeking a routine clean, cosmetic treatment, or emergency dental care, browse the SA listings above to find a practice near you.',
      ],
    },
    faqs: [
      { question: 'How much does a dental check-up cost in Adelaide?', answer: 'Dental check-up costs in Adelaide typically range from $150 to $350 depending on the practice and whether X-rays are included. Many practices offer gap-free check-ups for health fund members. Contact the practice directly for a current fee schedule.' },
      { question: 'Are there emergency dentists in Adelaide?', answer: 'Yes — several Adelaide dental practices offer same-day emergency appointments for dental pain, trauma, and urgent issues. Look for practices listing Emergency Dentistry in their services and call ahead to check availability.' },
      { question: 'Do SA dentists accept the Child Dental Benefits Schedule?', answer: 'Many South Australian dental practices accept the Child Dental Benefits Schedule (CDBS), which provides eligible children aged 2-17 with up to $1,095 in dental benefits over two years. Check with individual practices to confirm CDBS eligibility and coverage.' },
      { question: 'What cosmetic dental services are popular in Adelaide?', answer: 'Popular cosmetic services in Adelaide include teeth whitening, porcelain veneers, dental bonding, and Invisalign clear aligners. Several Adelaide practices specialise in smile makeovers using the latest digital planning technology. Browse the SA listings above for practices offering cosmetic dentistry.' },
    ],
  },
  wa: {
    intro: {
      heading: 'Your Guide to Dentists in Western Australia',
      paragraphs: [
        'Western Australia\'s dental practices serve communities from Perth and Fremantle to Joondalup, Bunbury, and regional centres in the Goldfields and Pilbara. Our directory helps you find trusted dental care whether you\'re in the Perth metro area or a remote WA town.',
        'Perth is home to a competitive dental market with practices offering everything from general check-ups and emergency care to advanced cosmetic work and surgical implants. Regional WA has also seen growth in dental services, making quality care more accessible across the state.',
      ],
    },
    belowFold: {
      heading: 'Dental Care Across Western Australia',
      paragraphs: [
        'Perth and its northern corridor — including Joondalup, Wanneroo, and Midland — have experienced strong population growth, driving expansion in dental services. Many newer practices feature modern fit-outs, digital imaging, and extended opening hours to serve growing communities.',
        'In regional WA, towns like Kalgoorlie, Bunbury, and Geraldton have well-established dental clinics. For residents in remote areas, some practices offer tele-dentistry consultations and referral pathways to Perth-based specialists. Browse the WA listings above to find a practice that suits your needs.',
      ],
    },
    faqs: [
      { question: 'How do I find a dentist in Perth\'s northern suburbs?', answer: 'Browse the WA listings above to find dental practices in Joondalup, Wanneroo, and surrounding northern suburbs. Each listing includes the full address and contact number so you can easily find a practice near you.' },
      { question: 'Are there dentists in regional Western Australia?', answer: 'Yes — GoDental.au lists dental practices across regional WA including the Goldfields, South West, and other areas. Use the listings above to find practices outside the Perth metro area.' },
      { question: 'What should I do if I have a dental emergency in Perth?', answer: 'If you have a dental emergency in Perth, contact a practice from the listings above that offers Emergency Dentistry. Many Perth dentists reserve same-day appointment slots for emergencies. For after-hours emergencies, some practices provide an emergency contact number on their website.' },
      { question: 'Do Perth dentists offer Invisalign and clear aligners?', answer: 'Many Perth dental practices offer Invisalign and other clear aligner systems. Look for practices listing Orthodontics or Invisalign in their services. Some offer free initial consultations to assess your suitability for clear aligner treatment.' },
    ],
  },
  tas: {
    intro: {
      heading: 'Your Guide to Dentists in Tasmania',
      paragraphs: [
        'Tasmania\'s dental practices are spread across Hobart, Launceston, Devonport, and smaller regional towns throughout the island state. Despite its smaller population, Tasmania offers quality dental care with practices ranging from established family clinics to modern specialist centres.',
        'Whether you\'re looking for a general dentist for routine care, a specialist for implants or orthodontics, or an emergency appointment, our directory helps you find and compare Tasmanian dental practices quickly.',
      ],
    },
    belowFold: {
      heading: 'Dental Care Across Tasmania',
      paragraphs: [
        'Hobart and Launceston are the main centres for dental services in Tasmania, with both cities offering a good selection of general and specialist practices. The state\'s smaller size means most Tasmanians are within a reasonable drive of quality dental care.',
        'Tasmania\'s dental professionals are known for their personalised, community-focused approach. Many practices have served their local communities for decades and offer the kind of continuity of care that larger mainland cities can sometimes lack. Browse the TAS listings above to find a practice near you.',
      ],
    },
    faqs: [
      { question: 'How do I find a dentist in Hobart?', answer: 'Browse the TAS listings above to find dental practices in Hobart and surrounding suburbs. Each listing includes the practice address, phone number, and services offered so you can choose the right fit.' },
      { question: 'Are there specialist dentists in Tasmania?', answer: 'Yes — Tasmania has specialist dental practitioners including orthodontists, oral surgeons, and prosthodontists, primarily based in Hobart and Launceston. Some general practices also offer specialist services like dental implants and Invisalign in-house.' },
      { question: 'What dental services are available in Launceston?', answer: 'Launceston has several well-established dental practices offering general dentistry, cosmetic treatments, emergency care, and children\'s dentistry. Browse the TAS listings above to find practices in the Launceston area.' },
      { question: 'Do Tasmanian dentists offer payment plans?', answer: 'Many Tasmanian dental practices offer flexible payment options including payment plans, health fund claiming with HICAPS, and some accept government dental vouchers. Contact individual practices for details on their payment options.' },
    ],
  },
  nt: {
    intro: {
      heading: 'Your Guide to Dentists in the Northern Territory',
      paragraphs: [
        'The Northern Territory\'s dental practices serve communities across Darwin, Alice Springs, Palmerston, and surrounding areas. While the NT has a smaller population than other states, its dental clinics offer comprehensive services ranging from general check-ups to specialist treatments.',
        'Finding a dentist in the Top End or Central Australia is straightforward with our directory. Browse the NT listings below to compare practices by location, services, and contact details.',
      ],
    },
    belowFold: {
      heading: 'Dental Care Across the Northern Territory',
      paragraphs: [
        'Darwin and Palmerston are the main centres for dental services in the NT, with most practices offering general, cosmetic, and emergency dentistry. Alice Springs also has established dental clinics serving Central Australia and surrounding communities.',
        'The NT\'s unique geography means some residents travel significant distances for dental care. Several NT practices offer extended appointment times and comprehensive treatment planning to minimise the number of visits required. Browse the listings above to find a practice that works for your situation.',
      ],
    },
    faqs: [
      { question: 'How do I find a dentist in Darwin?', answer: 'Browse the NT listings above to find dental practices in Darwin, Palmerston, and surrounding suburbs. Each listing includes the practice address and phone number for easy contact and appointment booking.' },
      { question: 'Are there dental services in Alice Springs?', answer: 'Yes — Alice Springs has several dental practices offering general and specialist services. The NT listings above include Alice Springs-based practices. Some also provide services to patients travelling from remote communities.' },
      { question: 'What emergency dental options are available in the NT?', answer: 'Several Darwin dental practices offer emergency appointments for dental pain and trauma. If you need urgent after-hours care, the Royal Darwin Hospital emergency department can assist with serious dental emergencies. For routine emergencies, call a listed practice to check same-day availability.' },
      { question: 'Do NT dentists accept health fund cards?', answer: 'Most Northern Territory dental practices accept all major health funds and offer on-the-spot HICAPS claiming. Some also accept government dental vouchers and the Child Dental Benefits Schedule. Contact the practice directly to confirm your fund is accepted.' },
    ],
  },
  act: {
    intro: {
      heading: 'Your Guide to Dentists in the ACT',
      paragraphs: [
        'The Australian Capital Territory has a well-developed network of dental practices serving Canberra\'s growing population of over 450,000 residents. From the city centre and Woden to Belconnen, Tuggeranong, and Gungahlin, you\'ll find quality dental care across all major town centres.',
        'Canberra\'s dental practices offer a full range of services including general and preventive dentistry, cosmetic treatments, orthodontics, and emergency care. Many practices cater to public servants and their families with flexible scheduling and health fund acceptance.',
      ],
    },
    belowFold: {
      heading: 'Dental Care Across the ACT',
      paragraphs: [
        'Canberra consistently ranks as one of Australia\'s most liveable cities, and its dental services reflect that standard. Practices across the ACT feature modern equipment, digital imaging, and patient-focused care. The territory\'s compact geography means most residents are within 15 minutes of a quality dental clinic.',
        'The ACT government also supports dental care for eligible concession card holders through public dental services. For private patients, most Canberra practices accept all major health funds with convenient HICAPS claiming. Browse the ACT listings above to find a practice in your town centre.',
      ],
    },
    faqs: [
      { question: 'How do I find a dentist in Canberra?', answer: 'Browse the ACT listings above to find dental practices across Canberra\'s town centres including Civic, Woden, Belconnen, Tuggeranong, and Gungahlin. Each listing includes the full address, phone number, and services offered.' },
      { question: 'Are there weekend dentists in the ACT?', answer: 'Several Canberra dental practices offer Saturday appointments, and some provide limited Sunday or after-hours services for emergencies. Check individual listings or call the practice to confirm weekend availability.' },
      { question: 'What is the average cost of dental treatment in Canberra?', answer: 'Dental costs in Canberra are generally in line with other Australian capital cities. A standard check-up and clean typically ranges from $150 to $350. Many practices offer gap-free preventive treatments for health fund members. Contact practices directly for current fee schedules.' },
      { question: 'Do ACT dentists offer cosmetic dentistry?', answer: 'Yes — many Canberra dental practices offer cosmetic services including teeth whitening, porcelain veneers, dental bonding, and Invisalign clear aligners. Browse the ACT listings above and look for practices that list Cosmetic Dentistry in their services.' },
    ],
  },
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

function htmlShell({ title, metaDescription, bodyClass, content, canonical, noindex }) {
  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(metaDescription)}">${noindex ? '\n  <meta name="robots" content="noindex, nofollow">' : ''}
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

// --- Postcode / Geocoding helpers ---
function loadPostcodeData() {
  const csvPath = path.join(__dirname, 'australian_postcodes.csv');
  if (!fs.existsSync(csvPath)) {
    console.warn('  ⚠ australian_postcodes.csv not found — search data will not be generated');
    return null;
  }
  const raw = fs.readFileSync(csvPath, 'utf-8');
  const lines = raw.split('\n').filter(l => l.trim());
  const header = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  const postcodeIdx = header.indexOf('postcode');
  const localityIdx = header.indexOf('locality');
  const stateIdx = header.indexOf('state');
  const longIdx = header.indexOf('long');
  const latIdx = header.indexOf('lat');

  // postcodeMap: postcode -> { lat, lng, suburb, state } (first occurrence wins)
  const postcodeMap = {};
  // suburbs: array of { suburb, state, postcode, lat, lng } (deduplicated by suburb+state)
  const suburbSet = new Set();
  const suburbs = [];

  for (let i = 1; i < lines.length; i++) {
    // CSV fields are uniformly quoted — split on comma and strip quotes
    const fields = lines[i].split(',').map(f => f.replace(/^"|"$/g, '').trim());
    const pc = fields[postcodeIdx] || '';
    const locality = fields[localityIdx] || '';
    const st = fields[stateIdx] || '';
    const lng = parseFloat(fields[longIdx] || '');
    const lat = parseFloat(fields[latIdx] || '');

    if (!pc || !locality || !st || isNaN(lat) || isNaN(lng)) continue;

    // First occurrence per postcode for the postcode map
    if (!postcodeMap[pc]) {
      postcodeMap[pc] = { lat, lng, suburb: locality, state: st };
    }

    // Deduplicate suburbs by locality+state
    const key = `${locality.toUpperCase()}|${st}`;
    if (!suburbSet.has(key)) {
      suburbSet.add(key);
      suburbs.push({
        suburb: locality.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()),
        state: st,
        postcode: pc,
        lat: Math.round(lat * 10000) / 10000,
        lng: Math.round(lng * 10000) / 10000,
      });
    }
  }

  suburbs.sort((a, b) => a.suburb.localeCompare(b.suburb));
  console.log(`  Loaded ${Object.keys(postcodeMap).length} postcodes, ${suburbs.length} unique suburbs`);
  return { postcodeMap, suburbs };
}

function generateSearchData(postcodeMap) {
  const searchData = [];
  let matched = 0;
  let unmatched = 0;

  for (const state of states) {
    for (const p of practices[state.slug]) {
      // Extract 4-digit postcode from end of address (last 4-digit number)
      const pcMatch = p.address.match(/\b(\d{4})\s*$/);
      const postcode = pcMatch ? pcMatch[1] : null;
      const geo = postcode ? postcodeMap[postcode] : null;

      if (geo) {
        // Check if a screenshot exists for this practice
        const screenshotPath = path.join(__dirname, 'images', 'screenshots', state.slug, `${p.slug}.jpg`);
        const hasScreenshot = fs.existsSync(screenshotPath);

        searchData.push({
          name: p.name,
          slug: p.slug,
          state: state.slug,
          stateAbbr: state.abbr,
          suburb: p.suburb,
          address: p.address,
          phone: p.phone,
          lat: Math.round(geo.lat * 10000) / 10000,
          lng: Math.round(geo.lng * 10000) / 10000,
          featured: p.featured || false,
          services: p.services ? p.services.slice(0, 5) : [],
          img: hasScreenshot ? 1 : 0,
        });
        matched++;
      } else {
        console.warn(`    ⚠ No geocode for: ${p.name} (${p.address})`);
        unmatched++;
      }
    }
  }

  console.log(`  Search data: ${matched} geocoded, ${unmatched} unmatched`);
  return searchData;
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
      <div class="search-wrap">
        <div class="search-bar">
          <i class="fa-solid fa-magnifying-glass search-icon"></i>
          <input type="text" id="search-input" class="search-input"
                 placeholder="Search by suburb or postcode..."
                 autocomplete="off" aria-label="Search by suburb or postcode">
          <ul id="search-autocomplete" class="search-autocomplete" role="listbox"></ul>
        </div>
      </div>
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
  </main>
  <script>
  (function(){
    var input = document.getElementById('search-input');
    var ac = document.getElementById('search-autocomplete');
    var suburbs = null;
    var activeIdx = -1;

    function loadSuburbs(cb) {
      if (suburbs) return cb();
      fetch('/suburbs.json').then(function(r){ return r.json(); }).then(function(data){
        suburbs = data;
        cb();
      });
    }

    function render(matches) {
      if (!matches.length) { ac.classList.remove('open'); ac.innerHTML = ''; activeIdx = -1; return; }
      ac.innerHTML = matches.map(function(m, i){
        return '<li role="option" data-idx="' + i + '">'
          + '<span class="ac-suburb">' + esc(m.suburb) + '</span>'
          + '<span class="ac-meta">' + esc(m.postcode) + ', ' + esc(m.state) + '</span>'
          + '</li>';
      }).join('');
      ac.classList.add('open');
      activeIdx = -1;
    }

    function esc(s) {
      var d = document.createElement('div'); d.textContent = s; return d.innerHTML;
    }

    function navigate(m) {
      window.location.href = '/search/?q=' + encodeURIComponent(m.postcode)
        + '&suburb=' + encodeURIComponent(m.suburb)
        + '&state=' + encodeURIComponent(m.state);
    }

    function setActive(idx) {
      var items = ac.querySelectorAll('li');
      items.forEach(function(li){ li.classList.remove('active'); });
      if (idx >= 0 && idx < items.length) {
        items[idx].classList.add('active');
        items[idx].scrollIntoView({ block: 'nearest' });
      }
      activeIdx = idx;
    }

    input.addEventListener('input', function(){
      var val = this.value.trim().toLowerCase();
      if (val.length < 2) { ac.classList.remove('open'); ac.innerHTML = ''; return; }
      loadSuburbs(function(){
        var isNum = /^\\d+$/.test(val);
        var matches = suburbs.filter(function(s){
          if (isNum) return s.postcode.indexOf(val) === 0;
          return s.suburb.toLowerCase().indexOf(val) === 0;
        }).slice(0, 8);
        render(matches);
      });
    });

    input.addEventListener('keydown', function(e){
      var items = ac.querySelectorAll('li');
      if (!items.length) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(activeIdx + 1, items.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(activeIdx - 1, 0)); }
      else if (e.key === 'Enter' && activeIdx >= 0) {
        e.preventDefault();
        var idx = activeIdx;
        var val = input.value.trim().toLowerCase();
        var isNum = /^\\d+$/.test(val);
        var matches = suburbs.filter(function(s){
          if (isNum) return s.postcode.indexOf(val) === 0;
          return s.suburb.toLowerCase().indexOf(val) === 0;
        }).slice(0, 8);
        if (matches[idx]) navigate(matches[idx]);
      }
    });

    ac.addEventListener('click', function(e){
      var li = e.target.closest('li');
      if (!li) return;
      var val = input.value.trim().toLowerCase();
      var isNum = /^\\d+$/.test(val);
      var matches = suburbs.filter(function(s){
        if (isNum) return s.postcode.indexOf(val) === 0;
        return s.suburb.toLowerCase().indexOf(val) === 0;
      }).slice(0, 8);
      var idx = parseInt(li.getAttribute('data-idx'));
      if (matches[idx]) navigate(matches[idx]);
    });

    document.addEventListener('click', function(e){
      if (!e.target.closest('.search-bar')) { ac.classList.remove('open'); }
    });
  })();
  </script>`;

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
  const statePractices = [...practices[state.slug]].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  const sc = stateContent[state.slug];
  const BATCH = 10;

  const practiceCards = statePractices
    .map((p, idx) => {
      const tags = topServices(p.services)
        .map((s) => `<span class="tag">${escapeHtml(s)}</span>`)
        .join(' ');
      const featuredClass = p.featured ? ' featured' : '';
      const hiddenClass = idx >= BATCH ? ' practice-hidden' : '';
      const featuredBadge = p.featured ? '<span class="featured-badge"><i class="fa-solid fa-star"></i> Featured</span>' : '';
      return `
        <div class="practice-card${featuredClass}${hiddenClass}" data-index="${idx}">
          <a href="/${state.slug}/${p.slug}/" class="practice-card-thumb">
            ${practicePlaceholder(p, state.slug, 'sm')}
          </a>
          <div class="practice-card-body">
            <h2><a href="/${state.slug}/${p.slug}/">${escapeHtml(p.name)}</a>${featuredBadge}</h2>
            <p class="practice-address"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(p.address)}</p>
            <div class="tags">${tags}</div>
          </div>
          <div class="practice-card-action">
            <a href="tel:${p.phone.replace(/[^+\d]/g, '')}" class="btn btn-call"><i class="fa-solid fa-phone"></i>${escapeHtml(p.phone)}</a>
          </div>
        </div>`;
    })
    .join('\n');

  // Above-the-fold content
  const aboveContent = sc ? `
    <section class="state-content-above">
      <h2>${escapeHtml(sc.intro.heading)}</h2>
      ${sc.intro.paragraphs.map((p) => `<p>${p}</p>`).join('\n      ')}
    </section>` : '';

  // See More button (only if more than BATCH practices)
  const seeMoreBtn = statePractices.length > BATCH ? `
    <div class="see-more-wrap">
      <button class="btn btn-see-more" id="see-more-btn">See More Practices <i class="fa-solid fa-chevron-down"></i></button>
      <p class="see-more-count" id="see-more-count">Showing ${BATCH} of ${statePractices.length} practices</p>
    </div>` : '';

  const noScript = statePractices.length > BATCH ? '<noscript><style>.practice-hidden{display:flex!important;}</style></noscript>' : '';

  // Below-the-fold content
  const belowContent = sc ? `
    <section class="state-content-below">
      <h2>${escapeHtml(sc.belowFold.heading)}</h2>
      ${sc.belowFold.paragraphs.map((p) => `<p>${p}</p>`).join('\n      ')}
    </section>` : '';

  // FAQ section
  const faqSection = sc && sc.faqs.length > 0 ? `
    <section class="faq-section">
      <h2>Frequently Asked Questions About Dentists in ${escapeHtml(state.name)}</h2>
      <div class="faq-list">
        ${sc.faqs.map((faq, i) => `
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false" aria-controls="faq-${i}">
            <span>${escapeHtml(faq.question)}</span>
            <i class="fa-solid fa-plus faq-icon"></i>
          </button>
          <div class="faq-answer" id="faq-${i}" role="region">
            <p>${faq.answer}</p>
          </div>
        </div>`).join('\n        ')}
      </div>
    </section>` : '';

  // FAQ structured data
  const faqSchema = sc && sc.faqs.length > 0 ? `
    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: sc.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    })}</script>` : '';

  const content = `
  ${faqSchema}
  <main class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Home</a> &rsaquo; <span>${escapeHtml(state.name)}</span>
    </nav>
    <h1>Dentists in ${escapeHtml(state.name)}</h1>
    <p class="state-intro">Browse ${statePractices.length} dental practices in ${escapeHtml(state.name)}.</p>
    ${aboveContent}
    <div class="practice-list">
      ${practiceCards}
    </div>
    ${noScript}
    ${seeMoreBtn}
    ${belowContent}
    ${faqSection}
    <div class="state-cta">
      <h2>Are you a dental practice in ${escapeHtml(state.name)}?</h2>
      <p>Get your practice listed on GoDental.au and reach patients searching for dentists in ${escapeHtml(state.abbr)}.</p>
      <a href="/submit-listing/" class="btn">Submit Your Practice</a>
    </div>
  </main>
  <script>
  (function(){
    var btn=document.getElementById('see-more-btn');
    if(btn){
      var cards=document.querySelectorAll('.practice-card');
      var countEl=document.getElementById('see-more-count');
      var shown=${Math.min(BATCH, statePractices.length)};
      var total=cards.length;
      btn.addEventListener('click',function(){
        var next=Math.min(shown+${BATCH},total);
        for(var i=shown;i<next;i++){cards[i].classList.remove('practice-hidden');}
        shown=next;
        countEl.textContent='Showing '+shown+' of '+total+' practices';
        if(shown>=total){btn.parentElement.style.display='none';}
      });
    }
    var qs=document.querySelectorAll('.faq-question');
    qs.forEach(function(q){
      q.addEventListener('click',function(){
        var ex=q.getAttribute('aria-expanded')==='true';
        q.setAttribute('aria-expanded',String(!ex));
        q.parentElement.classList.toggle('faq-open');
      });
    });
  })();
  </script>`;

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
          ${practice.featured ? '<div class="detail-featured-badge"><i class="fa-solid fa-star"></i> Featured Practice</div>' : ''}
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

// --- Search results page ---
function buildSearchPage() {
  const content = `
  <main class="container search-page">
    <div class="search-header">
      <h1 id="search-title">Search Results</h1>
      <div class="search-wrap">
        <div class="search-bar">
          <i class="fa-solid fa-magnifying-glass search-icon"></i>
          <input type="text" id="search-input" class="search-input"
                 placeholder="Search by suburb or postcode..."
                 autocomplete="off" aria-label="Search by suburb or postcode">
          <ul id="search-autocomplete" class="search-autocomplete" role="listbox"></ul>
        </div>
      </div>
    </div>
    <p id="search-status" class="search-status"></p>
    <div id="search-results">
      <div class="search-loading">
        <i class="fa-solid fa-spinner"></i>
        <p>Searching nearby practices&hellip;</p>
      </div>
    </div>
  </main>
  <script>
  (function(){
    // --- Autocomplete (same as homepage) ---
    var input = document.getElementById('search-input');
    var ac = document.getElementById('search-autocomplete');
    var suburbsData = null;
    var activeIdx = -1;

    function loadSuburbs(cb) {
      if (suburbsData) return cb();
      fetch('/suburbs.json').then(function(r){ return r.json(); }).then(function(data){
        suburbsData = data; cb();
      });
    }

    function renderAC(matches) {
      if (!matches.length) { ac.classList.remove('open'); ac.innerHTML = ''; activeIdx = -1; return; }
      ac.innerHTML = matches.map(function(m, i){
        return '<li role="option" data-idx="' + i + '">'
          + '<span class="ac-suburb">' + esc(m.suburb) + '</span>'
          + '<span class="ac-meta">' + esc(m.postcode) + ', ' + esc(m.state) + '</span>'
          + '</li>';
      }).join('');
      ac.classList.add('open');
      activeIdx = -1;
    }

    function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

    function goSearch(m) {
      window.location.href = '/search/?q=' + encodeURIComponent(m.postcode)
        + '&suburb=' + encodeURIComponent(m.suburb)
        + '&state=' + encodeURIComponent(m.state);
    }

    function setActive(idx) {
      var items = ac.querySelectorAll('li');
      items.forEach(function(li){ li.classList.remove('active'); });
      if (idx >= 0 && idx < items.length) {
        items[idx].classList.add('active');
        items[idx].scrollIntoView({ block: 'nearest' });
      }
      activeIdx = idx;
    }

    input.addEventListener('input', function(){
      var val = this.value.trim().toLowerCase();
      if (val.length < 2) { ac.classList.remove('open'); ac.innerHTML = ''; return; }
      loadSuburbs(function(){
        var isNum = /^\\d+$/.test(val);
        var matches = suburbsData.filter(function(s){
          if (isNum) return s.postcode.indexOf(val) === 0;
          return s.suburb.toLowerCase().indexOf(val) === 0;
        }).slice(0, 8);
        renderAC(matches);
      });
    });

    input.addEventListener('keydown', function(e){
      var items = ac.querySelectorAll('li');
      if (!items.length) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(activeIdx + 1, items.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(activeIdx - 1, 0)); }
      else if (e.key === 'Enter' && activeIdx >= 0) {
        e.preventDefault();
        var val = input.value.trim().toLowerCase();
        var isNum = /^\\d+$/.test(val);
        var matches = suburbsData.filter(function(s){
          if (isNum) return s.postcode.indexOf(val) === 0;
          return s.suburb.toLowerCase().indexOf(val) === 0;
        }).slice(0, 8);
        if (matches[activeIdx]) goSearch(matches[activeIdx]);
      }
    });

    ac.addEventListener('click', function(e){
      var li = e.target.closest('li');
      if (!li) return;
      var val = input.value.trim().toLowerCase();
      var isNum = /^\\d+$/.test(val);
      var matches = suburbsData.filter(function(s){
        if (isNum) return s.postcode.indexOf(val) === 0;
        return s.suburb.toLowerCase().indexOf(val) === 0;
      }).slice(0, 8);
      var idx = parseInt(li.getAttribute('data-idx'));
      if (matches[idx]) goSearch(matches[idx]);
    });

    document.addEventListener('click', function(e){
      if (!e.target.closest('.search-bar')) ac.classList.remove('open');
    });

    // --- Search logic ---
    function haversine(lat1, lng1, lat2, lng2) {
      var R = 6371;
      var dLat = (lat2 - lat1) * Math.PI / 180;
      var dLng = (lng2 - lng1) * Math.PI / 180;
      var a = Math.sin(dLat/2) * Math.sin(dLat/2)
            + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
            * Math.sin(dLng/2) * Math.sin(dLng/2);
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    var stateColors = {
      vic: ['#134e4a', '#0d9488'], nsw: ['#0e7490', '#06b6d4'], qld: ['#991b1b', '#dc2626'],
      sa: ['#9a3412', '#ea580c'], wa: ['#854d0e', '#ca8a04'], tas: ['#166534', '#16a34a'],
      nt: ['#92400e', '#d97706'], act: ['#115e59', '#14b8a6']
    };

    function renderThumb(p) {
      if (p.img) {
        return '<img src="/images/screenshots/' + esc(p.state) + '/' + esc(p.slug) + '.jpg" alt="' + esc(p.name) + ' website" class="practice-img-sm" loading="lazy">';
      }
      var colors = stateColors[p.state] || stateColors.vic;
      var initial = p.name.charAt(0).toUpperCase();
      return '<div class="practice-placeholder placeholder-sm" style="background: linear-gradient(135deg, ' + colors[0] + ', ' + colors[1] + ');">'
        + '<span class="placeholder-initial">' + initial + '</span>'
        + '<i class="fa-solid fa-tooth placeholder-icon"></i>'
        + '</div>';
    }

    function renderCard(p) {
      var distStr = p.distance < 1 ? '< 1 km' : p.distance.toFixed(1) + ' km';
      var tags = (p.services || []).map(function(s){ return '<span class="tag">' + esc(s) + '</span>'; }).join(' ');
      var featuredBadge = p.featured ? '<span class="featured-badge"><i class="fa-solid fa-star"></i> Featured</span>' : '';
      var featuredClass = p.featured ? ' featured' : '';

      return '<div class="practice-card' + featuredClass + '">'
        + '<a href="/' + esc(p.state) + '/' + esc(p.slug) + '/" class="practice-card-thumb">'
        + renderThumb(p)
        + '</a>'
        + '<div class="practice-card-body">'
        + '<h2><a href="/' + esc(p.state) + '/' + esc(p.slug) + '/">' + esc(p.name) + '</a>' + featuredBadge + '</h2>'
        + '<p class="practice-address"><i class="fa-solid fa-location-dot"></i> ' + esc(p.address) + '</p>'
        + '<div class="tags">' + tags + '</div>'
        + '<span class="distance-badge"><i class="fa-solid fa-location-dot"></i> ' + distStr + '</span>'
        + '</div>'
        + '<div class="practice-card-action">'
        + '<a href="tel:' + p.phone.replace(/[^+\d]/g, '') + '" class="btn btn-call"><i class="fa-solid fa-phone"></i>' + esc(p.phone) + '</a>'
        + '</div>'
        + '</div>';
    }

    var params = new URLSearchParams(window.location.search);
    var q = params.get('q');
    var suburbName = params.get('suburb') || '';
    var stateName = params.get('state') || '';

    if (!q) {
      document.getElementById('search-results').innerHTML =
        '<div class="no-results-msg"><i class="fa-solid fa-magnifying-glass"></i>'
        + '<h2>Search for a suburb or postcode</h2>'
        + '<p>Use the search bar above to find dental practices near you.</p></div>';
      document.getElementById('search-status').textContent = '';
      return;
    }

    // Pre-fill the search input
    input.value = suburbName ? suburbName + ' ' + q : q;

    // Update title
    if (suburbName) {
      document.getElementById('search-title').textContent = 'Dentists near ' + suburbName + ', ' + stateName;
      document.title = 'Dentists near ' + suburbName + ', ' + stateName + ' — GoDental.au';
    }

    // Fetch search data
    Promise.all([
      fetch('/search-data.json').then(function(r){ return r.json(); }),
      fetch('/suburbs.json').then(function(r){ return r.json(); })
    ]).then(function(results) {
      var practices = results[0];
      var suburbs = results[1];
      suburbsData = suburbs; // cache for autocomplete

      // Find the search location coordinates
      var searchLoc = null;
      for (var i = 0; i < suburbs.length; i++) {
        if (suburbs[i].postcode === q) {
          // If suburb name matches too, prefer that one
          if (suburbName && suburbs[i].suburb.toLowerCase() === suburbName.toLowerCase()) {
            searchLoc = suburbs[i];
            break;
          }
          if (!searchLoc) searchLoc = suburbs[i];
        }
      }

      if (!searchLoc) {
        document.getElementById('search-results').innerHTML =
          '<div class="no-results-msg"><i class="fa-solid fa-map-marker-alt"></i>'
          + '<h2>Location not found</h2>'
          + '<p>We couldn\\u2019t find a location for postcode "' + esc(q) + '". Please try another search.</p></div>';
        document.getElementById('search-status').textContent = '';
        return;
      }

      // Calculate distances
      var withDist = practices.map(function(p){
        p.distance = haversine(searchLoc.lat, searchLoc.lng, p.lat, p.lng);
        return p;
      }).sort(function(a, b){ return a.distance - b.distance; });

      // Filter within 25km
      var nearby = withDist.filter(function(p){ return p.distance <= 25; });

      var container = document.getElementById('search-results');
      var status = document.getElementById('search-status');

      if (nearby.length > 0) {
        status.textContent = 'Showing ' + nearby.length + ' practice' + (nearby.length !== 1 ? 's' : '') + ' within 25 km of ' + (suburbName || q);
        container.innerHTML = '<div class="practice-list">'
          + nearby.map(renderCard).join('')
          + '</div>';
      } else {
        // Show nearest 5 as fallback
        var nearest = withDist.slice(0, 5);
        status.textContent = '';
        container.innerHTML =
          '<div class="no-results-msg"><i class="fa-solid fa-map-marker-alt"></i>'
          + '<h2>No practices within 25 km</h2>'
          + '<p>We couldn\\u2019t find any practices within 25 km of ' + esc(suburbName || q) + '. Here are the closest:</p></div>'
          + '<h3 class="nearest-heading">Nearest practices</h3>'
          + '<div class="practice-list">'
          + nearest.map(renderCard).join('')
          + '</div>';
      }
    });
  })();
  </script>`;

  return htmlShell({
    title: 'Search Results — GoDental.au',
    metaDescription: 'Search for dental practices near your suburb or postcode across Australia.',
    bodyClass: 'page-search',
    content,
    noindex: true,
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

  // 5. Search data + search page
  const postcodeData = loadPostcodeData();
  let searchPageCount = 0;
  if (postcodeData) {
    const searchData = generateSearchData(postcodeData.postcodeMap);
    fs.writeFileSync(path.join(outDir, 'search-data.json'), JSON.stringify(searchData));
    console.log(`  search-data.json (${searchData.length} practices)`);

    fs.writeFileSync(path.join(outDir, 'suburbs.json'), JSON.stringify(postcodeData.suburbs));
    console.log(`  suburbs.json (${postcodeData.suburbs.length} suburbs)`);

    const searchDir = path.join(outDir, 'search');
    ensureDir(searchDir);
    fs.writeFileSync(path.join(searchDir, 'index.html'), buildSearchPage());
    console.log('  search/index.html');
    searchPageCount = 1;
  }

  // 6. Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /search/
Disallow: /search-data.json
Disallow: /suburbs.json

Sitemap: https://godental.au/sitemap.xml
`;
  fs.writeFileSync(path.join(outDir, 'robots.txt'), robotsTxt);
  console.log('  robots.txt');

  const total = 1 + states.length + practiceCount + 2 + searchPageCount;
  console.log(`\nDone! Built 1 homepage + ${states.length} state pages + ${practiceCount} practice pages + 2 extra pages + ${searchPageCount} search page = ${total} pages total.`);
}

build();
