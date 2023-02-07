"use strict";
const elliptic_1 = require("elliptic");
const scKeys = [
    'address',
    'commodity',
    'commodity_amount',
    'network',
    'sc_address',
    'sc_input_data',
];
const optionalScKeys = [
    'network',
];
const ellipticEdDSA = new elliptic_1.eddsa('ed25519');
const trimHexPrefix = (str) => {
    if (!str)
        return str;
    if (str.substring(0, 2) === '0x') {
        return str.substring(2);
    }
    return str;
};
const signSmartContractData = (options, privateKey) => {
    const requiredScKeys = scKeys.filter(key => !optionalScKeys.find(optionalKey => key === optionalKey));
    const requiredKeysProvided = requiredScKeys.every(key => key in options);
    if (!requiredKeysProvided)
        throw Error(`All of following keys in options (as first argument) are required for signing: ${requiredScKeys.map(key => `"${key}"`).join(', ')}`);
    if (!privateKey)
        throw Error(`Private key (as second argument) is required for signing`);
    const ellipticKey = ellipticEdDSA.keyFromSecret(trimHexPrefix(privateKey));
    const dataString = scKeys
        .map(key => {
        let value = String(options[key]);
        if (key === 'commodity_amount') {
            value = String(parseFloat(value));
        }
        return `${key}:${value}`;
    })
        .join('\n');
    const hash = Buffer.from(dataString, 'utf8').toString('hex');
    const signature = ellipticKey.sign(hash).toHex();
    return Object.assign(Object.assign({}, options), { signature });
};
const scKeysList = [
    ...scKeys,
    'signature',
];
module.exports = { signSmartContractData, scKeysList };
