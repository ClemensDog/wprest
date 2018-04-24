let urlParams = new URLSearchParams(window.location.search);

let id = urlParams.get("id");
console.log("i want to get article: " + id);


fetch("https://t7.kea-alt-del.dk/wp-json/wp/v2/used_cars/"+id)
  .then(e=>e.json())
  .then(showSinglePost)


function showSinglePost(aPost){
  console.log(aPost);
  document.querySelector("#singleCar h1").textContent=aPost.title.rendered;


  //show carsection
  document.querySelector("#singleCar").classList.add("slideInCar");
}
