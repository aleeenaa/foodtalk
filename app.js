// Enable actions client library debugging
process.env.DEBUG = "actions-on-google:*"

let Assistant = require("actions-on-google").ApiAiAssistant
let express = require("express")
let bodyParser = require("body-parser")
let sprintf = require("sprintf-js").sprintf
let chalk = require('chalk')

let app = express()
app.set("port", (process.env.PORT || 8080))
app.use(bodyParser.json({
	type: "application/json"
}))

function notify(text) {
	console.log(chalk.blue(text))
}

// action values
const startJourneyAction = "journey.start",
	earlyQuitJourneyAction = "journey.quit",
	browseAction = "journey.browse",
	chosenUserFoodSpotAction = "journey.order.foodSpot",
	browseByFoodSpotAction = "journey.browse.onlyFoodSpot",
	confirmOrderAction = "journey.confirmOrder",
	orderReadyAction = "journey.order.ready",
	orderUnreadyAction = "journey.order.unready",
	orderAgainAction = "journey.restart",
	quitJourneyAction = "journey.end",

	// response string prompts
	noInputPrompts = ["I didn't hear a number", "Hey, you there?",
		"Okay well let me know when you want some food. Talk to you later."
	],
	greetingPrompt = ["Welcome to Foodrun, your personal waiter for takeaways and deliveries!"],
	invocationPrompt = ["What would you like to eat?", "What do you feel like eating today?"],
	quitPrompts = ["Ok, let me know when you get hungry. Bye!", "Ok, bye", "Ok, see you soon!"],
	acknowledgePrompt = ["Great!"],


	sellsUserFoodPrompts = ["These places sell %s: Shake & Grill, Umami & Roosters Piri Piri."],
	whichRestaurantPrompt = ["Which one shall we order from?"],
	foodSpotChosenPrompt = ["Anything else from %s?"],
	confirmOrderPrompts = ["Okay so that's %s from %s, right?", "Okay so that's %s to order from %s?"],
	orderPlacedPrompt = ["Order placed.", "Awesome! Order placed.", "Order has been placed."],
	startAgainPrompt = ["Want to order again?", "Another order?", "Shall I order from another restaurant?"]

/**
 * Utility Functions
 */

/**
 * A function which returns a prompt at random from a
 * given array of prompts. Prevents returning of the
 * same prompt as the previous one.
 * @param  {[type]} assistant [description]
 * @param  {[type]} array     [description]
 * @return {[type]}           [description]
 */
function getRandomPrompt(assistant, array) {
	let prompt,
		lastPrompt = assistant.data.lastPrompt;

	for (let i in array) {
		if (array[i] === lastPrompt) {
			array.splice(i, 1)
      		break;
		}
	}

  	prompt = array[Math.floor(Math.random() * (array.length))];
	return prompt;
}

/**
 * Utility function that converts an array's elements into
 * a formatted string separated by comma's but an ampersand
 * between the last two elements.
 * @param  {[type]} items [description]
 * @return {[type]}       [description]
 */
function concatItems(items) {
	let listA = items,
		len = items.length,
		listB = ' & ' + listA.splice(len - 1, len),
		list = listA.join(', ') + listB

	return list
}

/**
 * {POST} method '/'
 * Handles all incoming requests from the API.AI agent
 * 'foodtalk' and responses accordingly.
 * @param  {Object}		request   [description]
 * @param  {Object}		response  [description]
 * @return {[type]}               [description]
 */
