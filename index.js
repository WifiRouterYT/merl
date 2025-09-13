import fetch from 'node-fetch';
import express from 'express';

async function initConvo(url, data) {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:142.0) Gecko/20100101 Firefox/142.0',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.5',
    'activeusertreatments': '',
    'content-type': 'application/json',
    'Sec-GPC': '1',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    'Priority': 'u=4',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    "Origin": "https://help.minecraft.net",
    "Referer": "https://help.minecraft.net",
  };

  const body = JSON.stringify(data);
  const response = await fetch(url, {method: 'POST', headers, body, mode: 'cors'});

  const responseData = await response.json();
  return responseData;
}

async function sendMessage(conversationId, eTag, message) {
  const json = {"conversationId":conversationId,"eTag":`${eTag}`,"text":message,"customizationSelections":{"personaId":"4df333df-bdbe-4a08-93ba-88ee95d53794"}};
  const response = await fetch("https://xsva.support.xboxlive.com/chat", {
      "credentials": "omit",
      "headers": {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:142.0) Gecko/20100101 Firefox/142.0",
          "Accept": "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "activeusertreatments": "",
          "content-type": "application/json",
          "Sec-GPC": "1",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "cross-site",
          "Priority": "u=4",
          "Pragma": "no-cache",
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "Origin": "https://help.minecraft.net",
          "Referer": "https://help.minecraft.net",
      },
      "body": JSON.stringify(json),
      "method": "POST",
      "mode": "cors"
  });

  const responseData = await response.json();
  return responseData;
}

const app = express();
const port = process.env.PORT || 3000; 
app.use(express.static('www'));
app.use(express.urlencoded());
app.use(express.json());

app.get('/merl/init_conversation', async (req, res) => {
  let response;
  try {
    response = await initConvo("https://xsva.support.xboxlive.com/initialize_conversation", {"clientId":"MINECRAFT_HELP","conversationId":null,"forceReset":false,"greeting":"Hi there! <br/><br/> I'm Merl, your helpful Minecraft Support Virtual Agent <i>(in Beta)</i>, powered by AI! <br/><br/> I can answer questions you have about the Help Articles on this site. <br/><br/> Let's get you back to crafting!","locale":"en-US","country":"US"});
    res.status(200).json(response);
  } catch(e) {
    console.log("[WARN] Failed to initialize conversation!");
    console.log(e);
    res.status(500).send("An internal error occurred. Check server console.");
  }
});

app.post('/merl/chat', async(request, res) => {
  if(!(request.body.conversationId && request.body.eTag && request.body.message)) return res.status(400).send("Missing fields.");
  let response;
  try {
    response = await sendMessage(request.body.conversationId, request.body.eTag, request.body.message);
    res.status(200).json(response);
  } catch(e) {
    console.log("[WARN] Failed to send message!");
    console.log(e);
    res.status(500).send("An internal error occurred. Check server console.");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
