var data = {
    "Mythic": 0.915,
    "Ethereal Diamond": 0.745,
    "Solar Gold": 0.575,
    "Auric Gold": 0.405,
    "Midnight Shadow": 0.235,
    "Twilight Shadow": 0.14,
    "Astral Meteorite": 0.125,
    "Impact Meteorite": 0.11,
    "Purified Iron": 0.095,
    "Rusted Iron": 0.08,
    "Purified Bronze": 0.065,
    "Rusted Bronze": 0.05
}

function displayFragmentTable(divName) {
    var parentDiv = document.getElementById(divName)
    var table = document.createElement("table")
    
    var tableBody = document.createElement("tbody")
    tableBody.id = "tableFragments"

    var titleList = ["Game", "Wins", "Rank", "Nº Diamond Cards", "Nº Gold Cards", "Nº Shadow Cards", "Nº Meteorite Cards", "Fragments"]
    var tableTitle = document.createElement("tr")
    for (var i in titleList) {
        var titleColumn = document.createElement("th")
        titleColumn.innerHTML = titleList[i]
        tableTitle.appendChild(titleColumn)
    }
    tableBody.appendChild(tableTitle)

    for (var i = 0; i < 10; i++) {
        var tableRow = document.createElement("tr")
        var tableElement = document.createElement("td")
        tableElement.innerHTML = i + 1
        tableRow.appendChild(tableElement)

        tableElement = document.createElement("td")
        var checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.id = "win" + i
        checkbox.classList.add("checkBox")
        checkbox.addEventListener("change", calculateFragments)
        tableElement.appendChild(checkbox)
        tableRow.appendChild(tableElement)

        tableElement = document.createElement("td")
        var selectRank = document.createElement("select")

        var ranks = Object.keys(data)

        for (var j in ranks) {
            var option = document.createElement("option")
            option.innerHTML = ranks[j]
            selectRank.appendChild(option)
        }
        selectRank.id = "dropdown" + i
        selectRank.addEventListener("change", calculateFragments)
        tableElement.appendChild(selectRank)
        tableRow.appendChild(tableElement)

        

        tableElement = document.createElement("td")
        var textDiamond = document.createElement("input")
        textDiamond.id = "diamondInput" + i
        textDiamond.type = "number"
        textDiamond.value = 0
        textDiamond.addEventListener("change", calculateFragments)
        tableElement.appendChild(textDiamond)
        tableRow.appendChild(tableElement)

        tableElement = document.createElement("td")
        var textGold = document.createElement("input")
        textGold.id = "goldInput" + i
        textGold.type = "number"
        textGold.value = 0
        textGold.addEventListener("change", calculateFragments)
        tableElement.appendChild(textGold)
        tableRow.appendChild(tableElement)

        tableElement = document.createElement("td")
        var textShadow = document.createElement("input")
        textShadow.id = "shadowInput" + i
        textShadow.type = "number"
        textShadow.value = 0
        textShadow.addEventListener("change", calculateFragments)
        tableElement.appendChild(textShadow)
        tableRow.appendChild(tableElement)

        tableElement = document.createElement("td")
        var textMeteorite = document.createElement("input")
        textMeteorite.id = "meteoriteInput" + i
        textMeteorite.type = "number"
        textMeteorite.value = 30
        textMeteorite.addEventListener("change", calculateFragments)
        tableElement.appendChild(textMeteorite)
        tableRow.appendChild(tableElement)

        tableElement = document.createElement("td")
        var result = document.createElement("div")
        result.id = "result" + i
        tableElement.appendChild(result)
        tableRow.appendChild(tableElement)

        tableBody.appendChild(tableRow)

    }

    tableRow = document.createElement("tr")
    for (i = 0; i < 6; i++) tableRow.appendChild(document.createElement("td"))
    tableElement = document.createElement("td")
    tableElement.innerHTML = "Total Fragments"
    tableRow.appendChild(tableElement)
    tableElement = document.createElement("td")
    tableElement.id = "totalFragments"
    tableRow.appendChild(tableElement)
    tableBody.appendChild(tableRow)

    tableRow = document.createElement("tr")
    for (i = 0; i < 6; i++) tableRow.appendChild(document.createElement("td"))
    tableElement = document.createElement("td")
    tableElement.innerHTML = "Daily GODS (K)"
    tableRow.appendChild(tableElement)
    tableElement = document.createElement("td")
    var inputDailyG = document.createElement("input")
    inputDailyG.type = "number"
    inputDailyG.id = "dailyGODS"
    inputDailyG.addEventListener("change", calculateFragments)
    inputDailyG.value = 14
    tableElement.append(inputDailyG)
    tableRow.appendChild(tableElement)
    tableBody.appendChild(tableRow)

    tableRow = document.createElement("tr")
    for (i = 0; i < 6; i++) tableRow.appendChild(document.createElement("td"))
    tableElement = document.createElement("td")
    tableElement.innerHTML = "Community Fragments (M)"
    tableRow.appendChild(tableElement)
    tableElement = document.createElement("td")
    var comFragments = document.createElement("input")
    comFragments.type = "number"
    comFragments.id = "comFragments"
    comFragments.addEventListener("change", calculateFragments)
    comFragments.value = 3.21
    tableElement.append(comFragments)
    tableRow.appendChild(tableElement)
    tableBody.appendChild(tableRow)

    tableRow = document.createElement("tr")
    for (i = 0; i < 6; i++) tableRow.appendChild(document.createElement("td"))
    tableElement = document.createElement("td")
    tableElement.innerHTML = "Daily Rewards"
    tableRow.appendChild(tableElement)
    tableElement = document.createElement("td")
    tableElement.id = "dailyRewards"
    tableRow.appendChild(tableElement)
    tableBody.appendChild(tableRow)


    table.appendChild(tableBody)
    parentDiv.appendChild(table)
    calculateFragments()
}

