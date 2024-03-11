import "dotenv/config";
export default ({ config }: any) => ({
  ...config,
  extra: {
    apiBaseUrl: process.env.API_BASE_URL,
    marvelPublicKey: process.env.MARVEL_PUBLIC_KEY,
    marvelPrivateKey: process.env.MARVEL_PRIVATE_KEY,
    apiMarvelBaseUrl: process.env.API_MARVEL_BASE_URL,
    hashMd5ToMarvel: process.env.HASH_MD5_TO_MARVEL,
    tsMarvel: process.env.TS_MARVEL,
    eas: {
      projectId: process.env.PROJECT_ID,
    },
  },
});
