
function setup() {
    var hh = $('#vector-game').innerHeight();
    $('.col-left').height(hh);
    $('.chat-upper').height(hh - 100);
    $('.chat-lower').height(100);
    
    $('#chat-input').on("keypress", function (ev) {
        if (ev.charCode == 13) {
            var text = $('#chat-input').val();
            gotInput(text);
            $('#chat-input').val("");
        }
    });
}

function put(text) {
    var log = $('.chat-log');
    log.append("<p>" + text + "</p>");
    log.scrollTop(log.scrollTop() + 200);
}

function gotInput(text) {
    put(text);
}

export var Chat = {
    setup: setup,
    put: put,
    gotInput: gotInput,
};

window.Chat = Chat;

