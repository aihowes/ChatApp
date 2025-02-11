var socket = io();
socket.on('connect', function () {
    // console.log("connected to client");
    var user = QueryStringToJSON();
    // console.log(user);
    socket.emit('addUser', user);
})


/* Function for sending message*/
function sendMessage() {
    console.log("SEND MESSAGE CALLED");
    const message = document.getElementById('text-message').value;
    if (message.trim().length === 0) {
        return;
    }
    const sendmessage = {
        text: message
    }
    console.log("SENDING MESSAGE AS", sendmessage);
    socket.emit('newMessage', sendmessage);

}

/* Function for receiving message */
socket.on('receivedMessage', function (data) {
    console.log("RECEIVED MESSAGE", data);
    var div = document.createElement('div');
    div.setAttribute('class', 'message');
    var h3 = document.createElement('h3');
    h3.setAttribute('class', 'from');
    h3.innerHTML = data.from;
    div.appendChild(h3);
    var span = document.createElement('span');
    span.innerHTML = data.time;
    span.setAttribute('class', 'time');
    div.appendChild(span);
    var p = document.createElement('p');
    p.setAttribute('class', 'message-received');
    p.innerHTML = data.text;
    div.appendChild(p);
    var messagePanel = document.getElementById('message-panel');
    messagePanel.appendChild(div);
})

/* Funtion for receiving list of people */
socket.on('updatedUserList', function (data) {
    console.log("user list", data);
    var peopleList = document.getElementById('people-list');
    peopleList.innerHTML = "";
    for (var i in data) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(`${data[i].name}`));
        peopleList.appendChild(li);
    }
})


/* deparams function to convert it into a object of key value */
function QueryStringToJSON() {
    var pairs = location.search.slice(1).split('&');

    var result = {};
    pairs.forEach(function (pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
}