import "./style.css"

const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader")
const container = document.getElementById("container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")

let apiQuotes = []

function loading() {
  loader.hidden = false
  container.hidden = true
}

function complete() {
  loader.hidden = true
  container.hidden = false
  console.log("complete")
}

function newQuote() {
  loading()
  const randomIndex = Math.floor(Math.random() * apiQuotes.length)
  const quote = apiQuotes[randomIndex]

  if (!quote) {
    alert("no quote")
    return
  }

  if (!quote.author) {
    authorText.textContent = "Unknown"
  } else {
    authorText.textContent = quote.author
  }

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote")
  } else {
    quoteText.classList.remove("long-quote")
  }

  quoteText.textContent = quote.text
  complete()
}

async function getQuotes() {
  loading()
  const apiUrl = "https://type.fit/api/quotes"
  try {
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
    newQuote()
  } catch (error) {
    console.log(error)
    // Catch Error Here
  }
}

getQuotes()

newQuoteBtn.addEventListener("click", newQuote)
