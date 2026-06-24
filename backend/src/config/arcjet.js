import arcjet, { shield, detectBot, tokenBucket } from '@arcjet/node';

export const aj = arcjet({
  key: process.env.ARCJET_KEY,

  rules: [
    shield({
      mode: 'LIVE',
    }),

    detectBot({
      mode: 'LIVE',
      allow: ['CATEGORY:SEARCH_ENGINE'],
    }),
    tokenBucket({
      mode: 'LIVE',
      refillRate: 1,
      interval: '1m',
      capacity: 3,
    }),
  ],
});
