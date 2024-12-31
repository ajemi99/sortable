let tbody = document.getElementById('tbody');
// let allTh = document.querySelectorAll('th');
let currentPage = 1;
let pageSize = 20;
let totalPages = 1;
let heroesData = [];
let filteredData = [];

// Charger les données des héros et initialiser la pagination
const loadData = heroes => {
    heroesData = heroes;
    filteredData = heroesData;
    updateTotalPages();
    displayPage();
};

// Met à jour le nombre total de pages
const updateTotalPages = () => {
    if (pageSize === 'all') {
        totalPages = 1;
    } else {
        totalPages = Math.ceil(filteredData.length / pageSize);
    }
};

// Affiche les héros pour la page courante
const displayPage = () => {
    tbody.innerHTML = '';

    let start = (currentPage - 1) * pageSize;
    let end = pageSize === 'all' ? filteredData.length : start + pageSize;

    const currentHeroes = filteredData.slice(start, end);
    currentHeroes.forEach(element => {
        let tr = document.createElement('tr');
        tr.dataset.find = element.name;
        appendchild(tr, `<img src="${element.images.xs}" alt="" srcset="">`);
        appendchild(tr, element.name);
        appendchild(tr, element.biography.fullName || '');
        appendchild(tr, element.powerstats.intelligence ?? '');
        appendchild(tr, element.powerstats.strength ?? '');
        appendchild(tr, element.powerstats.speed ?? '');
        appendchild(tr, element.powerstats.durability ?? '');
        appendchild(tr, element.powerstats.power ?? '');
        appendchild(tr, element.powerstats.combat ?? '');
        appendchild(tr, element.appearance.race || 'Unknown');
        appendchild(tr, element.appearance.gender);
        appendchild(tr, element.appearance.height[1] || 'Unknown');
        appendchild(tr, element.appearance.weight[1] || 'Unknown');
        appendchild(tr, element.biography.placeOfBirth || 'Unknown');
        appendchild(tr, element.biography.alignment);

        tbody.appendChild(tr);
    });

    document.getElementById('pageInfo').innerText = `Page ${currentPage} of ${totalPages}`;
};

// Gestion de la sélection du nombre d'éléments par page
document.getElementById('pageSize').addEventListener('change', (e) => {
    const selectedSize = e.target.value;
    pageSize = selectedSize === 'all' ? 'all' : parseInt(selectedSize, 10);
    currentPage = 1;
    updateTotalPages();
    displayPage();
});

// Pagination : bouton page suivante
document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        displayPage();
    }
});

// Pagination : bouton page précédente
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayPage();
    }
});

// Fonction de recherche
function search() {
    let input = document.getElementById('searchInput').value.toUpperCase();
    filteredData = heroesData.filter(hero => {
        return hero.name.toUpperCase().includes(input);
    });

    updateTotalPages();
    currentPage = 1;
    displayPage();
}


// Fonction utilitaire pour créer et ajouter des cellules
function appendchild(parent, value) {
    let td = document.createElement('td');
    td.innerHTML = value;
    parent.appendChild(td);
}


// Charger les données des héros depuis l'API
fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
    .then((response) => response.json())
    .then(loadData)
    .catch(error => console.log(error));