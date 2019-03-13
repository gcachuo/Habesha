if (localStorage.getItem('donante')) {
    location.href = 'donar.html';
}
$(function () {
    $("form button").on('click', function () {
        $.post('api/guardarRegistro.php', {
            form: $("form").serialize()
        }, function (data) {
            if (!data.error) {
                if (data.id) {
                    localStorage.setItem('donante', data.id);
                    location.href = 'donar.html';
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