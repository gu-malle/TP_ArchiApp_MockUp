// script.js

var messageBoardURL = process.env.MESSAGE_BOARD_URL || 'https://7fc4a0e2-87bd-4109-9ec1-3ee0accaff79-00-1py5qmsc9nmdj.riker.replit.dev/'

function updateMessages() {
  fetch(messageBoardURL + 'msg/getAll')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var messages = data;
      var messageList = document.querySelector('ul');
      messageList.innerHTML = ''; // Effacer les messages existants

      messages.forEach(function(message) {
        var newLi = document.createElement('li');
        newLi.textContent = message;
        messageList.appendChild(newLi);
      });
    });
}

updateMessages();

function sendMessage(message) {
  // Post message
  fetch(messageBoardURL + 'msg/post/' + message, { method: "POST" })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data.num >= 0) {
        $("textarea").val('');
      } else {
        alert("Erreur lors de l'envoi du message : " + data)
      }
    });
}


// Handle du bouton "Envoyer"
document.getElementById('sendMessage').addEventListener('click', function() {
  var message = $("textarea").val()

  sendMessage(message);
  updateMessages();
});

// Handle du press enter
document.getElementById('newMessageTextArea').addEventListener('keydown', function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("sendMessage").click();
  }
});



// Handle du bouton "Tout supprimer"
document.getElementById('deleteAllMessages').addEventListener('click', function() {
  fetch(messageBoardURL + 'msg/deleteAll', { method: "POST" })
    .then(function(response) {
      return response.json();
    });

  updateMessages();
});
