import request from 'request';
import assert from 'assert';

// import '../lib/app.js';

describe('Express Server: Foodtalk Fulfilment API', () => {

	let accessToken = 'b4033e12aaf142f7b276c4a2a851c976';

	describe('Basic', () => {
		it('A valid query to API.AI should be successful by returning the status code 200.', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=foodtalk&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-27T21:17:53+0100',
				headers: {
					'Authorization':`Bearer ${accessToken}`,
					'content-type': 'application/json'
				}
			},
			(err, res, body) => {
				assert.equal(200, res.statusCode);
				done();
			})
		})
	})

	describe('UJ1', () => {
		it('Invocation Trigger: foodtalk', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=foodtalk&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-27T21:17:53+0100',
				headers: {
					'Authorization':`Bearer ${accessToken}`,
					'content-type': 'application/json'
				}
			},
			(err, res, body) => {
				assert.equal(200, res.statusCode);
				done();
			})
		})

		it('A lamb wrap please', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=lamb%20wrap%20please&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T14:36:48+0100',
				headers: {
					'Authorization':`Bearer ${accessToken}`,
					'content-type': 'application/json'
				}
			},
			(err, res, body) => {
				assert.equal(200, res.statusCode);
				done();
			})
		})

		it('Shake & Grill', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=shake%20%26%20grill&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T14:50:50+0100',
				headers: {
					'Authorization':`Bearer ${accessToken}`,
					'content-type': 'application/json'
				}
			},
			(err, res, body) => {
				assert.equal(200, res.statusCode);
				done();
			})
		})

		it('A coke and fries please', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=A%20coke%20and%20fries%20please&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T14:51:32+0100',
				headers: {
					'Authorization':`Bearer ${accessToken}`,
					'content-type': 'application/json'
				}
			},
			(err, res, body) => {
				assert.equal(200, res.statusCode);
				done();
			})
		})

		it('No thanks', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=No%20thanks&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T14:52:28+0100',
				headers: {
					'Authorization':`Bearer ${accessToken}`,
					'content-type': 'application/json'
				}
			},
			(err, res, body) => {
				assert.equal(200, res.statusCode);
				done();
			})
		})

		it('Yup', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=yup&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T14:53:55+0100',
				headers: {
					'Authorization':`Bearer ${accessToken}`,
					'content-type': 'application/json'
				}
			},
			(err, res, body) => {
				assert.equal(200, res.statusCode);
				done();
			})
		})

		it('Naa', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=naa&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T14:54:28+0100',
				headers: {
					'Authorization':`Bearer ${accessToken}`,
					'content-type': 'application/json'
				}
			},
			(err, res, body) => {
				assert.equal(200, res.statusCode);
				done();
			})
		})
	})

	describe('UJ1', () => {
		it('Invocation Trigger: foodtalk', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=foodtalk&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-27T21:17:53+0100',
				headers: {
					'Authorization':`Bearer ${accessToken}`,
					'content-type': 'application/json'
				}
			},
			(err, res, body) => {
				assert.equal(200, res.statusCode);
				done();
			})
		})

		it('A lamb wrap please', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=lamb%20wrap%20please&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T14:36:48+0100',
				headers: {
					'Authorization':`Bearer ${accessToken}`,
					'content-type': 'application/json'
				}
			},
			(err, res, body) => {
				assert.equal(200, res.statusCode);
				done();
			})
		})

		it('Shake & Grill', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=shake%20%26%20grill&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T14:50:50+0100',
				headers: {
					'Authorization':`Bearer ${accessToken}`,
					'content-type': 'application/json'
				}
			},
			(err, res, body) => {
				assert.equal(200, res.statusCode);
				done();
			})
		})

		it('A coke and fries please', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=A%20coke%20and%20fries%20please&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T14:51:32+0100',
				headers: {
					'Authorization':`Bearer ${accessToken}`,
					'content-type': 'application/json'
				}
			},
			(err, res, body) => {
				assert.equal(200, res.statusCode);
				done();
			})
		})

		it('No thanks', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=No%20thanks&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T14:52:28+0100',
				headers: {
					'Authorization':`Bearer ${accessToken}`,
					'content-type': 'application/json'
				}
			},
			(err, res, body) => {
				assert.equal(200, res.statusCode);
				done();
			})
		})

		it('Yup', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=yup&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T14:53:55+0100',
				headers: {
					'Authorization':`Bearer ${accessToken}`,
					'content-type': 'application/json'
				}
			},
			(err, res, body) => {
				assert.equal(200, res.statusCode);
				done();
			})
		})

		it('Naa', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=naa&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T14:54:28+0100',
				headers: {
					'Authorization':`Bearer ${accessToken}`,
					'content-type': 'application/json'
				}
			},
			(err, res, body) => {
				assert.equal(200, res.statusCode);
				done();
			})
		})
	})
})