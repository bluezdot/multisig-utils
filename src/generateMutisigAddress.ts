import {createKeyMulti, encodeAddress} from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';

const threshold = 2;
const addresses = [
    '14b1kB7CrqzRUeMsKc26FJ73f8FCpxAX6sNieu9gfYSfJuoL',
    '1ZX2XntfLEHrBPy73DpfQp9rG7pbLyvrFjEpi7mNKQgyga5',
    '1nUC7afqmo7zwRFWxDjrUQu9skk6fk99pafb4SiyGSRc8z3'
];

const SS58Prefix = 0;

function main () {
    const multiAddress = createKeyMulti(addresses, threshold);
    const ss58Address = encodeAddress(multiAddress, SS58Prefix);
    console.log(`Multisig Address Polkadot: ${ss58Address}`);
    process.exit();
}

main();