app.post('/', function(request, response) {

	console.log(chalk.green('headers: ' + JSON.stringify(request.headers)))
	console.log(chalk.yellow('body: ' + JSON.stringify(request.body)))

	const assistant = new Assistant({
		request: request,
		response: response
	})

	/**
	 * Custom print function
	 * @param  {String} prompt 	Response prompt to be
	 *                          returned to the user
	 * @return {function} 	 	Special format identifier
	 *                          printing function
	 */
	function printf(prompt) {
		notify('printf: ' + prompt)
		assistant.data.printed = prompt
		return sprintf.apply(this, arguments)
	}

	/**
	 * Custom 'ask' function to prompt the user for a response.
	 * Usually utilised for slot filling.
	 * @param  {[type]} assistant API AI Assistant
	 * @param  {[type]} prompt    Response prompt used to ask
	 *                            user for further parameters
	 *                            (slot filling)
	 * @param  {[type]} persist   flag used for persistent
	 *                            prompting
	 * @return {[type]}           [description]
	 */
	function ask(assistant, prompt, persist) {
		notify('ask: ' + prompt);
		if (persist === undefined || persist) {
			assistant.data.lastPrompt = assistant.data.printed
		}
		assistant.ask(prompt, noInputPrompts)
	}

	function initStorage(assistant) {
		let order = {
				items: [],
				foodSpot: null
			},
			query = {
				food: [],
				cuisine: [],
				foodSpot: null
			}
		assistant.data.order = order
		assistant.data.query = query
		return assistant
	}

	/**
	 * A function which handles initial greeting and invocation
	 * sequence with user.
	 * @param  {[type]} assistant API AI Assistant
	 * @return {[type]}           [description]
	 */
	function startJourney(assistant, restart) {
		notify('journey start')
		let aiAssistant = initStorage(assistant)
		notify(JSON.stringify(aiAssistant.data.query))

		if (restart) {
			return ask(aiAssistant, printf(getRandomPrompt(aiAssistant, invocationPrompt)))
		}

		ask(aiAssistant, printf(greetingPrompt + " " + getRandomPrompt(aiAssistant, invocationPrompt)))
	}

	/**
	 * Function that handles the quit sequence and responds
	 * with a ending prompts.
	 * @param  {[type]} assistant [description]
	 * @return {[type]}           [description]
	 */
	function quitJourney(assistant) {
		notify('quitting sequence')

		assistant.tell(getRandomPrompt(assistant, quitPrompts))
	}

	/**
	 * Function that transfers all queried food items over
	 * into the order object and erases queried food items.
	 * Subsequently asks user if they'd like to further
	 * order more items from the same restaurant (food spot).
	 * @param {[type]} assistant [description]
	 * @param {[type]} foodSpot  [description]
	 */
	function addQueryToOrder(assistant, foodSpot) {
		notify('adding query food to order')

		let queryFood = assistant.data.query.food
		queryFood.forEach(function(choice) {
			assistant.data.order.items.push(choice)
		})

		// empty query once items transferred
		// over to order
		assistant.data.query.food = [];

		return ask(assistant, printf(getRandomPrompt(assistant, acknowledgePrompt) + " " + getRandomPrompt(assistant, foodSpotChosenPrompt).toString(), foodSpot))
	}

	/**
	 * A function that browses the database for food spots
	 * dependant upon user input for food.
	 * @param  {[type]} assistant API AI Assistant
	 * @return {[type]}           [description]
	 */
	function browse(assistant) {
		notify('browsing by food')
			// notify(JSON.stringify(assistant.data.query))

		let query = assistant.data.query,
			// order = assistant.data.order,
			input = assistant.getArgument('query-items'),
			rawInput = assistant.getRawInput().toLowerCase()
			// foodSpot = assistant.getArgument('food-spot') || order.foodSpot

		// notify(JSON.stringify(assistant.data.query))
		query.food = input
			// notify(JSON.stringify(assistant.data.query))

		// if (foodSpot) {
		// 	notify('foodspot exists - ' + JSON.stringify(order))
		// 			notify(JSON.stringify(assistant.data.query))

		// 	addQueryToOrder(assistant, foodSpot)
		// 	notify('query items added to order:' + JSON.stringify(order))
		// 	return false
		// }
		// notify(JSON.stringify(assistant.data.query))

		ask(assistant, printf(sellsUserFoodPrompts + " " + whichRestaurantPrompt, rawInput))
	}

	/**
	 * A function that saves user input for chosen food
	 * spot (chosen restaurant to order from) and asks user
	 * for further items from said food spot.
	 * @param  {[type]} assistant API AI Assistant
	 * @return {[type]}           [description]
	 */
	function chooseFoodSpot(assistant) {
		notify('saving chosen restaurant')
		let order = assistant.data.order,
			query = assistant.data.query,
			input = assistant.getArgument('food-spot')
		notify(JSON.stringify(assistant.data.query))

		order.foodSpot = input
		query.foodSpot = input
		addQueryToOrder(assistant, input)
	}

	/**
	 * A function that handles ordering of items from an
	 * already chosen restaurant (food spot).
	 * @param  {[type]} assistant [description]
	 * @return {[type]}           [description]
	 */
	function orderFromFoodSpot(assistant) {
		notify('ordering food from food spot')
		// notify(JSON.stringify(assistant.data.query))

		let query = assistant.data.query,
			order = assistant.data.order,
			input = assistant.getArgument('query-items'),
			foodSpot = order.foodSpot

		query.food = input
		// notify('query food updated'+JSON.stringify(assistant.data.query))

		// notify('order' +JSON.stringify(order))

		if (!foodSpot) {
			return assistant.tell('food spot has not been chosen!')
		}
		// notify('foodspot exists - ' + JSON.stringify(order))
		// notify(JSON.stringify(assistant.data.query))
		addQueryToOrder(assistant, foodSpot)
		// notify('query items added to order:' + JSON.stringify(order))
	}

	function orderMoreFromFoodSpot(assistant) {
		assistant.setContext("chosen_foodspot-followup", 1)
		let foodSpot = assistant.data.order.foodSpot
		ask(assistant, printf(getRandomPrompt(assistant, foodSpotChosenPrompt).toString(), foodSpot))
	}

	function confirmOrder(assistant) {
		notify(JSON.stringify(assistant.data.query))
		notify(JSON.stringify(assistant.data.order))

		let items = assistant.data.order.items,
			foodSpot = assistant.data.order.foodSpot,
			list = items.length === 1 ? items[0] : concatItems(items)

		ask(assistant, printf(getRandomPrompt(assistant, confirmOrderPrompts), list, foodSpot))
	}

	function placeOrder(assistant) {
		notify(JSON.stringify(assistant.data.query))
		notify(JSON.stringify(assistant.data.order))

		ask(assistant, printf(getRandomPrompt(assistant, orderPlacedPrompt) + ' ' + getRandomPrompt(assistant, startAgainPrompt)))
	}

	function orderAgainYes(assistant) {
		notify('ordering again')
		startJourney(assistant, true)
	}

	let actionMap = new Map()
	actionMap.set(startJourneyAction, startJourney)
	actionMap.set(earlyQuitJourneyAction, quitJourney)
	actionMap.set(browseAction, browse)
	actionMap.set(chosenUserFoodSpotAction, chooseFoodSpot)
	actionMap.set(browseByFoodSpotAction, orderFromFoodSpot)
	actionMap.set(confirmOrderAction, confirmOrder)
	actionMap.set(orderReadyAction, placeOrder)
	actionMap.set(orderUnreadyAction, orderMoreFromFoodSpot)
	actionMap.set(orderAgainAction, orderAgainYes)
	actionMap.set(quitJourneyAction, quitJourney)

	assistant.handleRequest(actionMap)

})


// Start the server
var server = app.listen(app.get('port'), function() {
	console.log('App listening on port %s', server.address().port)
	console.log('Press Ctrl+C to quit.')
})