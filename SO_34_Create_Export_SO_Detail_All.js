import http from 'k6/http';
import encoding from 'k6/encoding';
import { group } from 'k6';


const username = 'dbo-order-srv';
const password = 'dbo-order-srv-passwd';


export const options = {
    // vus: 1,
    // duration: '2s',
    stages: [{ duration: '600s', target: 17100,},
    { duration: '2s', target: 10, },
    { duration: '3s', target: 10, },
    { duration: '1s', target: 10, },
    { duration: '1s', target: 10, },
    { duration: '1s', target: 10, },
    { duration: '1s', target: 10, }],

};
export default async function () {
    const credentials = `${username}:${password}`;
    const encodedCredentials = encoding.b64encode(credentials);

    group('Create Export So Detail', function () {
        const createExportSoDetail = http.request('GET', 'https://moonlay-api.dbo.dev/order-srv/sales-orders/export/sales-order-details', JSON.stringify(), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`,
            },
        })
        console.log('Create Export So Detail', createExportSoDetail)
    });
}