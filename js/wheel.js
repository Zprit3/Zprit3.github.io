const logo = document.querySelector('.logo');
const tryMeMessage = document.getElementById('try-me-message');
const themes = ['dark-theme', 'blue-theme', 'green-theme', 'green-theme', 'purple-theme', 'orange-theme', 'pink-theme', 'gray-theme']; //Array de temas (en themes.css)

// Función para cambiar el tema
function changeTheme(themeName) {
    document.body.classList.remove(...themes); // Elimina todas las clases de tema existentes
    document.body.classList.add(themeName); // Añade la nueva clase de tema
}

function getRandomTheme() {
    return themes[Math.floor(Math.random() * themes.length)];
}

function showTryMeMessage() {
    tryMeMessage.style.display = 'inline';
    localStorage.setItem('messageShown', 'true'); 
}

function hideTryMeMessage() {
    tryMeMessage.style.display = 'none';
}

// Evento click en el logo
logo.addEventListener('click', () => {
    const randomTheme = getRandomTheme();
    changeTheme(randomTheme);

    // Ocultar el mensaje después del primer click
    hideTryMeMessage();
});


// Mostrar el mensaje "Intenta presionarme" si es la primera vez
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('messageShown') === null) {
        showTryMeMessage();

        // Ocultar el mensaje después de unos segundos (opcional)
        setTimeout(hideTryMeMessage, 5000); // 5 segundos
    }
});
