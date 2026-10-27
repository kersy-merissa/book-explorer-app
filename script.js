JavaScript
// ==========================================
// BOOK EXPLORER - LAB 2: INTERACTIVE UI
// ==========================================

// 1. Select the HTML elements we need to work with
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const booksContainer = document.getElementById('books-container');

// 2. Sample books list (Mock data)
// This simulates data before connecting to a real API in later labs
const sampleBooks = [
  { title: "JavaScript for Beginners", author: "John Doe", year: 2023 },
  { title: "Mastering Tailwind CSS", author: "Jane Smith", year: 2024 },
  { title: "Building Modern Web Apps", author: "Alex Johnson", year: 2025 }
];

// 3. Function to display books on the webpage
function displayBooks(booksArray) {
  // Clear the container first so old results do not duplicate
  booksContainer.innerHTML = "";

  // Check if the books list is empty
  if (booksArray.length === 0) {
    booksContainer.innerHTML = "<p class='text-gray-500 text-center'>No books found matching your search.</p>";
    return;
  }

  // Loop through each book and create a card for it
  booksArray.forEach(book => {
    const bookCard = document.createElement('div');
    
    // Add Tailwind CSS styling classes to the card
    bookCard.className = "bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200";

    // Insert book details inside the card
    bookCard.innerHTML = `
      <h3 class="text-lg font-bold text-blue-600">${book.title}</h3>
      <p class="text-sm text-gray-700">Author: ${book.author}</p>
      <p class="text-xs text-gray-500">Year: ${book.year}</p>
    `;

    // Add the created card into the main books container on the page
    booksContainer.appendChild(bookCard);
  });
}

// 4. Add a click event listener to the search button
searchButton.addEventListener('click', function () {
  // Get what the user typed, make it lowercase, and remove extra spaces
  const searchTerm = searchInput.value.toLowerCase().trim();

  // Filter books based on the title or author matching the search term
  const filteredBooks = sampleBooks.filter(book => 
    book.title.toLowerCase().includes(searchTerm) || 
    book.author.toLowerCase().includes(searchTerm)
  );

  // Show the filtered results on the screen
  displayBooks(filteredBooks);
});

// Display all books by default when the page first loads
displayBooks(sampleBooks);
// 1. SELECT DOM ELEMENTS
// Grab the search input, search button, and results container from the HTML.
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('resultsContainer');

// 2. ADD EVENT LISTENER TO THE SEARCH BUTTON
// Triggers the search action when the user clicks the search button.
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        
        // Validate if the input field is empty
        if (query === '') {
            alert('Please enter a book title before searching!');
            return;
        }

        // Call the function to fetch books from the Open Library API
        fetchBooksFromAPI(query);
    });
}

// 3. FETCH BOOKS FROM API (Async/Await & Fetch)
// Uses asynchronous JavaScript to request book data from the external Open Library API.
async function fetchBooksFromAPI(bookTitle) {
    try {
        // Display a loading message while fetching data
        resultsContainer.innerHTML = '<p class="text-center col-span-2 text-gray-500">Searching for books...</p>';

        // Request data using Fetch API and encode the user's query for URL safety
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(bookTitle)}`);
        const data = await response.json();

        // Limit the results to the first 6 books for a clean user interface
        displayBooks(data.docs.slice(0, 6));

    } catch (error) {
        // Handle network or API errors gracefully
        console.error('Error fetching data:', error);
        resultsContainer.innerHTML = '<p class="text-red-500 text-center col-span-2">Failed to fetch books. Please check your internet connection.</p>';
    }
}

// 4. DISPLAY BOOKS ON THE UI
// Loops through the fetched books array and builds HTML cards dynamically.
function displayBooks(books) {
    // Clear any previous results
    resultsContainer.innerHTML = '';

    // Handle case where no books are found
    if (books.length === 0) {
        resultsContainer.innerHTML = '<p class="text-gray-500 text-center col-span-2">No books found matching your search.</p>';
        return;
    }

    // Loop through each book object using forEach
    books.forEach(book => {
        const title = book.title || 'Unknown Title';
        const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
        const year = book.first_publish_year || 'N/A';

        // Create a new card element for each book
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md transition';

        // Insert book details into the card using template literals
        card.innerHTML = `
            <h3 class="font-bold text-lg text-blue-700">${title}</h3>
            <p class="text-gray-600 text-sm mt-1">Author: <span class="font-medium">${author}</span></p>
            <p class="text-gray-500 text-xs mt-1">First Published: ${year}</p>
        `;

        // Append the created card to the results container on the page
        resultsContainer.appendChild(card);
    });
}