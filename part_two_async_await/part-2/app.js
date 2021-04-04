/* Question 1
    Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).


async function getACard(){
    let baseURL = "https://deckofcardsapi.com/api/deck";
    let {data} = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
    let res = await axios.get(`${baseURL}/${data.deck_id}/draw/?count=1`)
    console.log(`${res.data.cards[0].value.toLowerCase()} of  ${res.data.cards[0].suit.toLowerCase()}`);
}

getACard();
*/


/*Question 2
    Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

    Once you have both cards, console.log the values and suits of both cards.


async function getACard(){
    let baseURL = "https://deckofcardsapi.com/api/deck";
    let {data} = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
    let res = await axios.get(`${baseURL}/${data.deck_id}/draw/?count=1`)
    let res2 = await axios.get(`${baseURL}/${data.deck_id}/draw/?count=1`)
    console.log(`${res.data.cards[0].value.toLowerCase()} of  ${res.data.cards[0].suit.toLowerCase()}`);
    console.log(`${res2.data.cards[0].value.toLowerCase()} of  ${res2.data.cards[0].suit.toLowerCase()}`);
}

getACard();
*/


/* Question 3
    Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.
*/

let baseURL = "https://deckofcardsapi.com/api/deck";
let deckID

async function getNewDeck(){
    let {data} = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
    deckID = data.deck_id
}

getNewDeck();

$('.btn').click(async function(){
        let {data} = await axios.get(`${baseURL}/${deckID}/draw/?count=1`);
        let image = data.cards[0].images.png;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $('#cardTable').append(
            $(`<img src=${image} alt="Playing card" height="150" width="100" 
            style="transform: translate(${randomX}px, ${randomY}px) rotate(${angle}deg)"</>`))
        console.log(`${data.cards[0].value.toLowerCase()} of ${data.cards[0].suit.toLowerCase()}`); 
        if (data.remaining === 0){
            $('.btn').remove()
        };        
});