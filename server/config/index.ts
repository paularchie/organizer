import prod from './prod';
import keysProd from './keys.prod';
import dev from './dev';
import keysDev from './keys.dev';

let keys, config;

if (process.env.NODE_ENV === 'production') {
  config = prod;
  keys = keysProd;
} else {
  config = dev;
  keys = keysDev;
}

export { keys, config };
