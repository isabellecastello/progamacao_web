// Script para destacar o menu ativo
document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll("nav ul li a");

    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            menuLinks.forEach(item => item.classList.remove("active"));
            link.classList.add("active");
        });
    });
});
