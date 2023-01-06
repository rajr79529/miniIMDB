const movieContainer = document.getElementById("movieContainer");

var getMovies = (function getMovieFromQueryParam() {
   var params = new URLSearchParams(window.location.search);
   const movie = JSON.parse(params.get("movie"));
   showMovie(movie);
})();

function showMovie(movie) {
   movieContainer.innerHTML = "";
   console.log(movie);
   const {
      imdbid,
      year,
      title,
      image,
      description,
      genre,
      rating,
      trailer,
      director,
   } = movie;

   const photoDiv = document.createElement("div");
   photoDiv.setAttribute("id", "photoDivID");
   photoDiv.innerHTML = `
    <img src=${image} alt='image' id=${imdbid} />
  `;

   const details = document.createElement("div");
   details.setAttribute("id", "detailsID");
   details.innerHTML = `
    <h1>${title}</h1>
    <h3>Genre - ${genre[0]}</h3>
    <h3>Rating - ${rating}</h3>
    <h3>Released in ${year}</h3>
    <h3>Director - ${director[0]}</h3>
    <h5>${description}</h5>
    <a href=${trailer} target="_blank"> <button>Click to watch Trailer </button></a>
  `;
   movieContainer.append(photoDiv);
   movieContainer.append(details);
}
