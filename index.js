"use strict";
const elliptic_1 = require("elliptic");
const scRequiredKeys = [
    'address',
    'commodity',
    'commodity_amount',
    'pk_id',
    'sc_address',
    'sc_id',
    'sc_input_data',
];
const ellipticEdDSA = new elliptic_1.eddsa('ed25519');
const trimHexPrefix = (str) => {
    if (!str)
        return str;
    if (str.substr(0, 2) === '0x') {
        return str.substr(2);
    }
    return str;
};
const signSmartContractData = (options, privateKey) => {
    const allKeysProvided = scRequiredKeys.every(key => key in options);
    if (!allKeysProvided)
        throw Error(`All of following keys in options (as first argument) are required for signing: ${scRequiredKeys.map(key => `"${key}"`).join(', ')}`);
    if (!privateKey)
        throw Error(`Private key (as second argument) is required for signing`);
    const ellipticKey = ellipticEdDSA.keyFromSecret(trimHexPrefix(privateKey));
    const dataString = Object.keys(options)
        .sort()
        .map(key => {
        const value = String(options[key]);
        return `${key}:${value}`;
    })
        .join('\n');
    const hash = Buffer.from(dataString, 'utf8').toString('hex');
    const signature = ellipticKey.sign(hash).toHex();
    return Object.assign(Object.assign({}, options), { signature });
};
module.exports = { signSmartContractData };
