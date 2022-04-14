const { signSmartContractData } = require('../index.js');

const signedData = signSmartContractData({
  commodity: 'BTC',
  commodity_amount: 1,
  address: 'BTC_ADDRESS',
  pk_id: 'key_1',
  sc_address: 'SC_ADDRESS',
  sc_id: 'SC_ID',
  sc_input_data: 'SC_INPUT_DATA',
}, 'd;ajsd;avb;jeerairereuvrnnvacdv');

const foolishlySignedData = signSmartContractData({
  commodity: 'BTC',
  commodity_amount: '1.0',
  address: 'BTC_ADDRESS',
  pk_id: 'key_1',
  sc_address: 'SC_ADDRESS',
  sc_id: 'SC_ID',
  sc_input_data: 'SC_INPUT_DATA',
}, 'd;ajsd;avb;jeerairereuvrnnvacdv');

console.log(
  '\nsigned data:', signedData,
  '\nfoolproofed:', signedData.signature === foolishlySignedData.signature,
);
