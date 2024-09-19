const indSpreads = document.querySelector(".indSpreads");
const youPicked = document.querySelector("#youPicked");
const submit = document.querySelector("#submit");
var currentPick = "";

async function getData() {
  const url = " https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=e5ee6d545df5c915eab5034543970edf&regions=us&markets=spreads&oddsFormat=american";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    parseData(json);
    clickable();
  } catch (error) {
    console.error(error.message);
  }
}

function parseData(json) {
  const homeTeams = json.map((item) => item.home_team);
  const awayTeams = json.map((item) => item.away_team);
  const spreads = json.map((item) => item.bookmakers[0].markets[0].outcomes);

  for (let i = 0; i < homeTeams.length; i++) {
    const newItem = document.createElement("li");
    newItem.innerHTML = "Home: " + homeTeams[i] + "<br>";
    newItem.innerHTML += "Away: " + awayTeams[i] + "<br>";
    newItem.innerHTML += "Spread (Home Team): " + spreads[i][0].point;
    indSpreads.appendChild(newItem);
  }

}

function clickable(){
  const listItems = document.querySelectorAll(".indSpreads li")
  for (var i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener("click", function (e) {
      for (var i = 0; i < listItems.length; i++) {
        listItems[i].style.backgroundColor = "rgb(151, 197, 197)";
        listItems[i].style.border = "thin solid black"
      }
      e.target.style.backgroundColor = "rgb(141, 180, 141)";
      e.target.style.border = "medium solid black"
      currentPick = (e.target.innerHTML) //.match(/\(home team(.)+/i)[0] + e.innerHTML.match(/.+?(?=<)/i)[0]);
    })
}
}

//submit.addEventListener("click", function(){
  //youPicked.innerHTML = `You picked <br> ${currentPick}`
//})

getData();
