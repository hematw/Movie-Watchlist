const watchEl = document.getElementById("watchlist");
const modeEl = document.getElementById("mode");
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

let a = []
a.length
renderWatchlist(watchlist)

function renderWatchlist(movies) {
    
    if(movies.length) {
        watchEl.innerHTML = "";
        movies.forEach(movie => {
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
                <button class="btn remove-btn" data-movie=${JSON.stringify(movie.imdbID)}>
                <i class="bi bi-trash3-fill"></i>
                Remove
                </button>
                </div>
            <p class="story">${movie.Plot.slice(0, 230)}</p>
            </div>
            </div>
            `
        });
    } else {
        watchEl.innerHTML = `
                    <div class="empty-watchlist">
                        <p>Your watchlist is covered with</p>
                        <h1>spider webs :(</h1>
                        <img src="images/spider.png"/>
                        <p>Time to fill it up with some cinematic gems!" 🍿✨
                            <a href="index.html">Add movie</a>
                        </p>
                    </div>`
    } 
}

document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("remove-btn")) {
        const imdbID = e.target.dataset.movie;
        
        watchlist = watchlist.filter(movie => {
            return movie.imdbID != imdbID;
        })
        
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        Swal.fire({
            title: "Success",
            text: "Movie removed from watchlist!",
            icon: "success"
        });
        renderWatchlist(watchlist)
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
