import http from 'k6/http';
// import encoding from 'k6/encoding';
import { group } from 'k6';

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

export default async function () {

    const data =
        {
            "sales_order_id": '${id}',
            "warehouse_id": 101,
            "do_ref_code": '${do_ref_cod}',
            "do_ref_date": '${do_ref_date}',
            "driver_name": "Test",
            "plat_number": "Test",
            "note": "",
            "delivery_order_details": [
                {
                    "so_detail_id":'${so_detail_id}',
                    "qty": 10,
                    "note": "send"
                }
            ]
        }
    
    const credentials = `${username}:${password}`;

    group('Create DO', function () {
        const createDO = http.request('POST', 'https://moonlay-api.dbo.dev/order-srv/delivery-orders', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`,
            },
        })
        console.log('Create DO', createDO)
    });
}