const parentContainer = document.getElementById('container');
const quoteContainer = document.getElementById('quote-card');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const laoder = document.getElementById('loader');

let apiQuotes = [];

// Show the loader
function loading() {
    loader.hidden = false;
    parentContainer.hidden = true;
}

// Hide the loader - setTimeout will keep the loader going for 1.3s until it ends
function loadingComplete() {

    setTimeout(function() {
        parentContainer.hidden = false;
        loader.hidden = true;
      }, 1300);

}

// Show new quote
function newQuote() {

    loading();

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
    loadingComplete();
}

// Get quotes from API
// Asynchronous fetch request within a try-catch statement
async function getQuotes() {

    loading();

    const apiUrl = 'https://type.fit/api/quotes';

    try {
        // will not initialize 'response' until the entire API has been fetched
        const response = await fetch(apiUrl);

        // converting the response to JSON
        apiQuotes = await response.json();
        newQuote();
    }
    catch (error) {
        // Catch error
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
loading()
getQuotes();