const watchEl = document.getElementById("watchlist");
const modeEl = document.getElementById("mode");
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];


watchlist.forEach(movie => {
    watchEl.innerHTML += `
    <div class="movie">
        <img src="${movie.Poster}" class=movie-poster> 
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
            </div>
            <p class="story">${movie.Plot.slice(0, 230)}</p>
        </div>
    </div>
    `
});



modeEl.addEventListener("click", () => {
    document.body.classList.toggle("light")
    document.getElementById("container").classList.toggle("light");
    document.querySelector("span.light").classList.toggle("active");
    document.querySelector("span.dark").classList.toggle("active");
})