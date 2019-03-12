if (localStorage.getItem('donante')) {
    location.href = 'donar.html';
}
$(function () {
    $("form button").on('click', function () {
        $.post('api/guardarRegistro.php', {
            form: $("form").serialize()
        }, function (data) {
            console.log(data);
            // return;
            // localStorage.setItem('donante', 1);
            // location.href = 'donar.html';
        }, 'json');
    });
});