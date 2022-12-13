import { read } from 'xlsx';

onmessage = function (event) {
	try {
		const data = event.data;
		/*
      {
          file: ArrayBuffer of Excel File
      }
    */
		const workbook = read(data.file);
		postMessage({ status: 'success', fileData: JSON.stringify(workbook) });
	} catch (err) {
		postMessage({ status: 'error', error: err.message });
	}
};
