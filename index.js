const moviesEl = document.getElementById("movies");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const modeEl = document.getElementById("mode");

let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];


let foundMovie;
async function getMovies(movieName = "ninja") {
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=13103cab&s=${movieName}&plot=full`);
        if (!res.ok) {
            throw Error("No movie found!")
        }
        data = await res.json();
        moviesEl.innerHTML = ""
        data.Search.forEach(item => {
            fetch(`https://www.omdbapi.com/?apikey=13103cab&i=${item.imdbID}`)
                .then(res => res.json())
                .then(movie => {
                    moviesEl.innerHTML += `
                    <div class="movie">
                    <img src="${movie.Poster}" class="movie-poster"> 
                    <div class="info">
                        <div class="title-rate">
                            <h2>${movie.Title}</h2>
                            <span class="rate">
                            <i class="bi bi-star-fill"></i>
                            ${movie.imdbRating}
                            </span>
                        </div>
                        <div class="sub-info">
                            <p>${movie.Runtime}</p>
                            <p>${movie.Genre}</p>
                            <button class="watchlist-btn" data-movie=${JSON.stringify(movie.imdbID)}>
                                <i class="bi bi-plus-circle-fill"></i>
                                Watchlist
                                </button>
                                </div>
                                <p class="story">${movie.Plot}</p>
                                </div>
                                </div>
                                `
                })
        });
    } catch (err) {
        console.log(err)
    }
}
getMovies()

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = searchInput.value;
    if (searchTerm) {
        getMovies(searchTerm);
        searchInput.value = "";
    }
});

document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("watchlist-btn")) {
        const imdbID = e.target.dataset.movie;

        if (watchlist.some(movie => movie.imdbID === imdbID)) {
            return;
        }

        try {
            const res = await fetch(`https://www.omdbapi.com/?apikey=13103cab&i=${imdbID}&plot=full`);
            if (!res.ok) {
                throw new Error("No movie found!");
            }
            const movieData = await res.json();
            watchlist.push(movieData);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    }
});


modeEl.addEventListener("click", () => {
    document.body.classList.toggle("light")
    document.getElementById("container").classList.toggle("light");
    document.querySelector("span.light").classList.toggle("active");
    document.querySelector("span.dark").classList.toggle("active");
})