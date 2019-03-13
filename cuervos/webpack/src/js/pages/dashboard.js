if (localStorage.getItem('donante')) {
    location.href = 'donar.html';
}
$(function () {
    $("form button").on('click', function () {
        $.post('api/guardarRegistro.php', {
            form: $("form").serialize()
        }, function (data) {
            if (!data.error) {
                console.log(data);
            } else {
                toastr.error(data.error, 'Error');
                console.error(data.details);
            }
            // return;
            // localStorage.setItem('donante', 1);
            // location.href = 'donar.html';
        }, 'json');
    });
});