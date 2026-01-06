import {isHex, isU8a, u8aToU8a} from "@polkadot/util";
import {HexString} from "@polkadot/util/types";
import {Prefix} from "@polkadot/util-crypto/types";
import {decodeAddress, encodeAddress} from "@polkadot/util-crypto";

export const encodePolkadotAddress = (key: HexString | Uint8Array | string, ss58Format: Prefix = 42): string => {
    // decode it, this means we can re-encode an address
    const u8a = decodePolkadotAddress(key);

    return encodeAddress(u8a, ss58Format);
}

export const decodePolkadotAddress = (encoded?: string | Uint8Array | null, ignoreChecksum?: boolean, ss58Format: Prefix = -1): Uint8Array => {
    if (!encoded) {
        throw new Error('Invalid empty address passed');
    }

    if (isU8a(encoded) || isHex(encoded)) {
        return u8aToU8a(encoded);
    }

    return decodeAddress(encoded, ignoreChecksum, ss58Format);
}