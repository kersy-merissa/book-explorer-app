// ==========================================
// LAB 2: SAMPLE BOOKS (Mock Data for Default View)
// ==========================================
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
    }
];

// ==========================================
// LAB 3: API INTEGRATION & SEARCH FUNCTIONALITY
// ==========================================

// 1. Select DOM elements from HTML
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('resultsContainer');

// 2. Add click event listener to the search button
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        
        // Validate if input is empty
        if (query === '') {
            alert('Please type a book title first!');
            return;
        }

        // Call function to fetch data from API
        fetchBooksFromAPI(query);
    });
}

// 3. Asynchronous function to fetch data from Open Library API
async function fetchBooksFromAPI(bookTitle) {
    try {
        // Show loading state while fetching
        resultsContainer.innerHTML = '<p class="text-center col-span-2 text-gray-500">Searching books...</p>';

        // Fetch data from external API safely using encodeURIComponent
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(bookTitle)}`);
        const data = await response.json();

        // Display the first 6 results on the UI
        displayBooks(data.docs.slice(0, 6));

    } catch (error) {
        // Handle any network or API errors gracefully
        console.error('Error fetching books:', error);
        resultsContainer.innerHTML = '<p class="text-red-500 text-center col-span-2">Failed to load books. Check your internet connection.</p>';
    }
}

// 4. Function to render books dynamically on the screen
function displayBooks(books) {
    // Clear previous results container
    resultsContainer.innerHTML = '';

    // Check if books array is empty or undefined
    if (!books || books.length === 0) {
        resultsContainer.innerHTML = '<p class="text-gray-500 text-center col-span-2">No books found matching your search.</p>';
        return;
    }

    // Loop through each book and create a card element
    books.forEach(book => {
        const title = book.title || 'Unknown Title';
        const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
        const year = book.first_publish_year || 'N/A';

        // Create a card div using Tailwind CSS classes
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded shadow border border-gray-200';

        // Insert book info into the card using template literals
        card.innerHTML = `
            <h4 class="font-bold text-blue-600 text-lg">${title}</h4>
            <p class="text-gray-600 text-sm mt-1">Author: ${author}</p>
            <p class="text-gray-400 text-xs mt-1">First Published: ${year}</p>
        `;

        // Append the card to the results container on the web page
        resultsContainer.appendChild(card);
    });
}

// Display sample books by default when the page first loads (Lab 2 requirement)
displayBooks(sampleBooks);