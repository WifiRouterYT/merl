# merl
a dirt simple custom frontend for Minecraft's stupid new AI virtual agent thingy

## Requirements:
1. Node.js v22 or higher
2. Yarn package manager
3. A functioning frontal lobe
4. CPU (optional)
5. Internet

## To run:
1. Clone the repo
2. Run `yarn install`
3. Run `node index.js` and open up http://localhost:3000 in a browser
4. Have fun (if you can) talking to this fairly stupid AI

## Todo:
- [ ] Enter keypress sends message (yes this should've been done earlier but whatever)
- [ ] Support multiple responses from one query, as this stupid thing for some reason sends lists as it's own response. those won't show up unless i do this
- [ ] Add handling for rate limits
- [ ] New conversation button
- [ ] Prevent spamming send button before response is done generating
- [ ] Prevent sending empty messages in general
- [ ] Conversation list/history (why?)