function calculateFragments() {
    var deckList = []
    for (var i = 0; i < 10; i++) {
        var deckRow = []
        deckRow.push(parseInt(document.getElementById("diamondInput" + i).value))
        deckRow.push(parseInt(document.getElementById("goldInput" + i).value))
        deckRow.push(parseInt(document.getElementById("shadowInput" + i).value))
        deckRow.push(parseInt(document.getElementById("meteoriteInput" + i).value))
        deckList.push(deckRow)
        if ((deckRow[0] + deckRow[1] + deckRow[2] +  deckRow[3])> 30) {
            return
        }
    }

    var rankList = []
    for (i = 0; i < 10; i++) {
        rankList.push(data[document.getElementById("dropdown" + i).value])
    }
    
    var winStreakList = []
    winStreakList.push(0)
    for (i = 1; i < 10; i++) {
        if (document.getElementById("win" + i).checked && document.getElementById("win" + (i - 1)).checked) winStreakList.push(0.09)
        else winStreakList.push(0)
    }

    var cardValueList = []
    for (i = 0; i < 10; i++) {
        var diamond = parseInt(document.getElementById("diamondInput" + i).value)
        var gold = parseInt(document.getElementById("goldInput" + i).value)
        var shadow = parseInt(document.getElementById("shadowInput" + i).value)
        var meteorite = parseInt(document.getElementById("meteoriteInput" + i).value)
        cardValueList.push((diamond * 125 + gold * 25 + shadow * 5 + meteorite) / 3750)
    }

    var minQualityBoost = []
    for (i = 0; i < 10; i++) {
        var diamond = parseInt(document.getElementById("diamondInput" + i).value)
        var gold = parseInt(document.getElementById("goldInput" + i).value)
        var shadow = parseInt(document.getElementById("shadowInput" + i).value)
        var meteorite = parseInt(document.getElementById("meteoriteInput" + i).value)

        if ((diamond + gold + shadow + meteorite) < 30) minQualityBoost.push(0)
        else if (diamond == 30) minQualityBoost.push(1)
        else if ((diamond + gold) == 30) minQualityBoost.push(0.25)
        else if ((diamond + gold + shadow) == 30) minQualityBoost.push(0.2)
        else if ((diamond + gold + shadow + meteorite) == 30) minQualityBoost.push(0.15)
    }

    var deckTotal = []
    for (i = 0; i < 10; i++) {
        deckTotal.push((cardValueList[i] * (1 - minQualityBoost[i])) +  minQualityBoost[i])
    }

    var resultList = []
    var result
    for (i = 0; i < 3; i++) {
        if (document.getElementById("win" + i).checked) result = 100 * (rankList[i] + winStreakList[i] + deckTotal[i]) * 2
        else result = 0

        resultList.push(result)
        document.getElementById("result" + i).innerHTML = result == 0 ? "-" : result.toFixed(4)
    }
    for (i = 3; i < 10; i++) {
        if (document.getElementById("win" + i).checked) {
            let countH = resultList.slice(0, i).filter(value => value > 0).length;
            result = 100 * (rankList[i] + winStreakList[i] + deckTotal[i]) * (countH >= 3 ? 1 : 2);
        } else {
            result = 0;
        }
    
        resultList.push(result);
        document.getElementById("result" + i).innerHTML = result == 0 ? "-" : result.toFixed(4);
    }

    var totalFragments = resultList.reduce((a, b) => (a + b), 0)
    document.getElementById("totalFragments").innerHTML = totalFragments.toFixed(4)

    var dailyGODS =document.getElementById("dailyGODS").value
    var comFragments =document.getElementById("comFragments").value

    document.getElementById("comFragments").innerHTML = comFragments + " K"

    var dailyRewards = (totalFragments * dailyGODS * 1000) / (comFragments * 1000000)
    document.getElementById("dailyRewards").innerHTML = dailyRewards.toFixed(4) + " GODS"

}

