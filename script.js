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