// Declaration
const inputEl = document.getElementById('input');
const infoTextEl = document.getElementById('info-text');
const meaningContainerEl = document.getElementById('meaning-container');
const titleEl = document.getElementById('title');;
const meaningEl = document.getElementById('meaning');
const audioEl = document.getElementById('audio');
const loaderEl = document.getElementsByClassName('loader');


// Event Listeners
inputEl.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.key === "Enter" && e.target.value) {
        fetchAPI(e.target.value);
        inputEl.innerHTML = "";
    }
})


// Functions


async function fetchAPI(word) {

    try {
        meaningContainerEl.style.display = "none";
        infoTextEl.style.display = "block"
        infoTextEl.innerText = `Searching the meaning of "${word}"`;
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res) => res.json())


        // If word not found
        if (result.title) {
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            titleEl.innerText = word;
            meaningEl.innerText = "Not Available";
            audioEl.style.display = 'none';
        } else {

            // Showing meaing sectoin
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";

            audioEl.style.display = "inline-flex"

            // Showing title
            titleEl.style.color = 'rgb(210 0 0)';
            titleEl.style.fontSize = '1.2rem';
            titleEl.style.fontWeight = 'bold';
            titleEl.innerText = result[0].word;

            // Fetching Meaning
            meaningEl.style.color = 'rgb(210 0 0)';
            meaningEl.style.fontSize = '1.2rem';
            meaningEl.style.fontWeight = 'bold';
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;

            // Fetching Audio
            audioEl.src = result[0].phonetics[0].audio;
        }



    } catch (error) {
        infoTextEl.innerText = `an error occurred try again after sometimes`;
        console.log(error);
    }
} 