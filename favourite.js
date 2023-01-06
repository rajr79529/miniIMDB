//JSON.parse will convet json object to regular object.
let favMovies = JSON.parse(localStorage.getItem("favMovies"));
const FavContent = document.getElementById("FavContent");
const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("input", handleSearchBar);

function handleSearchBar(event) {
   const filteredMovies = favMovies.filter((movie) => {
      if (
         movie.title
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
      ) {
         return movie;
      }
   });
   renderMovies(filteredMovies);
}

function renderMovies(movies) {
   FavContent.innerHTML = "";
   if (movies.length === 0) {
      let h1 = document.createElement("h1");
      h1.classList.add("noFavouriteList");
      h1.innerHTML = `<strong>No Favourite Movie to show</strong>`;
      FavContent.append(h1);
      return;
   }
   movies.map((movie) => {
      let li = document.createElement("li");
      li.innerHTML = `<strong id=${movie.imdbid}>${movie.title}</strong> <br><img id=${movie.imdbid} src=${movie.image}/>
        <br><button id=${movie.imdbid}>Remove from Fav</button>`;
      FavContent.append(li);
   });
   removeFavButtonListner();
   addMovieTileClickedListner();
}
renderMovies(favMovies);

function addMovieTileClickedListner() {
   const movieTiles = document.querySelectorAll("#FavContent li");
   movieTiles.forEach((movieTile) => {
      movieTile.addEventListener("click", handleMovieTileClick);
   });
}

function handleMovieTileClick(event) {
   let id = event.target.getAttribute("id");
   const selectedMovie = getMovieWithByID(id);
   var params = new URLSearchParams();
   params.append("movie", JSON.stringify(selectedMovie));
   var url = "/movie.html?" + params.toString();
   location.href = url;
}

function getMovieWithByID(id) {
   const selectedMovie = favMovies.find((movie) => {
      if (movie.imdbid === id) {
         return movie;
      }
   });
   return selectedMovie;
}

function removeFavButtonListner() {
   const removeButtons = document.querySelectorAll(
      "#FavContent li button"
   );
   removeButtons.forEach((button) => {
      button.addEventListener("click", handleRemoveButtonClick);
   });
}

function handleRemoveButtonClick(event) {
   event.stopPropagation();
   const buttonId = event.target.getAttribute("id");
   //   here filter will not work as it return array for single element
   //map and forEach will not work as it does not return.
   const selectedMovie = favMovies.find((movie) => {
      if (movie.imdbid === buttonId) {
         return movie;
      }
   });
   updateFavMovies(selectedMovie);
}

function updateFavMovies(selectedMovie) {
   const updatedfavMovies = favMovies.filter(function (movie) {
      if (movie.imdbid != selectedMovie.imdbid) {
         return movie;
      }
   });
   favMovies = updatedfavMovies;
   localStorage.removeItem("favMovies");
   localStorage.setItem("favMovies", JSON.stringify(updatedfavMovies));
   renderMovies(favMovies);
}