function displaySearch(divId) {
    var parentDiv = document.getElementById(divId)
    var wrapperDiv = document.createElement("div")
    wrapperDiv.id = "wrapperDiv"

    var columnGrid = document.createElement("div")
    var godList = ["light", "death", "nature", "war", "magic", "deception"]
    var godTypeSelect = document.createElement("select")
    var godOption = document.createElement("option")
    godOption.innerHTML = "All"
    godOption.value = ""
    godTypeSelect.appendChild(godOption)
    for (var i in godList) {
        var godOption = document.createElement("option")
        godOption.innerHTML = godList[i]
        godOption.value = godList[i]
        godTypeSelect.appendChild(godOption)
    }
    godTypeSelect.addEventListener("change", searchCard)
    godTypeSelect.id = "godTypeSelect"
    var titleColumn = document.createElement("div")
    titleColumn.innerHTML = "Select God"
    columnGrid.appendChild(titleColumn)
    columnGrid.appendChild(godTypeSelect)
    columnGrid.classList.add("wrapperElement")
    wrapperDiv.appendChild(columnGrid)


    var columnGrid = document.createElement("div")
    var rarityList = ["common", "rare", "epic", "legendary", "mythic"]
    var rarityTypeSelect = document.createElement("select")
    var rarityOption = document.createElement("option")
    rarityOption.innerHTML = "All"
    rarityOption.value = ""
    rarityTypeSelect.appendChild(rarityOption)
    for (var i in rarityList) {
        var rarityOption = document.createElement("option")
        rarityOption.innerHTML = rarityList[i]
        rarityOption.value = rarityList[i]
        rarityTypeSelect.appendChild(rarityOption)
    }
    rarityTypeSelect.addEventListener("change", searchCard)
    rarityTypeSelect.id = "rarityTypeSelect"
    var titleColumn = document.createElement("div")
    titleColumn.innerHTML = "Select Rarity"
    columnGrid.appendChild(titleColumn)
    columnGrid.appendChild(rarityTypeSelect)
    columnGrid.classList.add("wrapperElement")
    wrapperDiv.appendChild(columnGrid)
    
    
    var columnGrid = document.createElement("div")
    var typeList = ["creature", "spell", "weapon"]
    var typeSelect = document.createElement("select")
    var typeOption = document.createElement("option")
    typeOption.innerHTML = "All"
    typeOption.value = ""
    typeSelect.appendChild(typeOption)
    for (var i in typeList) {
        var typeOption = document.createElement("option")
        typeOption.innerHTML = typeList[i]
        typeOption.value = typeList[i]
        typeSelect.appendChild(typeOption)
    }
    typeSelect.addEventListener("change", searchCard)
    typeSelect.id = "typeSelect"
    var titleColumn = document.createElement("div")
    titleColumn.innerHTML = "Select Type"
    columnGrid.appendChild(titleColumn)
    columnGrid.appendChild(typeSelect)
    columnGrid.classList.add("wrapperElement")
    wrapperDiv.appendChild(columnGrid)

    var columnGrid = document.createElement("div")
    var tribeList = ["nether", "aether", "atlantean", "viking", "olympian", "anubian", "amazon"]
    var tribeTypeSelect = document.createElement("select")
    var tribeOption = document.createElement("option")
    tribeOption.innerHTML = "All"
    tribeOption.value = ""
    tribeTypeSelect.appendChild(tribeOption)
    for (var i in tribeList) {
        var tribeOption = document.createElement("option")
        tribeOption.innerHTML = tribeList[i]
        tribeOption.value = tribeList[i]
        tribeTypeSelect.appendChild(tribeOption)
    }
    tribeTypeSelect.addEventListener("change", searchCard)
    tribeTypeSelect.id = "tribeTypeSelect"
    var titleColumn = document.createElement("div")
    titleColumn.innerHTML = "Select Tribe"
    columnGrid.appendChild(titleColumn)
    columnGrid.appendChild(tribeTypeSelect)
    columnGrid.classList.add("wrapperElement")
    wrapperDiv.appendChild(columnGrid)

    
    var columnGrid = document.createElement("div")
    var manaTypeSelect = document.createElement("select")
    var manaOption = document.createElement("option")
    manaOption.innerHTML = "All"
    manaOption.value = ""
    manaTypeSelect.appendChild(manaOption)
    for (var i = 0 ; i < 10; i++) {
        var manaOption = document.createElement("option")
        manaOption.innerHTML = i
        manaOption.value = i
        manaTypeSelect.appendChild(manaOption)
    }
    manaTypeSelect.addEventListener("change", searchCard)
    manaTypeSelect.id = "manaSelect"

    var titleColumn = document.createElement("div")
    titleColumn.innerHTML = "Select Mana Cost"
    columnGrid.appendChild(titleColumn)
    columnGrid.appendChild(manaTypeSelect)
    columnGrid.classList.add("wrapperElement")
    wrapperDiv.appendChild(columnGrid)
    
    var tableQuery = document.createElement("table")
    tableQuery.id = "tableQuery"
    
    
    
    
    parentDiv.appendChild(wrapperDiv)
    parentDiv.appendChild(tableQuery)
    searchCard()
}

