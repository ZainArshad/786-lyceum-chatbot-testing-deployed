/* eslint-disable no-undef */
import { processYieldResults } from '../../../lib/helpers/yield/post-processing';

onmessage = async function (e) {
	try {
		const data = e.data;
		const { param, uid } = data;
		const results = await processYieldResults(param);
		postMessage({ status: 'success', results, uid });
	} catch (_error) {
		postMessage({ status: 'error', error: _error.message, uid });
	}
};
