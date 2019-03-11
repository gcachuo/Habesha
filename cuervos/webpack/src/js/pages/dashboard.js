if (localStorage.getItem('donante')) {
    location.href = 'donar.html';
}
$(function () {
    $("form button").on('click', function () {
        localStorage.setItem('donante', 1);
        location.href = 'donar.html';
    });
});