function searchCard() {
    var godType = document.getElementById("godTypeSelect").value;
    var rarityType = document.getElementById("rarityTypeSelect").value;
    var type = document.getElementById("typeSelect").value;
    var tribeType = document.getElementById("tribeTypeSelect").value;
    var mana = document.getElementById("manaSelect").value;
  
    var apiQuery = "?god=" + godType + "&rarity=" + rarityType + "&type=" + type + "&tribe=" + tribeType + "&perPage=10000";
    if (mana != "") apiQuery += "&mana=" + mana

    document.getElementById("tableQuery").innerHTML = "<div class=\"loader\"></div>"
  
    fetch("https://api.godsunchained.com/v0/proto" + apiQuery)
      .then(response => response.json())
      .then(data => {
        
        var table = document.getElementById("tableQuery");
        var tableBody = "";

        if (data.records == null) {
            table.innerHTML = "No results :("
            return
        }

        var tableBody = "<tr>";
        tableBody += "<th>ID</th>";
        tableBody += "<th>Name</th>";
        tableBody += "<th>Effect</th>";
        tableBody += "<th>God</th>";
        tableBody += "<th>Rarity</th>";
        tableBody += "<th>Tribe</th>";
        tableBody += "<th>Type</th>";
        tableBody += "<th>Mana</th>";
        tableBody += "<th>Attack</th>";
        tableBody += "<th>Health</th>";
        tableBody += "</tr>";

         
        data.records.forEach(function(card) {
            var tribCard = card.tribe["Valid"] == true ? card.tribe["String"] : ""
            var attCard = card.attack["Valid"] == true ? card.attack["Int64"] : ""
            var hthCard = card.health["Valid"] == true ? card.health["Int64"] : ""
            tableBody += "<tr>";
            tableBody += "<td>" + card.id + "</td>";
            tableBody += "<td>" + card.name + "</td>";
            tableBody += "<td>" + card.effect + "</td>";
            tableBody += "<td>" + card.god + "</td>";
            tableBody += "<td>" + card.rarity + "</td>";
            tableBody += "<td>" + tribCard + "</td>";
            tableBody += "<td>" + card.type + "</td>";
            tableBody += "<td>" + card.mana + "</td>";
            tableBody += "<td>" + attCard + "</td>";
            tableBody += "<td>" + hthCard + "</td>";
            tableBody += "</tr>";
        });
  
        table.innerHTML = tableBody;
      })
      .catch(error => {
        console.error(error);
      });
}


