document.addEventListener("DOMContentLoaded", function () {
    let currentLang = "en";
    currentLang = localStorage.getItem("selectedLanguage") || currentLang;
    const languageToggle = document.getElementById("language-toggle");

    document.body.style.visibility = "hidden";

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem("selectedLanguage", lang);
    
        document.querySelectorAll("[data-en], [data-es]").forEach(element => {
            const key = element.hasAttribute(`data-${lang}`) ? `data-${lang}` : "data-en";
            element.textContent = element.getAttribute(key);
        });
    
        languageToggle.textContent = lang === "en" ? "🇨🇱 Esp" : "🇬🇧 Eng";    
        document.body.style.visibility = "visible";
    }

    languageToggle.addEventListener("click", function () {
        currentLang = currentLang === "en" ? "es" : "en";
        setLanguage(currentLang);
    });

    setLanguage(currentLang);


    function alternateName() {
        const title = document.getElementById('title');
        const originalSpanishName = title.dataset.es;
        const originalEnglishName = title.dataset.en;
        const englishNickname = "I'm Zprit3";
        const spanishNickname = "Soy Zprit3";
    
        title.style.transition = 'opacity 0.5s ease-in-out'; // Agregar transición CSS
        title.style.opacity = 0;
    
        setTimeout(() => { // Usar setTimeout para simular el requestAnimationFrame
            if (title.textContent === originalSpanishName) {
                title.textContent = spanishNickname;
            } else if (title.textContent === originalEnglishName) {
                title.textContent = englishNickname;
            } else if (title.textContent === englishNickname) {
                title.textContent = originalEnglishName;
            } else if (title.textContent === spanishNickname) {
                title.textContent = originalSpanishName;
            }
    
            title.style.opacity = 1;
        }, 500); // Pequeño retraso para que la opacidad 0 sea visible
    }
    
    setInterval(alternateName, 5000);

});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


document.querySelector('.contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            alert('¡Mensaje enviado con éxito!');
            form.reset();
        } else {
            alert('Hubo un problema al enviar el mensaje. Intenta de nuevo.');
        }
    } catch (error) {
        alert('Error al conectar con el servidor.');
    }
});