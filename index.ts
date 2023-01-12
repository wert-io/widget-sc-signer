import { eddsa as EdDSA } from 'elliptic';

interface sc_options {
  address: string,
  commodity: string,
  network?: string,
  commodity_amount: number,
  sc_address: string,
  sc_input_data: string,
}
interface signed_sc_options extends sc_options {
  signature: string,
}

const scRequiredKeys = [
  'address',
  'commodity',
  'commodity_amount',
  'sc_address',
  'sc_input_data',
];

const ellipticEdDSA = new EdDSA('ed25519');

const trimHexPrefix = (str: string): string => {
  if (!str) return str;

  if (str.substring(0, 2) === '0x') {
    return str.substring(2);
  }

  return str;
};

const signSmartContractData = (options: sc_options, privateKey: string): signed_sc_options => {
  const allKeysProvided = scRequiredKeys.every(key => key in (options as sc_options));

  if (!allKeysProvided) throw Error(`All of following keys in options (as first argument) are required for signing: ${scRequiredKeys.map(key => `"${key}"`).join(', ')}`);
  if (!privateKey) throw Error(`Private key (as second argument) is required for signing`);

  const ellipticKey = ellipticEdDSA.keyFromSecret(trimHexPrefix(privateKey));
  const dataString = Object.keys(options as sc_options)
    .sort()
    .map(key => {
      let value = String((options as sc_options)[key as keyof sc_options]);

      if (key === 'commodity_amount') {
        value = String(parseFloat(value));
      }

      return `${key}:${value}`
    })
    .join('\n');
  const hash = Buffer.from(dataString, 'utf8').toString('hex');
  const signature = ellipticKey.sign(hash).toHex();

  return {
    ...options,
    signature,
  };
};
const scKeysList = [
  ...scRequiredKeys,
  'network',
  'signature',
];

export = { signSmartContractData, scKeysList };
