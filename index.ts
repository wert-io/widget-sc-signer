import { eddsa as EdDSA } from 'elliptic';

interface sc_options {
  address: string,
  commodity: string,
  commodity_amount: number,
  pk_id: string,
  sc_address: string,
  sc_id: string,
  sc_input_data: string,
}
interface signed_sc_options extends sc_options {
  signature: string,
}

const scRequiredKeys = [
  'address',
  'commodity',
  'commodity_amount',
  'pk_id',
  'sc_address',
  'sc_id',
  'sc_input_data',
];

const ellipticEdDSA = new EdDSA('ed25519');

const trimHexPrefix = (str: string): string => {
  if (!str) return str;

  if (str.substr(0, 2) === '0x') {
    return str.substr(2);
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
      const value = String((options as sc_options)[key as keyof sc_options]);

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

export = { signSmartContractData };
