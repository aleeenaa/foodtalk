import request from 'request';
import assert from 'assert';

// import '../lib/app.js';

describe('Express Server: Foodtalk Fulfilment API', () => {

	let accessToken = 'b4033e12aaf142f7b276c4a2a851c976';

	describe('A valid query to API.AI should be successful by returning the status code 200.', () => {
		it('should return 200', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=foodtalk&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-27T21:17:53+0100',
				headers: {
					'Authorization':`Bearer ${accessToken}`,
					'content-type': 'application/json'
				}
			},
			(err, res, body) => {
				assert.equal(200, res.statusCode);
				console.log('error: '+err)
				console.log('result: '+ JSON.stringify(res))
				console.log('body: '+body)
				done();
			})
		})
	})
})