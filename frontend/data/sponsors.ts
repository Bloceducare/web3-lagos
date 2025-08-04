interface Sponsor {
  name: string;
  logo: string;
  speaker: {
    name: string;
    title: string;
    headshot: string;
  };
}

const getGoogleDriveImageUrl = (fileId: string) => {
  return `https://lh3.googleusercontent.com/d/${fileId}`;
};

export const sponsors: Sponsor[] = [
  {
    name: 'Hyperbridge',
    logo: getGoogleDriveImageUrl('1XqCa0-yzKy7Ll4e5zMcTeP88rWRPbo-V'),
    speaker: {
      name: 'Seun Lanlege',
      title: 'Co-founder',
      headshot: getGoogleDriveImageUrl('1HkDq0rJ5DaqSqBEjEQ-vigrVT6i5TEXM')
    }
  },
  {
    name: 'Qubic',
    logo: "/qubic_logo.png",
    speaker: {
      name: 'Israel',
      title: 'Community Leader (Nigeria)',
      headshot: getGoogleDriveImageUrl('14rA6UTZCE6N9zV-SlXKEI_5MYUpOaZXt')
    }
  },
  {
    name: 'WAGA PROTOCOL',
    logo: 'https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafkreigqbyeqnmjqznbikaj7q2mipyijlslb57fgdw7nhloq3xinvhvcca',
    speaker: {
      name: 'Ginger-eke Daniel',
      title: 'Director WAGA Coffee Nigeria, Smart contract Dev. ZK Developer.',
      headshot: 'https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafkreiarjl2zbw6bhxapppdibvbclzd4qzamergb6gsmxxcaxgv2sf7fty'
    }
  },
  {
    name: 'Arbitrum',
    logo: "/arbitrum_logo.svg",
    speaker: {
      name: 'Samuel',
      title: 'Community Admin at The Arbitrum Foundation',
      headshot: getGoogleDriveImageUrl('12qN9pg9ZH4C03B0FoveNQu5153ssd28q')
    }
  }
];
