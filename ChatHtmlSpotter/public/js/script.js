var socket = new WebSocket('ws://localhost:8181/', 'chat');
var name = 'u1'
socket.onopen = function () {

    name = "name" + Math.floor(Math.random() * Math.floor(700));

    socket.send('{"type": "join", "name":" ' + name + '"}');
}


//Pressing enter:
$('#input_text_area').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        //name = 'u1',
        msg = $('#input_text_area').val();
        socket.send('{"type": "msg", "msg": "' + msg + '"}');
        $('#msg').val('');


        //delete the typed message after clicking the send button
        text_area = document.getElementById('input_text_area')
        text_area.value = ''
    }
});

//clicking on send button:
$('#send_btn').on('click', function (e) {
    e.preventDefault();
    //name = 'u1',
    msg = $('#input_text_area').val();
    socket.send('{"type": "msg", "msg": "' + msg + '"}');
    $('#msg').val('');

    //delete the typed message after clicking the send button
    text_area = document.getElementById('input_text_area')
    text_area.value = ''
});


socket.onmessage = function (msg) {
    var data = JSON.parse(msg.data);
    switch (data.type) {
        case 'msg':
            if (data.name == "MegaBot") {
                msg = $.parseHTML('<div class="d-flex justify-content-start mb-4" id = "messagebutton"><div class="img_cont_msg"><img src="https://media-cdn.tripadvisor.com/media/photo-s/12/ec/5c/e7/el-barista-coffee-shop.jpg" class="rounded-circle user_img_msg"></div><div class="msg_cotainer">' + data.msg + '</div></div>');
            } else {
                msg = $.parseHTML('<div class="d-flex justify-content-end mb-4"><div class="msg_cotainer_send">' + data.msg + '</div><div class="img_cont_msg"><img src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg" class="rounded-circle user_img_msg"></div></div>');
            }
            $('#message_box').append(msg);
            $('#message_box').animate({ scrollTop: 7000 }, "fast");

            break;
        case 'join':
            $('#users').empty();
            for (var i = 0; i < data.names.length; i++) {
                var user = $('<div>' + data.names[i] + '</div>');
                $('#users').append(user);
            }
            break;
    }
};

function coffeeGrainDiffference(){
    message = '<img src="resources/COFFEE-BEANS-01_1_50.jpg">'
    img = $.parseHTML('<div class="d-flex justify-content-start mb-4" id = "messagebutton"><div class="img_cont_msg"><img src="https://media-cdn.tripadvisor.com/media/photo-s/12/ec/5c/e7/el-barista-coffee-shop.jpg" class="rounded-circle user_img_msg"></div><div class="msg_cotainer">' + message + '</div></div>');
    $('#message_box').append(img);

    message = 'Arabica tends to have a smoother, sweeter taste, with flavour notes of chocolate and sugar. They often also have hints of fruits or berries. Robusta, on the other hand, has a stronger, harsher and more bitter taste, with grainy or rubbery overtones.'
    msg = $.parseHTML('<div class="d-flex justify-content-start mb-4" id = "messagebutton"><div class="img_cont_msg"><img src="https://media-cdn.tripadvisor.com/media/photo-s/12/ec/5c/e7/el-barista-coffee-shop.jpg" class="rounded-circle user_img_msg"></div><div class="msg_cotainer">' + message + '</div></div>');
    $('#message_box').append(msg);

    $('#message_box').animate({ scrollTop: 7000 }, "fast");

}