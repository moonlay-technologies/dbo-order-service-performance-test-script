import http from 'k6/http';
import { group } from 'k6';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { SharedArray } from 'k6/data';
import encoding from 'k6/encoding';

const username = 'dbo-order-srv';
const password = 'dbo-order-srv-passwd';

import { group } from 'k6';



export const options = {
    // vus: 1,
    // duration: '2s',
    stages: [{ duration: '1s', target: 110, },
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

    

    group('Update So Detail By So Id', function () {
        const credentials = `${username}:${password}`;
        const encodedCredentials = encoding.b64encode(credentials);
        const data = {
            "order_status_id": 10,
            "reason": "Tidak Ada Stok",
            "sales_order_details": [
                {
                    "id": `${csvData[i].so_detail_id}`,
                    "order_status_id": 16,
                    "reason": "Salah Input"
                }
            ]
        }
        const updateSoDetailBySoId = http.request('PUT', `https://moonlay-api.dbo.dev/order-srv/sales-orders/${csvData[i].id}/details`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`,
            },
        })
        console.log('Update So Detail By So Id', updateSoDetailBySoId)
    });

   }