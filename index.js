const moviesEl = document.getElementById("movies");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const modeEl = document.getElementById("mode");

let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];


let foundMovie;
async function getMovies(movieName = "impossible") {
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=13103cab&s=${movieName}&plot=full`);
        if (!res.ok) {
            throw Error("No movie found!")
        }
        let data = await res.json();
        moviesEl.innerHTML = ""
        data.Search.forEach(async item => {
            let newData = await fetch(`https://www.omdbapi.com/?apikey=13103cab&i=${item.imdbID}`)
            let movie = await newData.json()
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
                                <button class="btn watchlist-btn" data-movie=${JSON.stringify(movie.imdbID)}>
                                    <i class="bi bi-plus-circle-fill"></i>
                                    Watchlist
                                </button>
                            </div>
                            <p class="story">${movie.Plot}</p>
                        </div>
                    </div>
                    `
                })
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
        e.target.disabled = true;

        if (watchlist.some(movie => movie.imdbID === imdbID)) {
            Swal.fire({
                title: "Ohoo ",
                text: "Movie already exists in watchlist!",
                icon: "error"
            });
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
            Swal.fire({
                title: "Success",
                text: "Movie added to watchlist!",
                icon: "success"
              });
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    }
});


modeEl.addEventListener("click", () => {
    if(!localStorage.getItem("mode")){
        localStorage.setItem("mode", "light")
        console.log("added")
    } else {
        localStorage.setItem("mode", "");
        console.log("deleted")
    }
    document.body.className = (localStorage.getItem("mode"));
    document.querySelector("span.light").classList.toggle("active");
    document.querySelector("span.dark").classList.toggle("active");
})
document.body.className = (localStorage.getItem("mode"));

window.addEventListener('scroll', function() {
    var stickyElement = document.getElementById('search-form');
    var rect = stickyElement.getBoundingClientRect();

    if (rect.top <= 0 && rect.bottom > 0) {
      stickyElement.style.backgroundColor = '#008DDA'; // Change background color when in sticky mode
    } else {
      stickyElement.style.backgroundColor = 'transparent'; // Reset background color when not in sticky mode
    }
  });