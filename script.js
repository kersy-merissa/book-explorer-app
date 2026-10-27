// --- LAB 2: Sample Books Data & Default Display ---
const sampleBooks = [
    {
        title: "JavaScript: The Good Parts",
        author_name: ["Douglas Crockford"],
        first_publish_year: 2008
    },
    {
        title: "Eloquent JavaScript",
        author_name: ["Marijn Haverbeke"],
        first_publish_year: 2011
    },
    {
        title: "You Don't Know JS",
        author_name: ["Kyle Simpson"],
        first_publish_year: 2014
    }
];

// --- LAB 3: API Integration & Search Functionality ---

// 1. SELECT DOM ELEMENTS
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('resultsContainer');

// 2. EVENT LISTENER FOR SEARCH BUTTON
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        
        if (query === '') {
            alert('Please enter a book title before searching!');
            return;
        }

        fetchBooksFromAPI(query);
    });
}

// 3. FETCH BOOKS FROM OPEN LIBRARY API (Async/Await)
async function fetchBooksFromAPI(bookTitle) {
    try {
        resultsContainer.innerHTML = '<p class="text-center col-span-full text-gray-500 py-4">Searching for books...</p>';

        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(bookTitle)}`);
        const data = await response.json();

        displayBooks(data.docs.slice(0, 6));

    } catch (error) {
        console.error('Error fetching data:', error);
        resultsContainer.innerHTML = '<p class="text-red-500 text-center col-span-full py-4">Failed to fetch books. Please check your internet connection.</p>';
    }
}

// 4. DISPLAY BOOKS ON THE UI
function displayBooks(books) {
    resultsContainer.innerHTML = '';

    if (!books || books.length === 0) {
        resultsContainer.innerHTML = '<p class="text-gray-500 text-center col-span-full py-4">No books found matching your search.</p>';
        return;
    }

    books.forEach(book => {
        const title = book.title || 'Unknown Title';
        const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
        const year = book.first_publish_year || 'N/A';

        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md transition';

        card.innerHTML = `
            <h4 class="font-bold text-lg text-blue-700">${title}</h4>
            <p class="text-gray-600 text-sm mt-1">Author: <span class="font-medium">${author}</span></p>
            <p class="text-gray-500 text-xs mt-1">First Published: ${year}</p>
        `;

        resultsContainer.appendChild(card);
    });
}

// Display sample books by default when the page first loads (Lab 2 requirement)
displayBooks(sampleBooks);