import http from 'k6/http';
import { group } from 'k6';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { SharedArray } from 'k6/data';
import encoding from 'k6/encoding';
const username = 'dbo-order-srv';
const password = 'dbo-order-srv-passwd';


export const options = {
    // vus: 1,
    // duration: '2s',
    stages: [{ duration: '1s', target: 10, },
    { duration: '2s', target: 10, },
    { duration: '3s', target: 10, },
    { duration: '1s', target: 10, },
    { duration: '1s', target: 10, },
    { duration: '1s', target: 10, },
    { duration: '1s', target: 10, }],

};
const csvData = new SharedArray('another data name', function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('./data.csv'), { header: true }).data;
});
// console.log(csvData.length);

export default async function () {
    const credentials = `${username}:${password}`;
    const encodedCredentials = encoding.b64encode(credentials);
    for (let i = 0; i < csvData.length; i++) {

        const urlcreateRetryProcessForUpload = `https://moonlay-api.dbo.dev/order-srv/delivery-orders/upload-delivery-orders/retry/${csvData[i].request_id}`
        // console.log(urlDoById);

        group('Create Retry Process for Do Upload', function () {
            const createRetryProcessForUpload = http.request('GET', urlcreateRetryProcessForUpload, '', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${encodedCredentials}`,
                },
            })
            console.log('Create Retry Process for Do Upload', createRetryProcessForUpload)
        });
    }

}