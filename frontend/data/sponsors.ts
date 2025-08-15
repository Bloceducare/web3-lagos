interface Sponsor {
  name: string;
  logo: string;
  link?: string;
  speaker: {
    name: string;
    title: string;
    headshot: string;
  };
}

const getGoogleDriveImageUrl = (fileId: string) =>
  `https://lh3.googleusercontent.com/d/${fileId}`;

export const sponsors: Sponsor[] = [
  {
    name: 'Hyperbridge',
    logo: getGoogleDriveImageUrl('1XqCa0-yzKy7Ll4e5zMcTeP88rWRPbo-V'),
    link: 'https://hyperbridge.network', 
    speaker: {
      name: 'Seun Lanlege',
      title: 'Co-founder',
      headshot: getGoogleDriveImageUrl('1HkDq0rJ5DaqSqBEjEQ-vigrVT6i5TEXM'),
    },
  },
  {
    name: 'Qubic',
    logo: '/qubic_logo.png',
    link: 'https://qubic.org', 
    speaker: {
      name: 'Israel',
      title: 'Community Leader (Nigeria)',
      headshot: getGoogleDriveImageUrl('14rA6UTZCE6N9zV-SlXKEI_5MYUpOaZXt'),
    },
  },
  {
    name: 'WAGA PROTOCOL',
    logo:
      'https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafkreigqbyeqnmjqznbikaj7q2mipyijlslb57fgdw7nhloq3xinvhvcca',
    link: 'https://protocol.wagatoken.io', 
    speaker: {
      name: 'Ginger-eke Daniel',
      title: 'Director WAGA Coffee Nigeria, Smart contract Dev. ZK Developer.',
      headshot:
        'https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafkreiarjl2zbw6bhxapppdibvbclzd4qzamergb6gsmxxcaxgv2sf7fty',
    },
  },
  {
    name: 'Arbitrum',
    logo: '/arbitrum_logo.svg',
    link: 'https://arbitrum.io', 
    speaker: {
      name: 'Samuel',
      title: 'Community Admin at The Arbitrum Foundation',
      headshot: getGoogleDriveImageUrl('12qN9pg9ZH4C03B0FoveNQu5153ssd28q'),
    },
  },
  {
    name: 'Lisk',
    logo:
      'https://res.cloudinary.com/dvuwy2tny/image/upload/v1755253557/Sponsors/lisk-wordmark-b_cekvv7.svg',
    link: 'https://lisk.com',
    speaker: {
      name: 'Chidubem Emelumadu',
      title: 'Ecosystem Lead (Africa)',
      headshot: getGoogleDriveImageUrl('1B9x4HvknwP-WsQxzx3mc51QlLjFp_Pay'),
    },
  },
  {
    name: 'Polkadot',
    logo:
      'https://res.cloudinary.com/dvuwy2tny/image/upload/v1755271331/Sponsors/Polkadot_Logo_Pink-Black_jepgdo.svg',
    link: 'https://polkadot.network',
    speaker: {
      name: 'Bekka',
      title: 'Lead DevRel, Polkadot Africa',
      headshot: 'https://imgur.com/9kw5LAv',
    },
  },
  {
    name: 'EF ESP',
    logo:
      'https://res.cloudinary.com/dvuwy2tny/image/upload/v1755253808/Sponsors/EF_ESP_Logo_kch3fn.png',
    link: 'https://ethereum.org',
    speaker: {
      name: '',
      title: '',
      headshot: '',
    },
  },
  {
    name: 'ENS DAO',
    logo:
      'https://res.cloudinary.com/dvuwy2tny/image/upload/v1755253809/Sponsors/ENS_DAO_Logo_wmnhbs.png',
    link: 'https://ens.domains',
    speaker: {
      name: '',
      title: '',
      headshot: '',
    },
  },
];
