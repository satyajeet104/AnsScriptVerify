io=io.connect('/');

$(function () {

    var counter=1;

    var msg = $('#msg');
    var sendBtn = $('#send');
    var chat = $('#chat');
    var user = $('#username').text();
    var touser=$('#teacher').text();
 
    

    sendBtn.click(function () {
        chat.append('<div class="chat self">  <div class="user-photo"></div><p class="chat-message">'+msg.val()+'</p></div>');

        io.emit('new_msg', {
            username: user,
            msg: msg.val(),
            touser:touser
        });
    })


    io.on('chat', function (data) {
        chat.append('<div class="chat friend">  <div class="user-photo"></div><p class="chat-message">'+msg.val()+'</p></div>');

        console.log(io.id);

    })

    io.emit('store_user', {
        user: user
    })
});