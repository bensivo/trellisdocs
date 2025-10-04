import axios from 'axios';

import "jest";

describe('Health API', () => {
    it('Should return 200', async () => {
        const res = await axios.get('http://localhost:8000/api/health')

        expect(res.status).toEqual(200);
    })
})