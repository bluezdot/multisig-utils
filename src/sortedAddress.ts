import {sortAddresses} from "@polkadot/util-crypto";

// From Polkadot sdk
function sortSignatories(signatories: string[]) {
    return sortAddresses(signatories, 0);
}

// From Nova Wallet, seem like not correct
function sortSignatories2(signatories: string[]) {
    return signatories.sort((a, b) => a.localeCompare(b));
}

const list = ["1P8B9aHLLUcPrgVo1EfmvJ2yNm9Uac9RkSiNQyVxVp6yons", "1BzDB5n2rfSJwvuCW9deKY9XnUyys8Gy44SoX8tRNDCFBhx", "16QBEoG2jAVJEyepEyerw1sJzVqctCQc3JaqFnMD1LyYcMY7"]

console.log(sortSignatories(list));
console.log(sortSignatories2(list));