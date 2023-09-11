import http from 'k6/http';
// import encoding from 'k6/encoding';
import { group } from 'k6';

const username = 'dbo-order-srv';
const password = 'dbo-order-srv-passwd';

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

    const credentials = `${username}:${password}`;
    const encodedCredentials =  encoding.b64encode(credentials);

    const data = {
        "order_status_id": "10",
        "reason": "Tidak Ada Stok",
        "sales_order_details": [
            {
                "id": `${csvData[i].so_detail_id}`,
                "order_status_id": "16",
                "reason": "Salah Input"
            }
        ]
    }

    group('Update SO', function () {
        const updateSO = http.request('POST', `https://moonlay-api.dbo.dev/order-srv/sales-orders/${csvData[i].id}`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`,
            },
        })
        console.log('Update SO ', updateSO)
    });


}
