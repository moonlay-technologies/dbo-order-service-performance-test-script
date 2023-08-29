import http from 'k6/http';
import encoding from 'k6/encoding';


const username = '{{username}}';
const password = '0ace74abe2af5db2feb0411f7edf7772';

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

    const credentials = `${username}:${password}`;
    const encodedCredentials = encoding.b64encode(credentials);

    const data = {
        "client_id": "manager-app",
        "client_secret": "582ca512c0a3fa4d2eefcf22b8267d44",
        "grant_type": "password",
        "user_id": "126",
        "password": "$2y$10$dVv5cccUPKdo3jt7k0W3lOYKYkWGop9SdseHB09ADbEfYDSmI1DbG"
    }

    const login = http.request('GET', 'https://api.dbo.dev/core-auth-srv/token', JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`,
        },
    })
    console.log('ini response', login)
}