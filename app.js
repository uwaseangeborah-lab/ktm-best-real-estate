const STORAGE_KEY = "ktm_best_listings";

const defaultListings = [
  {
    id: 1,
    title: "Kabeza Modern 2BR Apartment",
    type: "FOR RENT",
    price: "600,000 RWF",
    location: "Kabeza",
    beds: 2,
    baths: 2,
    area: "110 sqm",
    description:
      "A modern apartment with secure parking, a bright living area, and a calm residential setting close to schools and shopping centers.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
    ],
    video: "https://www.youtube.com/watch?v=ysz5S6PUM-U"
  },
  {
    id: 2,
    title: "Kigali Family House",
    type: "FOR SALE",
    price: "1,200,000 RWF",
    location: "Kigali",
    beds: 4,
    baths: 3,
    area: "220 sqm",
    description:
      "A spacious family home with a front garden, lounge, kitchen, and a calm neighborhood that is ideal for long-term living.",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    video: ""
  },
  {
    id: 3,
    title: "Downtown 1BR Studio",
    type: "FOR RENT",
    price: "350,000 RWF",
    location: "Downtown",
    beds: 1,
    baths: 1,
    area: "65 sqm",
    description:
      "Perfect for working professionals who want a central location, easy transport access, and a clean modern interior.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ],
    video: ""
  },
  {
    id: 4,
    title: "Luxury Villa in Gasabo",
    type: "FOR SALE",
    price: "2,500,000 RWF",
    location: "Gasabo",
    beds: 5,
    baths: 4,
    area: "310 sqm",
    description:
      "A premium villa with elegant finishes, generous outdoor space, and excellent security in a highly sought-after district.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472591-5d7a252cf590?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    video: ""
  }
];

const productCountEl = document.getElementById("propertyCount");
const listingsEl = document.getElementById("listings");
const modalEl = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const adminTrigger = document.getElementById("adminTrigger");
const adminModal = document.getElementById("adminModal");
const adminPasswordInput = document.getElementById("adminPassword");
const adminError = document.getElementById("adminError");
const closeModalBtn = document.getElementById("closeModal");

function loadListings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultListings));
      return [...defaultListings];
    }

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : [...defaultListings];
  } catch (error) {
    console.error("Could not load listings", error);
    return [...defaultListings];
  }
}

let listings = loadListings();

function saveListings(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function renderListings() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedType = typeFilter.value;

  const filtered = listings.filter((item) => {
    const matchesQuery =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);

    const matchesType = selectedType === "All" || item.type === selectedType;
    return matchesQuery && matchesType;
  });

  productCountEl.textContent = `${filtered.length} property${filtered.length === 1 ? "" : "ies"}`;

  if (!filtered.length) {
    listingsEl.innerHTML = '<div class="empty-state">No homes match your search. Try another keyword or type.</div>';
    return;
  }

  listingsEl.innerHTML = filtered
    .map(
      (item) => `
        <article class="listing-card">
          <img src="${item.image || item.images?.[0]}" alt="${item.title}" />
          <div class="listing-content">
            <span class="listing-meta">${item.type}</span>
            <h3>${item.title}</h3>
            <div class="listing-price">${item.price}</div>
            <div class="listing-details">
              <span>${item.location}</span>
              <span>${item.beds} beds</span>
              <span>${item.baths} baths</span>
              <span>${item.area}</span>
            </div>
            <button type="button" class="primary-button listing-button" data-id="${item.id}">View Details</button>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".listing-button").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = listings.find((item) => String(item.id) === button.dataset.id);
      openModal(selected);
    });
  });
}

function openModal(item) {
  if (!item) return;

  const gallery = (item.images && item.images.length ? item.images : [item.image])
    .map((src) => `<img src="${src}" alt="${item.title}" />`)
    .join("");

  const videoLink = item.video
    ? `<a class="wa-btn" href="${item.video}" target="_blank" rel="noreferrer">▶ Watch Video</a>`
    : "";

  modalBody.innerHTML = `
    <div class="modal-details">
      <h2>${item.title}</h2>
      <div class="modal-price">${item.price}</div>
      <div class="listing-details">
        <span>${item.location}</span>
        <span>${item.beds} beds</span>
        <span>${item.baths} baths</span>
        <span>${item.area}</span>
      </div>
      <div class="modal-gallery">${gallery}</div>
      <p class="modal-description">${item.description}</p>
      <div class="cta-row">
        <a class="wa-btn" href="https://api.whatsapp.com/send?phone=250784296859&text=Hi%20KT%20-%20I%20want%20to%20ask%20about%20${encodeURIComponent(item.title)}" target="_blank" rel="noreferrer">💬 WhatsApp KT</a>
        ${videoLink}
      </div>
    </div>
  `;

  modalEl.classList.add("is-open");
  modalEl.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modalEl.classList.remove("is-open");
  modalEl.setAttribute("aria-hidden", "true");
}

function handleAdminLogin() {
  const password = adminPasswordInput.value.trim();
  if (password === "khalifa2025") {
    localStorage.setItem("ktm_admin_logged_in", "true");
    window.location.href = "admin.html";
  } else {
    adminError.hidden = false;
  }
}

function openAdminModal() {
  adminModal.classList.add("is-open");
  adminModal.setAttribute("aria-hidden", "false");
  adminPasswordInput.value = "";
  adminError.hidden = true;
  adminPasswordInput.focus();
}

function closeAdminModal() {
  adminModal.classList.remove("is-open");
  adminModal.setAttribute("aria-hidden", "true");
}

searchInput.addEventListener("input", renderListings);
typeFilter.addEventListener("change", renderListings);
closeModalBtn.addEventListener("click", closeModal);
modalEl.addEventListener("click", (event) => {
  if (event.target === modalEl) closeModal();
});
adminTrigger.addEventListener("click", openAdminModal);
document.getElementById("submitAdmin").addEventListener("click", handleAdminLogin);
document.getElementById("cancelAdmin").addEventListener("click", closeAdminModal);
adminPasswordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") handleAdminLogin();
});

renderListings();
