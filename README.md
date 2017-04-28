<p align="center">
  <img src="https://github.com/barthola/foodtalk/blob/master/Logo.png" alt="Logo" width="30%">
</p>

<p align="center">
  <i>A VUI for ordering foodservice.</i>
</p>

Google Home Web Simulator setup can be found [here](https://developers.google.com/actions/tools/fulfillment-hosting#deploying_to_google_app_engine)

## License
© 2015 Aleena Naeem

# Foodtalk
Fulfillment logic for a voice-enabled food ordering system on api.ai

## Pre-Installation Requirements
- User must be in posession of a reachable public URL
- User must be in posession of a server of computer

## Installation

1. `git clone https://github.com/barthola/foodtalk`.
2. Install [NodeJS](https://nodejs.org/en/download/) - (Installation of NPM is accompanied usually).
3. `npm i`
4. `npm build` - for backwards es compatibility.
5. Create an account for [API.AI](https://api.ai/).
6. Create a new agent - preferably named `Foodtalk`.
7. Go to agent settings > Export and Import by clicking on the cog symbol next to the agent name.
8. Click `Restore from zip` to import the zip file `foodtalk.zip` into the agent.
9. Click `Fulfilment` on the left hand side menu and enable webhook, fill in the `URL` field in the format `http://{address}:8080`.
10. User will have visit each intent, accessible through the left hand side menu and enable fulfilment. This is usually found at the bottom of the intent's page.
11. The agent is set up and ready to be used.

## Startup

**Development**
- From the command line, navigate to the root directory of the project and run the command

```bash
npm start
```

**Production (using [pm2](https://github.com/Unitech/pm2))**
```bash
pm2 start app
```

**Production without the use of pm2**
```bash
npm run serve
```

## Testing
Make sure the fulfillment logic is being hosted publicly for the test script to be able to query it.
```bash
npm test
```
*See `test/index.js` for more info*

## Demo

**[Google Home Web Simulator](https://developers.google.com/actions/tools/web-simulator)**
```bash
npm run deploy
```
