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

	// response string prompts
	noInputPrompts = ["I didn't hear a number", "Hey, you there?",
		"Okay well let me know when you want some food. Talk to you later."
	],
	greetingPrompt = ["Welcome to Foodrun, your personal waiter for takeaways and deliveries!"],
	invocationPrompt = ["What would you like to eat?", "What do you feel like eating today?"],
	quitPrompts = ["Ok, let me know when you get hungry. Bye!"],
	acknowledgePrompt = ["Great!"],


	sellsUserFoodPrompts = ["These places sell %s: Shake & Grill, Umami & Roosters Piri Piri."],
	whichRestaurantPrompt = ["Which one shall we order from?"],
	foodSpotChosenPrompt = ["Great! Anything else from %s?"],
	confirmOrderPrompts = ["Okay so that's %s, right?", "Okay so that's %s to order?"]


// TODO: get random prompt utility function
function getRandomPrompt(assistant, array) {
	let lastPrompt = assistant.data.lastPrompt;
	let prompt;
	if (lastPrompt) {
		for (let index in array) {
			prompt = array[index];
			if (prompt !== lastPrompt) {
				break;
			}
		}
	} else {
		prompt = array[Math.floor(Math.random() * (array.length))];
	}
	return prompt;
}

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

	/**
	 * A function which handles initial greeting and invocation
	 * sequence with user.
	 * @param  {[type]} assistant API AI Assistant
	 * @return {[type]}           [description]
	 */
	function startJourney(assistant) {
		notify('journey start')
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
		notify(JSON.stringify(assistant.data.query))
		ask(assistant, printf(greetingPrompt + " " + getRandomPrompt(assistant, invocationPrompt)))
	}

	function quitJourney(assistant) {
		notify('QUITTING SEQUENCE')
		assistant.tell(printf(quitPrompts.toString()))
	}

	function addQueryToOrder(assistant, foodSpot) {
		notify('adding query food to order')

		let queryFood = assistant.data.query.food
		queryFood.forEach(function(choice) {
			assistant.data.order.items.push(choice)
		})

		// empty query once items transferred
		// over to order
		assistant.data.query.food = [];

		return ask(assistant, printf(getRandomPrompt(assistant, foodSpotChosenPrompt).toString(), foodSpot))
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
		return false
	}

	function concatItems(items) {
		// notify(items.length)
		let listA = items,
			len = items.length,
			listB = ' & ' + listA.splice(len - 1,len),
			list = listA.join(', ') + listB

		// for (let i = 0; i <= len - 1; i++) {
		// 	if (i === len - 1) {
		// 		// notify('at last item in items')
		// 		list += printf("& %s", items[i])
		// 		break
		// 	}
		// 	list += items[i] + ", "
		// 	// notify(list)
		// }

		// notify(list)
		return list
	}

	function confirmOrder(assistant) {
		notify(JSON.stringify(assistant.data.query))
		notify(JSON.stringify(assistant.data.order))

		let items = assistant.data.order.items,
			foodSpot = assistant.data.order.foodSpot,
			i = 0,
			list = items.length === 1 ? items[0] : concatItems(items)

		ask(assistant, printf(getRandomPrompt(assistant, confirmOrderPrompts), list))
	}

	let actionMap = new Map()
	actionMap.set(startJourneyAction, startJourney)
	actionMap.set(earlyQuitJourneyAction, quitJourney)
	actionMap.set(browseAction, browse)
	actionMap.set(chosenUserFoodSpotAction, chooseFoodSpot)
	actionMap.set(browseByFoodSpotAction, orderFromFoodSpot)
	actionMap.set(confirmOrderAction, confirmOrder)

	assistant.handleRequest(actionMap)

})


// Start the server
var server = app.listen(app.get('port'), function() {
	console.log('App listening on port %s', server.address().port)
	console.log('Press Ctrl+C to quit.')
})
