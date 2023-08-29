import http from 'k6/http';
// import encoding from 'k6/encoding';
import { group } from 'k6';

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

    group('regress 1', function () {
        const regress1 = http.request('GET', 'https://reqres.in/api/users?page=2', {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        console.log('regress 1', regress1)
    });

     group('regress 2', function () {
        const regress2 = http.request('GET', 'https://reqres.in/api/users/2',{
            headers: {
                'Content-Type': 'application/json'
            },
        })
         console.log('egress 2', regress2)
     });
    
    group('regress 3', function () {
        const regress3 = http.request('GET', 'https://reqres.in/api/users?page=4', {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        console.log('regress 3', regress3)
    });

    group('regress 4', function () {
        const regress4 = http.request('GET', 'https://reqres.in/api/users?page=3', {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        console.log('regress 4', regress4)
    });
}