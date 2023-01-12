interface sc_options {
    address: string;
    commodity: string;
    network?: string;
    commodity_amount: number;
    sc_address: string;
    sc_input_data: string;
}
interface signed_sc_options extends sc_options {
    signature: string;
}
declare const _default: {
    signSmartContractData: (options: sc_options, privateKey: string) => signed_sc_options;
    scKeysList: string[];
};
export = _default;