function clear() {
    document.getElementById("fragmentTable").innerHTML = ""
    document.getElementById("searchDiv").innerHTML = ""
    document.getElementById("payBackDiv").innerHTML = ""
}

function displayPayBack(divId) {
    var parentDiv = document.getElementById(divId)
    var table = document.createElement("table")
    var explainText = document.createElement("p")
    explainText.innerHTML = "Estimated amount of time it takes for a player to earn back the cost of a specific card."
    parentDiv.appendChild(explainText)
    table.id = "tablePayback"
    var tableBody = document.createElement("tbody")

    var titleRow = document.createElement("tr")
    var titleList = ["", "USD", "GODS", "Efficient (3W/day)", "Average (5W/day)", "Perfect (10W/day)"]
    var cardType = ["Shadow", "Gold", "Diamond"]
    var mode = ["efficient", "average", "perfect"]
    var initialValueNumbers = [0.27, 1.65, 8.5]

    for (var i in titleList) {
        var titleElement = document.createElement("th")
        titleElement.innerHTML = titleList[i]
        titleRow.appendChild(titleElement)
    }
    tableBody.appendChild(titleRow)

    for (i in cardType) {
        var tableRow = document.createElement("tr")
        var tableElement = document.createElement("td")
        tableElement.innerHTML = cardType[i]
        tableRow.appendChild(tableElement)

        tableElement = document.createElement("td")
        var cardValueUSD = document.createElement("input")
        cardValueUSD.type = "number"
        cardValueUSD.value = initialValueNumbers[i]
        cardValueUSD.id = "cardValueUSD" + i
        cardValueUSD.addEventListener("change", calculatePayBack)
        tableElement.appendChild(cardValueUSD)
        tableRow.appendChild(tableElement)

        tableElement = document.createElement("td")
        var cardValueGODS = document.createElement("div")
        cardValueGODS.id = "cardValueGODS" + i
        tableElement.appendChild(cardValueGODS)
        tableRow.appendChild(tableElement)

        for (var j in mode) {
            tableElement = document.createElement("td")
            var elementDiv = document.createElement("div")
            elementDiv.id = mode[j] + cardType[i]
            tableElement.appendChild(elementDiv)
            tableRow.appendChild(tableElement)
        }

        tableBody.appendChild(tableRow)
    }

    table.appendChild(tableBody)
    parentDiv.appendChild(table)
    calculatePayBack()
}

function calculatePayBack() {
    var cardType = ["Shadow", "Gold", "Diamond"]
    var mode = ["efficient", "average", "perfect"]

    var coefficients = [[0.0024, 0.0032,	0.0052],
                       [0.0143,	0.019,	0.0309],
                       [0.0736,	0.0981,	0.1594]]

    fetch("https://api.coingecko.com/api/v3/simple/price?ids=gods-unchained&vs_currencies=USD&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=18")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var price = parseFloat(data["gods-unchained"]["usd"])
            
            for (var i in cardType) {
                var godsValue = document.getElementById("cardValueUSD" + i).value / price
                console.log(godsValue)
                document.getElementById("cardValueGODS" + i).innerHTML = godsValue.toFixed(2)
                for (var j in mode) {
                    document.getElementById(mode[j] + cardType[i]).innerHTML = (godsValue / coefficients[i][j]).toFixed(3) + " days"
                }
            }
    });
}

function main() {
    displayFragmentTable("fragmentTable")

    var fragmentButton = document.getElementById("fragmentButton")
    fragmentButton.addEventListener("click", function() {
        clear()
        displayFragmentTable("fragmentTable")
    })

    var searchButton = document.getElementById("searchButton")
    searchButton.addEventListener("click", function() {
        clear()
        displaySearch("searchDiv")
    })

    var payBackPeriod = document.getElementById("payBackPeriod")
    payBackPeriod.addEventListener("click", function() {
        clear()
        displayPayBack("payBackDiv")
    })

    fetch("https://api.coingecko.com/api/v3/simple/price?ids=gods-unchained&vs_currencies=USD&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=18")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var currencies = data["gods-unchained"]
            var price = document.getElementById("priceInfo")

            price.innerHTML = "GODS: <b>$" + currencies["usd"].toFixed(6) + "</b>"
            
            
    });
}

main()