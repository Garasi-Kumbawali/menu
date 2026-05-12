const SPREADSHEET_ID =
  "1rjAvzY28sZ6QABnztEiUK56NSIzlvYrlYl7E8eGdI7A"

const MENU_API =
  `https://opensheet.elk.sh/${SPREADSHEET_ID}/Menu`

async function fetchJSON(url){

  try{

    const response = await fetch(
      `${url}?t=${Date.now()}`
    )

    const text = await response.text()

    return JSON.parse(text)

  }

  catch(error){

    console.error("FETCH ERROR:", error)

    return []

  }

}

async function renderMenu(){

  try{

    const data = await fetchJSON(MENU_API)

    if(!Array.isArray(data) || !data.length){
      throw new Error("No data")
    }

    const container =
      document.getElementById("menu-container")

    const grouped = {}

    data.forEach(item => {

      if(!grouped[item.category]){
        grouped[item.category] = []
      }

      grouped[item.category].push(item)

    })

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

renderMenu()
