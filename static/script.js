$(document).ready(function() {

    // when click image, open image in a new window
    $(document.body).on("click", "img", [], function () {
        // window.location.href = this.src;
        window.open(this.src);
    });
});
