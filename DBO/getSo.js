import http from 'k6/http';
// import encoding from 'k6/encoding';
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

export default async function () {

    group('Get So By Salesman Id', function () {
        const getSoBySalesmanId = http.request('GET', 'https://api.dbo.dev/order-srv/sales-orders?salesman_id={{id}}', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`,
            },
        })
        console.log('Get So By Salesman Id', getSoBySalesmanId)
    });

     group('Get So By Store Id', function () {
        const getSoByStoreId = http.request('GET', 'https://api.dbo.dev/order-srv/sales-orders?store_id=1419', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`,
            },
        })
         console.log('Get So By Store Id', getSoByStoreId)
     });
    
    group('Get So By Host to Host', function () {
        const getSoByH2H = http.request('GET', 'https://api.dbo.dev/order-srv/h2h/sales-orders', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`,
            },
        })
        console.log('Get So By Host to Host', getSoByH2H)
    });

    group('Get So By Id', function () {
        const getSoById = http.request('GET', 'https://api.dbo.dev/order-srv/sales-orders?id=372132', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`,
            },
        })
        console.log('Get So By Id', getSoById)
    });
}