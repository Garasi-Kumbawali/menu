/* =========================
   BEANS SECTION
========================= */

function renderBeansSection(beans){

  return `

    <section class="beans-section">

      <div class="category-title">

        <div class="category-line"></div>

        <div class="category-name">
          Kumbawali Beans Selection
        </div>

        <div class="category-line"></div>

      </div>

      <div class="beans-subtitle">
        Available for V60 • Japanese • Manual Brew
      </div>

      <div class="beans-grid">

        ${beans.map(bean => `

          <div
            class="bean-card"
            onclick="openBeanModal(
              '${escapeHtml(bean.name)}',
              '${escapeHtml(bean.category)}',
              '${escapeHtml(bean.origin)}',
              '${escapeHtml(bean.process)}',
              '${escapeHtml(bean.notes)}',
              '${escapeHtml(bean.brewPrice)}'
            )"
          >

            <!-- TOP -->

            <div class="bean-head">

              <div class="bean-category">
                ${bean.category || "-"}
              </div>

              <div class="bean-origin">
                ${bean.origin || "-"}
              </div>

            </div>



            <!-- NAME -->

            <div class="bean-name">
              ${bean.name}
            </div>



            <!-- PRICE -->

            <div class="bean-price">

              <span>
                For V60 / Japanese
              </span>

              <strong>
                ${formatSinglePrice(bean.brewPrice)}
              </strong>

            </div>

          </div>

        `).join("")}

      </div>

    </section>

  `

}



/* =========================
   OPEN MODAL
========================= */

function openBeanModal(
  name,
  category,
  origin,
  process,
  notes,
  price
){

  closeBeanModal()

  const modal =
    document.createElement("div")

  modal.className =
    "bean-modal"

  modal.innerHTML = `

    <div
      class="bean-modal-overlay"
      onclick="closeBeanModal()"
    ></div>

    <div class="bean-modal-content">

      <div class="bean-modal-top">

        <div>

          <div class="bean-modal-category">
            ${category || "-"}
          </div>

          <div class="bean-modal-name">
            ${name || "-"}
          </div>

        </div>

        <div class="bean-modal-origin">
          ${origin || "-"}
        </div>

      </div>



      ${
        process
        ? `
          <div class="bean-modal-section">

            <div class="bean-modal-label">
              PROCESS
            </div>

            <div class="bean-modal-text">
              ${process}
            </div>

          </div>
        `
        : ""
      }



      ${
        notes
        ? `
          <div class="bean-modal-section">

            <div class="bean-modal-label">
              TASTING NOTES
            </div>

            <div class="bean-modal-text">
              ${notes}
            </div>

          </div>
        `
        : ""
      }



      ${
        price
        ? `
          <div class="bean-modal-price">

            <span>
              V60 / Japanese
            </span>

            <strong>
              ${formatSinglePrice(price)}
            </strong>

          </div>
        `
        : ""
      }



      <button
        class="bean-modal-close"
        onclick="closeBeanModal()"
      >
        Close
      </button>

    </div>

  `

  document.body.appendChild(modal)

}



/* =========================
   CLOSE MODAL
========================= */

function closeBeanModal(){

  const modal =
    document.querySelector(".bean-modal")

  if(modal){
    modal.remove()
  }

}



/* =========================
   ESCAPE HTML
========================= */

function escapeHtml(text){

  if(!text) return ""

  return String(text)
    .replace(/'/g, "\\'")
    .replace(/"/g, '&quot;')

}
