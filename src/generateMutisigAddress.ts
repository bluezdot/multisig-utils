import {createKeyMulti, encodeAddress} from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';

const threshold = 2;
const addresses = [
    '1ZX2XntfLEHrBPy73DpfQp9rG7pbLyvrFjEpi7mNKQgyga5',
    '1nUC7afqmo7zwRFWxDjrUQu9skk6fk99pafb4SiyGSRc8z3',
    '14b1kB7CrqzRUeMsKc26FJ73f8FCpxAX6sNieu9gfYSfJuoL'
];

const SS58Prefix = 0;
const generateMutisigAddress = 0;

function main () {
    const multiAddress = createKeyMulti(addresses, threshold);
    console.log('Public key:', u8aToHex(multiAddress));

    const ss58Address = encodeAddress(multiAddress, SS58Prefix);
    console.log(`Multisig Address Polkadot: ${ss58Address}`);
    process.exit();
}

main();

//0x038e1075b9aac7089919985a7bdabca77799ef260190473a3c39b81f91273171
//0x038e1075b9aac7089919985a7bdabca77799ef260190473a3c39b81f91273171