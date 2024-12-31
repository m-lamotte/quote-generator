const parentContainer = document.getElementById('container');
const quoteContainer = document.getElementById('quote-card');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const laoder = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    parentContainer.hidden = true;
}

// setTimeout will keep the loader going for 1.3s until it ends
function removeLoadingSpinner() {

    setTimeout(function() {
        parentContainer.hidden = false;
        loader.hidden = true;
      }, 1300);

}

// Show new quote
function newQuote() {

    showLoadingSpinner();

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Sets author as 'Unknown Author' if it's null, otherwise using the author
    if (quote.author === null) {
        authorText.textContent = 'Unknown Author';
    }
    else {
        authorText.textContent = quote.author;
    }
   
    // Will add (and thus apply) 'long-quote' css to 'quote' if longer than 80 chars
    if (quote.text.length > 80) {
        quoteText.classList.add('long-quote');
    }
    else {
        quoteText.classList.remove('long-quote');
    }

    // Set quote, hide loadee
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get quotes from API
// Asynchronous fetch request within a try-catch statement
async function getQuotes() {

    showLoadingSpinner();

    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try {
        // will not initialize 'response' until the entire API has been fetched
        const response = await fetch(apiUrl);

        // converting the response to JSON
        apiQuotes = await response.json();
        newQuote();
    }
    catch (error) {
        console.log('Not goin\' good');
    }
}

// Tweet quote
function tweetQuote() {

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners 
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

// On load
showLoadingSpinner();
getQuotes();