function toggleNavigation(element) {
    element.classList.toggle('hide');
}

document.getElementById('toggle-circle')
    .addEventListener('click', function(){
    Array.from(
        document.getElementsByClassName('circle-menu'))
        .forEach(toggleNavigation);
});