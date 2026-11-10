import { test, expect, request } from '@playwright/test';

let logintoken;

test.describe.configure({ mode: 'serial' });

test.describe('TROZ APIs', () => {

    test('Login TROZ API', async ({ request }) => {

const loginResponse = await request.post('https://auth.troz3-chn.ikshana.com/realms/troz/protocol/openid-connect/token',{
    form: {
       grant_type: 'password',
        client_id: 'ikshana-java-api',
        username: 'userlnt',
        password: 'userlnt@123',
        scope: 'openid',
       client_secret: 'B5IXaX5X5ja3viycliwig8ik8ef5mouA'
    }  
}
)
expect(loginResponse.status()).toBe(200);
const loginResponseBody = await loginResponse.json();
console.log("Login status code: ", loginResponse.status());
console.log("Login response is ok: ", loginResponse.ok());
console.log("Response Body: ", loginResponseBody);
logintoken = loginResponseBody.access_token;
console.log("Access Token: ",logintoken);
});


test('API to retrieve all TROZ records',async ({ request }) => {
    console.log("Access Token in Records API: ",logintoken);
    const recordsResponse = await request.get('https://live.troz3-chn.ikshana.com/data-api/all-records', {
params: {
startDate: '2026-11-02 00:00:00',
endDate: '2026-11-02 12:59:59',
},
headers: {
    Authorization: `Bearer ${logintoken}`,
} })

expect( recordsResponse.status()).toBe(200);
console.log("Records status code: ", recordsResponse.status());
console.log("Records response is: ", recordsResponse.ok());
const recordsResponseBody = await recordsResponse.json();
console.log("Response Body: ", recordsResponseBody);
console.log("1st Alert name in Response Body: ", recordsResponseBody.records[0].alertname);
})
})