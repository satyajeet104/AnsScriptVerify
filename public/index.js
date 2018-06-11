
var socket = io();

$(function () {
  
    var msg = $('#msg');
    var sendBtn = $('#send');
    var chat = $('#chat');
    var user = $('#userName').text();
    //console.log(socket.socket.sessionid);



    sendBtn.click(function () {
        socket.emit('new_msg', {
            username: user,
            msg: msg.val()
        });
    })


    socket.on('chat', function (data) {
        chat.append("<li>" + data.username + ": " + data.msg + "</li>")
    })

    socket.emit('store_user', {
        user: user
    })
  })
