// Datos ficticios de hoteles
const hotels = [
    {
        id: 1,
        name: "Hotel Vista Mar",
        stars: 5,
        price: 180,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop",
        tags: ["Vista al mar", "Piscina", "Spa", "Wifi"]
    },
    {
        id: 2,
        name: "Boutique Palace",
        stars: 4,
        price: 120,
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&h=300&fit=crop",
        tags: ["Boutique", "Centro", "Desayuno", "Wifi"]
    },
    {
        id: 3,
        name: "Resort Paradise",
        stars: 5,
        price: 250,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&h=300&fit=crop",
        tags: ["All Inclusive", "Playa privada", "Spa", "Kids Club"]
    },
    {
        id: 4,
        name: "Urban Loft",
        stars: 3,
        price: 85,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&h=300&fit=crop",
        tags: ["Moderno", "Centro", "Wifi", "Pet Friendly"]
    },
    {
        id: 5,
        name: "Mountain Lodge",
        stars: 4,
        price: 140,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=300&fit=crop",
        tags: ["Montaña", "Chimenea", "Senderismo", "Naturaleza"]
    },
    {
        id: 6,
        name: "Sunset Beach Hotel",
        stars: 5,
        price: 220,
        image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=500&h=300&fit=crop",
        tags: ["Vista al mar", "Playa privada", "Piscina infinita", "Romántico"]
    },
    {
        id: 7,
        name: "City Express",
        stars: 3,
        price: 70,
        image: "https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=500&h=300&fit=crop",
        tags: ["Económico", "Centro", "Wifi", "Business"]
    },
    {
        id: 8,
        name: "Eco Retreat",
        stars: 4,
        price: 160,
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=500&h=300&fit=crop",
        tags: ["Ecológico", "Yoga", "Orgánico", "Naturaleza"]
    },
    {
        id: 9,
        name: "Grand Royale",
        stars: 5,
        price: 300,
        image: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=500&h=300&fit=crop",
        tags: ["Lujo", "Casino", "Spa", "Gourmet"]
    },
    {
        id: 10,
        name: "Cozy Hostel",
        stars: 3,
        price: 45,
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&h=300&fit=crop",
        tags: ["Económico", "Social", "Wifi", "Backpackers"]
    }
];

// Variables globales
let currentIndex = 0;
let userName = "";
let userEmail = "";
let likedHotels = [];
let dislikedHotels = [];

// Elementos del DOM
const welcomeScreen = document.getElementById('welcome-screen');
const swipeScreen = document.getElementById('swipe-screen');
const resultsScreen = document.getElementById('results-screen');
const welcomeForm = document.getElementById('welcome-form');
const hotelCard = document.getElementById('hotel-card');
const btnLike = document.getElementById('btn-like');
const btnDislike = document.getElementById('btn-dislike');
const btnRestart = document.getElementById('btn-restart');

// Iniciar app
welcomeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    userName = document.getElementById('user-name').value;
    userEmail = document.getElementById('user-email').value;
    
    welcomeScreen.classList.remove('active');
    swipeScreen.classList.add('active');
    
    showCurrentHotel();
});

// Mostrar hotel actual
function showCurrentHotel() {
    if (currentIndex >= hotels.length) {
        showResults();
        return;
    }

    const hotel = hotels[currentIndex];
    
    document.getElementById('hotel-image').src = hotel.image;
    document.getElementById('hotel-name').textContent = hotel.name;
    document.getElementById('hotel-stars').textContent = '⭐'.repeat(hotel.stars);
    document.getElementById('hotel-price').textContent = `$${hotel.price}/noche`;
    
    const tagsContainer = document.getElementById('hotel-tags');
    tagsContainer.innerHTML = '';
    hotel.tags.forEach(tag => {
        const tagEl = document.createElement('span');
        tagEl.className = 'tag';
        tagEl.textContent = tag;
        tagsContainer.appendChild(tagEl);
    });
    
    document.getElementById('current-hotel').textContent = currentIndex + 1;
    document.getElementById('total-hotels').textContent = hotels.length;
    
    // Resetear posición de la tarjeta
    hotelCard.style.transform = '';
    hotelCard.style.opacity = '1';
    hotelCard.classList.remove('swipe-left', 'swipe-right', 'swiping');
}

// Función de swipe
function swipe(direction) {
    const hotel = hotels[currentIndex];
    
    if (direction === 'right') {
        likedHotels.push(hotel);
        hotelCard.classList.add('swipe-right');
    } else {
        dislikedHotels.push(hotel);
        hotelCard.classList.add('swipe-left');
    }
    
    setTimeout(() => {
        currentIndex++;
        showCurrentHotel();
    }, 500);
}

// Event listeners para botones
btnLike.addEventListener('click', () => swipe('right'));
btnDislike.addEventListener('click', () => swipe('left'));

// Swipe con mouse/touch
let startX = 0;
let currentX = 0;
let isDragging = false;

hotelCard.addEventListener('mousedown', startDrag);
hotelCard.addEventListener('touchstart', startDrag);

document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag);

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

function startDrag(e) {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    hotelCard.classList.add('swiping');
}

function drag(e) {
    if (!isDragging) return;
    
    currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const diff = currentX - startX;
    const rotation = diff / 20;
    
    hotelCard.style.transform = `translateX(${diff}px) rotate(${rotation}deg)`;
    hotelCard.style.opacity = 1 - Math.abs(diff) / 300;
}

function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    
    const diff = currentX - startX;
    
    if (Math.abs(diff) > 100) {
        swipe(diff > 0 ? 'right' : 'left');
    } else {
        hotelCard.style.transform = '';
        hotelCard.style.opacity = '1';
    }
    
    hotelCard.classList.remove('swiping');
}

// Mostrar resultados
function showResults() {
    swipeScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    document.getElementById('result-name').textContent = userName;
    
    const recommendationsList = document.getElementById('recommendations-list');
    recommendationsList.innerHTML = '';
    
    // Top 5 de hoteles que le gustaron
    const topRecommendations = likedHotels.slice(0, 5);
    
    if (topRecommendations.length === 0) {
        recommendationsList.innerHTML = '<p style="text-align: center; color: #666;">No seleccionaste ningún hotel 😢<br>Intenta de nuevo!</p>';
    } else {
        topRecommendations.forEach((hotel, index) => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            card.style.animationDelay = `${index * 0.1}s`;
            card.innerHTML = `
                <img src="${hotel.image}" alt="${hotel.name}">
                <div class="recommendation-info">
                    <h4>${hotel.name}</h4>
                    <div class="stars">${'⭐'.repeat(hotel.stars)}</div>
                    <div class="price">$${hotel.price}/noche</div>
                </div>
            `;
            recommendationsList.appendChild(card);
        });
    }
}

// Reiniciar
btnRestart.addEventListener('click', () => {
    currentIndex = 0;
    likedHotels = [];
    dislikedHotels = [];
    
    resultsScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
    
    document.getElementById('user-name').value = '';
    document.getElementById('user-email').value = '';
});
