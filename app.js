const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vStOot55lakMCkwmYBzwFrl8SDUTbLYPQq8iIDd915bhYK1HdJrGPdLnC-Z98nLbOMwlF9o-Z_tlZTz/pub?output=csv"



async function loadCSV(){

  try{

    const response = await fetch(
      `${CSV_URL}&t=${Date.now()}`
    )

    const csv = await response.text()

    const data = parseCSV(csv)

    renderMenu(data)

  }

  catch(error){

    console.error(error)

    document.getElementById(
      "menu-container"
    ).innerHTML = `

      <div class="error-message">
        Failed to load menu.
      </div>

    `

  }

}



function parseCSV(csv){

  const lines =
    csv.trim().split("\n")

  const headers =
    lines[0]
    .split(",")
    .map(h => h.trim())

  return lines.slice(1).map(line => {

    const values =
      line.split(",")

    const obj = {}

    headers.forEach((header,index)=>{

      obj[header] =
        values[index]
        ? values[index].trim()
        : ""

    })

    return obj

  })

}



function renderMenu(data){

  const grouped = {}

  data.forEach(item => {

    if(!grouped[item.category]){
      grouped[item.category] = []
    }

    grouped[item.category].push(item)

  })

  const container =
    document.getElementById("menu-container")

  container.innerHTML = `

    <section class="menu-sheet">

      <div class="sheet-header">

        <div class="brand-name">
          Garasi Kumbawali
        </div>

        <div class="sheet-title">
          Food & Drink
        </div>

        <div class="tagline">
          Kopi adalah Sahabat
        </div>

      </div>

      ${renderSection("Food", grouped["Food"] || [])}

      <div class="section-space"></div>

      ${renderSection("Snack", grouped["Snack"] || [])}

      <div class="section-space"></div>

      ${renderSection("Coffee", grouped["Coffee"] || [])}

      <div class="section-space"></div>

      ${renderSection("Drink", grouped["Drink"] || [])}

    </section>

  `

}



function renderSection(title,items){

  return `

    <div>

      <div class="section-title">
        ${title}
      </div>

      <div class="menu-list">

        ${items.map(item => renderItem(item)).join("")}

      </div>

    </div>

  `

}



function renderItem(item){

  const temp =
    item.temp &&
    item.temp !== "-"
    ? `<span class="item-sub">${item.temp}</span>`
    : ""

  return `

    <div class="menu-row">

      <div class="item-name">
        ${item.name}
        ${temp}
      </div>

      <div class="item-leader"></div>

      <div class="item-price">
        ${formatPrice(item.price)}
      </div>

    </div>

  `

}



function formatPrice(price){

  const value =
    Number(price || 0)

  return `Rp ${value.toLocaleString("id-ID")}`

}



loadCSV()
