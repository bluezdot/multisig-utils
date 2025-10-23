import type { ApiPromise } from '@polkadot/api';
import type { GenericExtrinsic } from '@polkadot/types';
import { AnyTuple } from '@polkadot/types/types';
import { blake2AsHex } from '@polkadot/util-crypto';

const MULTISIG_EXTRINSIC_CALL_INDEX = 3;
const WRAP_EXTRINSIC_CALL_INDEX = 2;
const DEFAULT_BLOCK_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000';

function nonNullable<T>(val: T | null | undefined): val is T {
  return val !== null && val !== undefined;
}

function nullable<T>(val: T | null | undefined): val is null | undefined {
  return val === null || val === undefined;
}

function validateCallData(callData: string, callHash: string): boolean {
  const hash = blake2AsHex(callData);
  return hash === callHash;
}

function findInnerExtrinsicCall(extrinsic: GenericExtrinsic<AnyTuple>) {
   const findAsMulti = (method: any): any => {
    if (!method) return null;

    if (method.toHuman().method === 'asMulti' && method.toHuman().section === 'multisig') {
      return method.args[MULTISIG_EXTRINSIC_CALL_INDEX];
    }

    if (method.toHuman().method === 'batchAll') {
      for (const arg of method.args[0]) {
        const result = findAsMulti(arg);
        if (nonNullable(result)) {
          return result;
        }
      }
    }

    if (method.args) {
      return findAsMulti(method.args[WRAP_EXTRINSIC_CALL_INDEX]);
    }

    return null;
  };

  return findAsMulti(extrinsic.method);
}

export interface GetCallDataParams {
  api: ApiPromise;
  callHash: string;
  blockHeight: number;
  extrinsicIndex: number;
}

export async function getCallData({api, callHash, blockHeight, extrinsicIndex }: GetCallDataParams) {
  try {
    const blockHash = await api.rpc.chain.getBlockHash(blockHeight);
    if (blockHash.toHex() === DEFAULT_BLOCK_HASH) {
      return null;
    }

    const { block } = await api.rpc.chain.getBlock(blockHash);
    const extrinsic = block.extrinsics[extrinsicIndex];

    if (nullable(extrinsic)) {
      return null;
    }

    const innerCall = findInnerExtrinsicCall(extrinsic);

    if (nullable(innerCall)) {
      return null;
    }

    const callData = innerCall?.toHex();

    if (!callData || !validateCallData(callData, callHash)) {
      return null;
    }

    console.log('callData:', callData);

    return callData;
  } catch (e) {
    console.warn('Error getCallData()', e);
    return null;
  }
}