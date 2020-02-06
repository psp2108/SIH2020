function myFunction() {
    // For Nav Bar
    var navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;
    // For Bottom Bar
    bottombar = document.getElementById("bottombar");
    sticky2 = bottombar.offsetTop;

    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
        bottombar.classList.add("sticky-bottom");
    } else {
        navbar.classList.remove("sticky");
        bottombar.classList.remove("sticky-bottom");
    }
}