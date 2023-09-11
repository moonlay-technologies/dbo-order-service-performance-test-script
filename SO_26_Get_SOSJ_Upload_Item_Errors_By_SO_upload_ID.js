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

export default async function () {
    const credentials = `${username}:${password}`;
    const encodedCredentials = encoding.b64encode(credentials);
    const urlgetSosjUploadItemErrorsBySosjUploadHistoryId = `https://moonlay-api.dbo.dev/order-srv/sosj/upload-histories/items/${csvData[i].upload_history_id_sosj}`
    // console.log(urlDoById);

    group('Get Sosj Upload Item Errors By Sosj Upload History Id', function () {
        const getSosjUploadItemErrorsBySosjUploadHistoryId = http.request('GET', urlgetSosjUploadItemErrorsBySosjUploadHistoryId, "", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`,
            },
        })
        console.log('Get Sosj Upload Item Errors By Sosj History Upload Id', getSosjUploadItemErrorsBySosjUploadHistoryId)
    });
}