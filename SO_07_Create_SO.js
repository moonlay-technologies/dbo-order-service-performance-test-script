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

export default async function () {


    let currentDate = new Date().toJSON().slice(0, 10);
    console.log('ini tanggal' ,currentDate);
    
    const credentials = `${username}:${password}`;
    const encodedCredentials =  encoding.b64encode(credentials);

    const data = {
        "cart_id": "12",
        "agent_id": "4",
        "store_id": "1419",
        "user_id": "147",
        "visitation_id": "1",
        "salesman_id": "525",
        "order_source_id": "1",
        "so_date": "${faker}",
        "so_ref_code": "ini data dinamis",
        "so_ref_date": "ini data dinamis",
        "total_amount": "10000000",
        "total_tonase": "1000",
        "g_long": "-5.12341",
        "g_lat": "-10.9921",
        "note": "tes notes",
        "internal_comment": "tes internal comment",
        "device_id": "id",
        "referral_code": "NDA-124246",
        "sales_order_details": [
            {
                "brand_id": "2",
                "product_id": "985",
                "uom_id": "2",
                "qty": "2",
                "price": "150000",
                "note": "tes notes order detail 1"
            },
            {
                "brand_id": 1,
                "product_id": 991,
                "uom_id": 1,
                "qty": 15,
                "price": 150000,
                "note": "tes notes order detail 1"
            }
    
        ]
    }

    group('Create SO All', function () {
        const createSOAll = http.request('POST', 'https://moonlay-api.dbo.dev/order-srv/sales-orders', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`,
            },
        })
        console.log('Create SO All ', createSOAll)
    });


}
