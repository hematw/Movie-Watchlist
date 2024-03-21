const moviesEl = document.getElementById("movies");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];


let foundMovie;
async function getMovies(movieName = "ninja") {
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=13103cab&t=${movieName}&plot=full`);
        if (!res.ok) {
            throw Error("No movie found!")
        }
        data = await res.json();
        let moviesHTML = ""
        moviesHTML += `
            <div class="movie">
                <img src="${data.Poster}" class="movie-poster"> 
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
                        <button class="watchlist-btn" data-movie=${JSON.stringify(data.imdbID)}>
                            <i class="bi bi-plus-circle-fill"></i>
                            Watchlist
                        </button>
                    </div>
                    <p class="story">${data.Plot.slice(0, 230)}</p>
                </div>
            </div>
            `

            moviesEl.innerHTML= moviesHTML;
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
    } else {
      window.location.reload();
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
