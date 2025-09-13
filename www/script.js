let conversationId;
let eTag;
let sendingLocked = false;

async function sendMessage() {
  const text = $("#input").val();
  $("#input").val("");
  $("#history").append(`<div class="message"><div class="user"><p>${text}</p></div></div>`);
  let id = crypto.randomUUID();
  $("#history").append(`<div class="message" id="${id}-container"><div class="assistant" id="${id}"><span class="loader" id="${id}-loader"></span></div></div>`);

  try {
    const response = await fetch('/merl/chat', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          conversationId: conversationId,
          eTag: eTag,
          message: text
      })
    });
    if (!response.ok) {
      updateResponse("init", "Got a non-okay status: " + response.status);
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    eTag = result["eTag"];
    updateResponse(id, result["response"][0]["text"]);
  } catch(e) {
    console.error(e.message);
    updateResponse("init", "Something went wrong. Check browser console for more.");
  }
}

async function updateResponse(id, text) {
  $(`#${id}-loader`).remove();
  $(`#${id}`).append(`<p>${text}</p>`);
}

async function run() {
  const url = "/merl/init_conversation";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      updateResponse("init", "Got a non-okay status: " + response.status);
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    conversationId = result["conversationId"];
    eTag = result["eTag"];
    updateResponse("init", result["history"][0]["response"][0]["text"]);
  } catch (error) {
    console.error(error.message);
    updateResponse("init", "Something went wrong when starting a new conversation.");
  }
}

run()
