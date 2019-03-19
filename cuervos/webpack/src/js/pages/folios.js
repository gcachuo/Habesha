$(function () {
    if (getcookie('usuario')) {
        $("#login").hide();
        $("#folios").show();
    } else {
        $("#login").show();
        $("#folios").hide();
    }
    $("form button").on('click', function () {
        $.post('api/login.php', {
            form: $("form").serialize()
        }, function (data) {
            if (!data.error) {
                if (data.id) {
                    setcookie('usuario', data.id, 1);
                    location.href = "folios.php?login=true"
                } else {
                    console.log(data);
                }
            } else {
                toastr.error(data.error, 'Error');
                if (data.details) {
                    console.error(data.details);
                }
            }
        }, 'json');
    });
});

function setcookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getcookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}