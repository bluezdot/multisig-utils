import {ApiPromise, WsProvider} from "@polkadot/api";

async function decodeCallData(calldata: string) {
    // 1. Initialize the API
    const wsProvider = new WsProvider('wss://paseo.rpc.amforc.com'); // Use a suitable RPC endpoint
    const api = await ApiPromise.create({ provider: wsProvider });

    try {
        // 2. Decode the calldata
        // The 'Call' type uses the runtime metadata to interpret the SCALE-encoded data.
        const decodedCall = api.createType('Call', calldata);

        // 3. Output the decoded information
        console.log(`\n--- Decoded Call ---`);
        console.log(decodedCall.toHuman());
        console.log(decodedCall.toPrimitive());
        console.log(decodedCall.toJSON());
        console.log(`Pallet: ${decodedCall.section}`);
        console.log(`Method: ${decodedCall.method}`);
        console.log(`Call Index: ${decodedCall.callIndex}`);

        // Get human-readable arguments
        const humanArgs = decodedCall.args.toString();
        console.log(`Arguments:`, humanArgs);

        console.log(`\n--- Full Decoded Structure (JSON) ---`);
        console.log(decodedCall.toJSON());

    } catch (error) {
        console.error('Error decoding call data:', error);
        console.log('Ensure the call data is correct and the connected node uses the correct runtime metadata.');
    } finally {
        // 4. Disconnect
        await api.disconnect();
    }
}

decodeCallData('0x050300eeda467ecbfcbd3b2e4fc62adac29c1b954ac120606f9bee443066f86a70e1540700aea68f02').catch(console.error);