io=io.connect('/');

$(function () {

    var counter=1;

    var msg = $('#msg');
    var sendBtn = $('#send');
    var chat = $('#chat');
    var user = $('#username').text();
    var touser=$('#teacher').text();
 
    

    sendBtn.click(function () {
        chat.append("<li>" + user + ": " + msg.val() + "</li>")
        io.emit('new_msg', {
            username: user,
            msg: msg.val(),
            touser:touser
        });
    })


    io.on('chat', function (data) {
        chat.append("<li>" + data.username + ": " + data.msg + "</li>")
        console.log(io.id);

    })

    io.emit('store_user', {
        user: user
    })
});