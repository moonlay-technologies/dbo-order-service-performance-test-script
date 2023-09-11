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

    const data =
    {
        "warehouse_id": 4,
        "order_source_id": 1,
        "order_status_id": 17,
        "do_ref_code": "Testing-054",
        "do_ref_date": "2023-04-17",
        "driver_name": "test",
        "plat_number": "B1912BC",
        "note": "Test Note DO",
        "delivery_order_details": [
            {
                "id": `${csvData[i].do_detail_id}`,
                "qty": 0,
                "note": "send"
            }
        ]
    }

    const credentials = `${username}:${password}`;
    const encodedCredentials = encoding.b64encode(credentials);

    group('Update DO by ID', function () {
        const UpdateDoById = http.request('PUT', `https://moonlay-api.dbo.dev/order-srv/delivery-orders/${csvData[i].id}`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`,
            },
        })
        console.log('Update DO by ID', UpdateDoById)
    });
}