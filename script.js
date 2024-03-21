const moviesEl = document.getElementById("movies");
let watchlist = localStorage.getItem("watchlist") || [];


let foundMovie;
async function getMovies() {
    try {
        const res = await fetch("https://www.omdbapi.com/?apikey=13103cab&s=war&plot=full");
        if (!res.ok) {
            throw Error("No movie found!")
        }
        data = await res.json();
        console.log(data.Search)
        foundMovie = data;
        moviesEl.innerHTML = `
            <div class="movie">
                <img src="${data.Poster}" class=movie-poster> 
                <div class="info">
                    <div class="title-rate">
                        <h2>${data.Title}</h2>
                        <span class="rate">
                            <i class="bi bi-star-fill"></i>
                            ${data.imdbRating}
                        </span>
                    </div>
                    <div class="sub-info">
                        <p>${data.Runtime}</p>
                        <p>${data.Genre}</p>
                        <button class="watchlist-btn" data-movie="${data.imdbID}">
                            <i class="bi bi-plus-circle-fill"></i>
                            Watchlist
                        </button>
                    </div>
                    <p class="story">${data.Plot.slice(0, 230)}</p>
                </div>
            </div>
            `
    } catch (err) {
        console.log(err)
    }
}
getMovies()


document.addEventListener("click", (e)=> {
    if(e.target.className == "watchlist-btn") {
        console.log("clicked")
        console.log(watchlist)
        watchlist = foundMovie.filter(movie => movie.id == e.target.dataset.movie);
        console.log(watchlist)
    }
})