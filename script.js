// ==========================================
// 1. CONTADOR DE TEMPO (Desde 16/08/2025)
// ==========================================

const dataInicio = new Date("2025-08-16T00:00:00").getTime();

function atualizarContador() {
    const agora = new Date().getTime();
    const diferenca = agora - dataInicio;

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    const elementoContador = document.getElementById("contador");
    
    if (diferenca > 0) {
        elementoContador.innerHTML = 
            `${dias} dias, ${horas} horas, ${minutos} min e ${segundos} seg`;
    } else {
        elementoContador.innerHTML = "Contando os segundos para começar...";
    }
}
setInterval(atualizarContador, 1000);
atualizarContador();

// ==========================================
// 2. MAPA (Leaflet.js)
// ==========================================
const lat = -23.5315; 
const lng = -46.6694;
const map = L.map('map').setView([lat, lng], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([lat, lng]).addTo(map)
    .bindPopup('<b>Onde tudo começou... ❤️</b><br>Parque da Água Branca')
    .openPopup();

// ==========================================
// 3. PLAYER DE MÚSICA & INTERAÇÕES
// ==========================================
const musica = new Audio('musica.mp3'); 
const playBtn = document.querySelector('.play-icon');
const headerPlayBtn = document.querySelector('.btn-play');
let isPlaying = false;

function togglePlay() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        musica.play();
        playBtn.classList.remove('fa-play-circle');
        playBtn.classList.add('fa-pause-circle');
        headerPlayBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
    } else {
        musica.pause();
        playBtn.classList.add('fa-play-circle');
        playBtn.classList.remove('fa-pause-circle');
        headerPlayBtn.innerHTML = '<i class="fas fa-play"></i> Tocar';
    }
}

musica.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
});

playBtn.addEventListener('click', togglePlay);
headerPlayBtn.addEventListener('click', togglePlay);

// ==========================================
// 4. EASTER EGGS (OS SEGREDOS)
// ==========================================

// SEGREDO 1: Chuva de Corações ao clicar no botão de Like
const heartBtn = document.querySelector('.btn-heart');

function criarCoracao() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '💚'; // Coração verde Spotify (pode mudar pra ❤️)
    
    // Posição aleatória na largura da tela
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Tamanho aleatório
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    
    // Duração aleatória
    heart.style.animationDuration = (Math.random() * 2 + 1) + 's';
    
    document.body.appendChild(heart);
    
    // Remove o elemento depois da animação
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

heartBtn.addEventListener('click', function() {
    // Muda o ícone
    const icon = this.querySelector('i');
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
    } else {
        icon.classList.toggle('text-danger');
    }
    
    // Dispara 15 corações
    for(let i=0; i<15; i++) {
        setTimeout(criarCoracao, i * 100);
    }
    
    alert("Te amo! ❤️");
});

// SEGREDO 2: Muda o título da aba quando ela sai
let tituloOriginal = document.title;
window.addEventListener('blur', () => {
    document.title = "Volta aqui tonhão!";
});

window.addEventListener('focus', () => {
    document.title = tituloOriginal;
});

// SEGREDO 3: Clique no título muda o texto
const tituloPrincipal = document.querySelector('.playlist-info h1');
tituloPrincipal.style.cursor = "pointer"; // Mostra que é clicável

tituloPrincipal.addEventListener('click', () => {
    if (tituloPrincipal.innerText === "Nossa História ❤️") {
        tituloPrincipal.innerText = "Para Sempre Nós 💍";
    } else {
        tituloPrincipal.innerText = "Nossa História ❤️";
    }
});
// ==========================================
// MAIS EASTER EGGS (Vinil, Digitação e Double Click)
// ==========================================

// SEGREDO 4: Modo Vinil (Clica na capa e ela gira)
const albumCapa = document.querySelector('.album-cover img');

albumCapa.addEventListener('click', () => {
    // Adiciona ou remove a classe que faz girar
    albumCapa.classList.toggle('spinning');
});

// SEGREDO 5: Double Click (Coração onde clicar)
document.addEventListener('dblclick', (e) => {
    const heart = document.createElement('div');
    heart.classList.add('click-heart');
    heart.innerHTML = '❤️'; // Pode ser 💚 também
    
    // Posiciona exatamente onde o mouse clicou
    heart.style.left = `${e.pageX}px`;
    heart.style.top = `${e.pageY}px`;
    
    document.body.appendChild(heart);
    
    // Remove depois que subir
    setTimeout(() => {
        heart.remove();
    }, 800);
});

// SEGREDO 6: Código Secreto (Digitar "teamo")
let codigoDigitado = '';
const codigoSecreto = 'teamo';

document.addEventListener('keydown', (e) => {
    // Adiciona a letra digitada
    codigoDigitado += e.key;
    
    // Se a pessoa digitou a sequência certa
    if (codigoDigitado.includes(codigoSecreto)) {
        alert('Eu também te amo muito! 💑');
        codigoDigitado = ''; // Reseta
    }
    
    // Limpa se ficar muito longo pra não travar
    if (codigoDigitado.length > 20) {
        codigoDigitado = codigoDigitado.slice(-10);
    }
});