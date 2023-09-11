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
    stages: [{ duration: '1s', target: 10, }]
    // { duration: '2s', target: 10, },
    // { duration: '3s', target: 10, },
    // { duration: '1s', target: 10, },
    // { duration: '1s', target: 10, },
    // { duration: '1s', target: 10, },
    // { duration: '1s', target: 10, }],

};

const csvData = new SharedArray('another data name', function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('./data.csv'), { header: true }).data;
});

export default async function () {

    

    const credentials = `${username}:${password}`;
    for (let i = 0; i < csvData.length; i++) {
        const test = `https://moonlay-api.dbo.dev/order-srv/delivery-orders/${csvData[i].id}/details`
        const data =
        {
            "id": `${csvData[i].do_detail_id}`,
            "qty": 0,
            "note": "send"
        }    
console.log("url", test)
console.log("data", data)
    // group('Update DO Detail by DO ID', function () {
    //     const UpdateDoDetailByDoId = http.request('PUT', test, "", {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Basic ${credentials}`,
    //         },
    //     })
    //     console.log('Update DO Detail by Do ID', UpdateDoDetailByDoId)
    // });
}

}