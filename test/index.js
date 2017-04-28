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
/**
 * [description]
 * @param  {[type]}		UJ1		         User Journey 1
 * @param  {Function}	Test case definition of UJ1
 * @param  {[type]}		{
 *         				'content-type': 'application/json'
 *         				}				Header
 * @param  {Function} (err,res,body)	Response Objects
 * @return {[type]}						Results for Assertion
 */
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
/**
 * [description]
 * @param  {[type]}		UJ2'			User Journey 2
 * @param  {Function}	Test case definition of UJ2: Happy
 *                      Ending with Two Rounds
 * @param  {[type]}		{
 *         				'content-type': 'application/json'
 *         				}				Header
 * @param  {Function} (err,res,body)	Response Objects
 * @return {[type]}						Results for Assertion
 */
	describe('UJ2', () => {
		it('Invocation Trigger: Let me talk to food talk please', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=Let%20me%20talk%20to%20Foodtalk%20please!&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T14:59:03+0100',
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

		it('Chicken burger please', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=Chicken%20burger%20please&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T15:03:48+0100',
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

		it('From umami please', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=From%20umami%20please&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T15:04:35+0100',
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

		it('Yeah a coke please', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=Yeah%20a%20coke%20please&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T15:05:08+0100',
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

		it("Naa its good", (done) => {
			request({
				url: "https://api.api.ai/api/query?v=20150910&query=Naa%20it's%20good&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T15:05:41+0100",
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

		it('Yeah I want chinese', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=Yeah%20I%20want%20chinese&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T15:19:49+0100',
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

		it('Lets go with china town', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=Lets%20go%20with%20china%20town&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T15:20:30+0100',
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

		it('I want chow mein', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=I%20want%20chow%20mein&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T15:21:14+0100',
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

		it("No that's fine", (done) => {
			request({
				url: "https://api.api.ai/api/query?v=20150910&query=No%20that's%20fine&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T15:22:04+0100",
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

		it('No thanks', (done) => {
			request({
				url: 'https://api.api.ai/api/query?v=20150910&query=no%20thanks&lang=en&sessionId=832fba30-130f-49cd-8244-af5a8c5959ce&timezone=2017-04-28T15:23:23+0100',
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