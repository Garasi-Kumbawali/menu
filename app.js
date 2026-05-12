const SHEET_ID =
  "1rjAvzY28sZ6QABnztEiUK56NSIzlvYrlYl7E8eGdI7A"

const SHEET_NAME = "Menu"

const API_URL =
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_NAME}`



async function loadMenu(){

  try{

    const response = await fetch(API_URL)

    const text = await response.text()

    const json =
      JSON.parse(
        text.substring(
          47,
          text.length - 2
        )
      )

    const rows =
      json.table.rows

    const data =
      rows.map(row => ({

        id:
          row.c[0]?.v || "",

        category:
          row.c[1]?.v || "",

        name:
          row.c[2]?.v || "",

        price:
          row.c[3]?.v || 0,

        available:
          row.c[4]?.v || "",

        temp:
          row.c[5]?.v || "-"

      }))

    renderMenu(data)

  }

  catch(error){

    console.error(error)

    document.getElementById(
      "menu-container"
    ).innerHTML = `

      <div class="loading">
        Failed to load menu.
      </div>

    `

  }

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

    ${renderCategory(
      "Food",
      grouped["Food"] || []
    )}

    ${renderCategory(
      "Snack",
      grouped["Snack"] || []
    )}

    ${renderCategory(
      "Coffee",
      grouped["Coffee"] || []
    )}

    ${renderCategory(
      "Drink",
      grouped["Drink"] || []
    )}

    ${renderBeansSection()}

  `

}



function renderCategory(title,items){

  return `

    <section class="category">

      <div class="category-title">

        <div class="category-line"></div>

        <div class="category-name">
          ${title}
        </div>

        <div class="category-line"></div>

      </div>

      <div class="menu-list">

        ${items.map(item => renderItem(item)).join("")}

      </div>

    </section>

  `

}



function renderItem(item){

  const available =
    item.available === false
    ? `
      <span class="sold">
        Sold Out
      </span>
    `
    : `
      <span class="available">
        Available
      </span>
    `

  const temp =
    item.temp &&
    item.temp !== "-"
    ? `
      <span class="temp">
        ${item.temp}
      </span>
    `
    : ""

  return `

    <div class="menu-item">

      <div class="menu-left">

        <div class="menu-name">
          ${item.name}
        </div>

        <div class="menu-meta">

          ${available}

          ${temp}

        </div>

      </div>

      <div class="menu-price">
        ${formatPrice(item.price)}
      </div>

    </div>

  `

}



function formatPrice(price){

  return `Rp ${Number(price)
    .toLocaleString("id-ID")}`

}



/* =========================
   BEANS
========================= */

function renderBeansSection(){

  return `

    <section class="beans-section">

      <div class="category-title">

        <div class="category-line"></div>

        <div class="category-name">
          Coffee Beans
        </div>

        <div class="category-line"></div>

      </div>

      <div class="beans-subtitle">
        Single Origin • House Blend • Specialty
      </div>

      <div class="beans-grid">

        <div class="bean-card">

          <div class="bean-top">

            <div class="bean-origin">
              Bandung
            </div>

            <div class="bean-badge">
              Fruity
            </div>

          </div>

          <div class="bean-name">
            Halu Banana
          </div>

          <div class="bean-note">
            Sweet banana aroma with smooth
            body and soft acidity.
          </div>

        </div>

        <div class="bean-card">

          <div class="bean-top">

            <div class="bean-origin">
              Aceh
            </div>

            <div class="bean-badge">
              Winey
            </div>

          </div>

          <div class="bean-name">
            Blueberry Wine
          </div>

          <div class="bean-note">
            Berry-forward profile with
            winey finish and floral aroma.
          </div>

        </div>

      </div>

    </section>

  `

}



loadMenu()
