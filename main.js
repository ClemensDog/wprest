let template = document.querySelector("#uctemp").content;
let carlist = document.querySelector("#carlist");
let page = 1;
let lookingForData = false;

function fetchUsedCars(){
  lookingForData=true;
  
  fetch("https://t7.kea-alt-del.dk/wp-json/wp/v2/used_cars?_embed&per_page=2&page="+page)
    .then(e => {
    console.log(e.headers.get("x-wp-total"))
      return e.json()
    })
    .then(showCars);
}

function showCars(data){
  console.log(data)
  lookingForData=false;
    if(Array.isArray(data)){
      data.forEach(showSingleCar);    
    }  
  
  
}

function showSingleCar(aCar){
  let clone = template.cloneNode(true);
  clone.querySelector("h1").textContent = aCar.title.rendered;
  clone.querySelector(".descript").innerHTML = aCar.content.rendered
  clone.querySelector(".price span").textContent=aCar.acf.price
  clone.querySelector(".color").style.background=aCar.acf.color
  
  if(aCar._embedded["wp:featuredmedia"]){//img is there
     clone.querySelector("img").setAttribute("src", aCar._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
  } else { // no img
      clone.querySelector("img").remove()
  }
  
  
  
  carlist.appendChild(clone);
}
fetchUsedCars();


//found this stuff online
setInterval(function(){
  
  if(bottomVisible() && lookingForData===false){
    console.log("We've reached rock bottom, fetching articles")
    page++;
    fetchUsedCars();
  }
}, 1000)

function bottomVisible() {
  const scrollY = window.scrollY
  const visible = document.documentElement.clientHeight
  const pageHeight = document.documentElement.scrollHeight
  const bottomOfPage = visible + scrollY >= pageHeight
  return bottomOfPage || pageHeight < visible
}







