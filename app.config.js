import 'dotenv/config';

export default {
  extra: {
    pngmeSdkToken: process.env.PNGME_SDK_TOKEN,
  },
  android: {
    "package": "com.pngme.sample"
  }
};