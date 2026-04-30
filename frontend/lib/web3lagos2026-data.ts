export const SITE = {
  name: 'Web3Lagos Conference',
  edition: '5.0',
  tagline: "One of Africa's Most Impactful Web3 Conferences",
  date: 'August 27 – 29, 2026',
  dateShort: 'Aug 27–29, 2026',
  venue: 'TBA — Lagos, Nigeria',
  format: 'Hybrid (Physical + Virtual)',
  email: 'event@web3bridge.com',
  twitter: 'https://x.com/Web3LagosCon',
  youtube: 'https://www.youtube.com/@web3bridge',
  livestream: '/live',
  sponsorDeck: 'https://drive.google.com/file/d/1z7qMHbH0HQ8pkiI77XFDNDpIQikCH0ig/view',
  highlight2025: 'https://www.youtube.com/playlist?list=PL3zxEUgm0RBMG-WngNa_5CYxku8ypJLP0',
}

export const STATS = [
  { num: '800+',  label: 'Expected Attendees' },
  { num: '50+',   label: 'Expert Speakers' },
  { num: '3',     label: 'Days of Content' },
  { num: '10+',   label: 'Tracks & Workshops' },
]

export const PILLARS = [
  {
    num: '01',
    title: 'Learn & Grow',
    desc: 'Workshops, expert talks and hackathons built for every level — from first-timers to seasoned blockchain engineers.',
  },
  {
    num: '02',
    title: 'Connect & Network',
    desc: 'Meet founders, investors, developers and enthusiasts from across Nigeria, Africa and the global Web3 community.',
  },
  {
    num: '03',
    title: 'Build & Ship',
    desc: 'Career fairs, project showcases and funding opportunities for builders ready to go from idea to launch.',
  },
]

export const TAGS = [
  { label: 'Blockchain', color: 'blue' },
  { label: 'DeFi',       color: 'teal' },
  { label: 'Ethereum',   color: 'orange' },
  { label: 'Security',   color: 'blue' },
  { label: 'Community',  color: 'teal' },
  { label: 'Education',  color: 'orange' },
]

export const EDITIONS = [
  {
    version: 'W3LC 4.0',
    year: '2025',
    title: 'Web3Lagos 2025 Highlights',
    desc: 'Watch the full playlist from this year\'s edition',
    link: '/archive/w3lc-4',
    latest: true,
  },
  {
    version: 'W3LC 3.0',
    year: '2024',
    title: 'Scaling Web3 Across Africa',
    desc: '',
    link: '/archive?year=2024',
    latest: false,
  },
  {
    version: 'W3LC 2.0',
    year: '2023',
    title: 'DeFi, NFTs & the New Economy',
    desc: '',
    link: '/archive?year=2023',
    latest: false,
  },
  {
    version: 'W3LC 1.0',
    year: '2022',
    title: 'Building the Foundations',
    desc: '',
    link: '/archive?year=2022',
    latest: false,
  },
]

export const TRACKS = [
  { value: 'defi',      label: 'DeFi & Protocols' },
  { value: 'dev',       label: 'Developer Tools & Smart Contracts' },
  { value: 'nft',       label: 'NFTs, RWAs & Digital Assets' },
  { value: 'edu',       label: 'Web3 Education & Onboarding' },
  { value: 'vc',        label: 'Funding, VCs & Startups' },
  { value: 'community', label: 'Community & Ecosystem Building' },
]

export const SCHEDULE = [
  {
    day: 'Day 01',
    date: 'Thursday, Aug 27',
    sessions: [
      { time: '09:00', title: 'Registration & Welcome',                    type: 'logistics' },
      { time: '10:00', title: 'Opening Keynote — Web3 in Africa: The Next Frontier', speaker: 'Ayodeji Awosika', type: 'keynote' },
      { time: '11:00', title: 'Panel: DeFi Adoption Across African Markets',type: 'panel'    },
      { time: '12:00', title: 'Workshop: Intro to Blockchain & Ethereum',   type: 'workshop' },
      { time: '13:00', title: 'Lunch & Networking',                         type: 'break'    },
      { time: '14:30', title: 'Talk: Smart Contracts for Real-World Use Cases', type: 'talk' },
      { time: '15:30', title: 'Panel: NFTs, RWAs & Digital Ownership in Africa', type: 'panel' },
      { time: '17:00', title: 'Career Fair & Project Showcase',             type: 'networking' },
    ],
  },
  {
    day: 'Day 02',
    date: 'Friday, Aug 28',
    sessions: [
      { time: '09:30', title: 'Morning Keynote — Funding & Building in Web3', type: 'keynote' },
      { time: '10:30', title: 'Workshop: Solidity Deep Dive',                 type: 'workshop' },
      { time: '11:30', title: 'Talk: Web3 Security — Protecting Your Protocol', type: 'talk'  },
      { time: '12:30', title: 'Panel: Women in Web3 — Breaking Barriers',     type: 'panel'   },
      { time: '13:30', title: 'Lunch & Networking',                           type: 'break'   },
      { time: '14:30', title: 'Hackathon Kickoff — 24-Hour Build Begins',     type: 'keynote' },
      { time: '17:00', title: 'Community Side Events & Meetups',              type: 'networking' },
    ],
  },
  {
    day: 'Day 03',
    date: 'Saturday, Aug 29',
    sessions: [
      { time: '10:00', title: 'Hackathon Presentations & Judging',  type: 'keynote'    },
      { time: '12:00', title: 'Keynote: Education as the Foundation of Blockchain', type: 'keynote' },
      { time: '13:00', title: 'Lunch & Award Ceremony',             type: 'break'      },
      { time: '14:30', title: 'Panel: The Future of Web3 in Africa', type: 'panel'     },
      { time: '15:30', title: 'Talk: Onboarding the Next Million Web3 Users', type: 'talk' },
      { time: '16:30', title: 'Closing Ceremony & Announcements',   type: 'keynote'    },
      { time: '17:30', title: 'Closing Networking & Celebration',   type: 'networking' },
    ],
  },
]

export const PAST_SPONSORS = [
  'Arbitrum','Polkadot','Lisk','EF ESP','Hyperbridge','Qubic','Waga Protocol',
  'ENS DAO','Kweku Tech','For the Love of DeFi','Blockchain Club Unilag',
  'Web3Unilag','EthJos','BlockchainUNN','Web3 Afrika','Hyver Organization',
  'MEDICSINWEB3DAO','Anambra Techies','Women in DeFi','Onchain Global',
  'WEB3LADIES','Guild Academy','FiTech Community','Adom Labs','ETHAfrique',
  'Africa Blockchain Community','NextBridge Africa','Web3Nigeria',
  'Arbitrum Africa','Umi Africa','Blockchain UNIBEN','LearnWay',
  'CoinGabbar Community','Teen Girls In Blockchain','Men In DeFi',
  'Bonadocs','Blockchain Club LASU','Blockchain Lautech','BlockchainESUT','Thrilld',
]
