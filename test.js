var paragraphs = document.querySelectorAll("p");

paragraphs.forEach(makeClickable);

function makeClickable(p){
  console.log(p)
  p.addEventListener('click', paragraphClicked)
}

function paragraphClicked(evtInfo){
  console.log("click", evtInfo);
  let clickedP = evtInfo.target;
  clickedP.remove()
}

