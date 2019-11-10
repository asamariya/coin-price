const url = `https://api.coindesk.com/v1/bpi/currentprice`;
const priceTag = document.querySelector('h1');
const textEl = document.querySelector('#span');
let currency = 'AUD';

async function fetchPrice() {
	let response = await fetch(url + `/${currency}.json`);
	let data = await response.json();
	priceTag.innerHTML = data.bpi[currency].rate_float.toFixed(1);
}

// Run fetchPrice on load
fetchPrice();

// Loop over every nav link and add a click event
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
	link.addEventListener('click', function() {
		currency = this.getAttribute('data-currency');
		fetchPrice();
		span.innerHTML = currency;

		// remove all prev selected states
		navLinks.forEach(link => link.classList.remove('selected'));

		// an then only do it on the clicked link
		this.classList.add('selected');
	});
});

// check the price ever 60 seconds
setInterval(fetchPrice(), 60000);
