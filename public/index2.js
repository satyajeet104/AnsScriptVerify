io=io.connect('/');

$(function () {

    var counter=1;

    var msg = $('#msg');
    var sendBtn = $('#send');
    var chat = $('#chat');
    var user = $('#username').text();
    var touser=$('#teacher').text();
    var nextBtn=$('#nextPic');

    nextBtn.click(function(){

        counter=(counter+1)%11;
        if(counter==0)
        {

            counter=1;

        }

        var str= "url('/uploads/"+user+"/"+counter+".png');"
        document.getElementById("#bhatura").style["background-image"]=str;
            console.log(counter);
            console.log(str);
            


    })
    

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