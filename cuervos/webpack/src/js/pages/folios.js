$(function () {
    $("form button").on('click', function () {
        $.post('api/login.php', {
            form: $("form").serialize()
        }, function (response) {
            const data = JSON.parse(response);
            console.log(data);
        },'json');
    });
});