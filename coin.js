const url = 'https://api.coindesk.com/v1/bpi/currentprice.json'
const priceTag = document.querySelector('h1')
const spanTag = document.querySelector('span.curSelector')
let currency = 'USD'

const checkPrice = function () {
  fetch(url)
    // get the response and parse it as a json file
    .then((response) => response.json())
    .then((data) => {
      // toFixed rounds to x decimals
      // we can't put variables directly into our code, so we use square brackets instead
      priceTag.innerHTML = data.bpi[currency].rate_float.toFixed(1)
    })
}

// run on load
checkPrice()

// loop over every nav link and add a click event
const navLinks = document.querySelectorAll('nav a')
navLinks.forEach((link) => {
  link.addEventListener('click', function () {
    currency = this.getAttribute('data-currency')
    checkPrice()
    // remove ALL previous selected states
    navLinks.forEach((link) => {
      link.classList.remove('selected')
    })

    // only add for the clicked link
    this.classList.add('selected')

    // update span tag accordingly
    spanTag.innerHTML = currency
  })
})

// check the price every 60 seconds
// setTimeout would only run it once after 60 seconds
// setInterval happens EVERY 60 seconds
setInterval(function () {
  checkPrice()
}, 60000)
