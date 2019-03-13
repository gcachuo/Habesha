if (!localStorage.getItem('donante')) {
    location.href = 'index.html';
} else {
    $("#id_donante").val(localStorage.getItem('donante'));
}
$(function () {
    $("#btnRegresar").on('click', function () {
        localStorage.removeItem('donante');
        location.href = 'index.html';
    });
    $("#btnConfirmar").on('click', function () {
        $.post('api/guardarDonacion.php', {
            form: $("form").serialize()
        }, function (data) {
            if (!data.error) {
                if (data.id) {
                    localStorage.setItem('donacion', data.id);
                    location.href = 'procesar_donacion.php?id=' + data.id;
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
    })
});