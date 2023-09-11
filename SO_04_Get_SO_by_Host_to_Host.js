import http from 'k6/http';
import encoding from 'k6/encoding';
import { group } from 'k6';


const username = 'dbo-order-srv';
const password = 'dbo-order-srv-passwd';


export const options = {
    // vus: 1,
    // duration: '2s',
    stages: [{ duration: '1s', target: 110,},
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

    group('Get So By Host to Host', function () {
        const getSoByH2H = http.request('GET', 'https://moonlay-api.dbo.dev/order-srv/h2h/sales-orders', JSON.stringify(), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`,
            },
        })
        console.log('Get So By Host to Host', getSoByH2H)
    });
}