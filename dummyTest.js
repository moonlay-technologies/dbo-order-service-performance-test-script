import http from 'k6/http';
import { group } from 'k6';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { SharedArray } from 'k6/data';
import encoding from 'k6/encoding';

const username = 'dbo-order-srv';
const password = 'dbo-order-srv-passwd';

const csvData = new SharedArray('another data name', function () {
  // Load CSV file and parse it using Papa Parse
  return papaparse.parse(open('./data.csv'), { header: true }).data;
});
console.log(csvData.length);

export default async function () {
  const credentials = `${username}:${password}`;
  const encodedCredentials = encoding.b64encode(credentials);
  for (let i = 0; i < csvData.length; i++) {
    // const test = `https://moonlay-api.dbo.dev/order-srv/delivery-orders?id=${csvData[i].id}&id2=${csvData[i].id2}`

    const test = `https://moonlay-api.dbo.dev/order-srv/delivery-orders?id=${csvData[i].id}`
    console.log(test);

    group('Get DO Detail By DO ID', function () {
      const getDoDetailByDoId = http.request('GET', test, "", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`,
        },
      })
      console.log('Get DO Detail By DO ID', getDoDetailByDoId)
      console.log(getDoDetailByDoId.body)
    });
  }
}
