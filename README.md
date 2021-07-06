# WertWidget Smart Contract Sign Helper

## Installation

```
npm i @wert-io/widget-sc-signer
```

or

```
yarn add @wert-io/widget-sc-signer
```

## Usage

```javascript
const { signSmartContractData } = require('@wert-io/widget-sc-signer');
```

or

```javascript
import { signSmartContractData } from '@wert-io/widget-sc-signer';
```

```javascript
const signedData = signSmartContractData(options, privateKey);
```

Function **signSmartContractData** returns given options object with addition of "**signature**" property. You can pass result directly to [WertWidget initializer](https://www.npmjs.com/package/@wert-io/widget-initializer):

```javascript
const wertWidget = new WertWidget({
    ...signedData,
    ...otherWidgetOptions,
});
```

### Options
| Property | Required | Type | Description |
| :--- | :---: | :---: | --- |
| **address** | required | *String* | User’s address that will act as a fallback address if a smart contract can't be executed. In case of fallback we will transfer commodity_amount to this address |
| **commodity** | required | *String* | For now it's **ETH** or **XTZ** |
| **commodity_amount** | required | *Number* | An amount of commodity necessary for executing the given smart contract |
| **pk_id** | required | *String* | ID of the public key that matches your private key |
| **sc_address** | required | *String* | The address of the smart contract |
| **sc_id** | required | *String* | **uuid4.hex** generated on your side |
| **sc_input_data** | required | *String* | Data that will be used for smart contract execution, in the hex format |
### Private key

Was given to you during your registration in Wert system as a partner. If you don't have one, [contact us](https://wert.io/for-partners).