let allItems = [];
let currentPage = 1;
const itemsPerPage = 5;

window.renderPage = function () {
  const tbody = document.getElementById("itemTableBody");
  tbody.innerHTML = "";

 
  if (!filteredItems || filteredItems.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="py-6 text-center text-gray-500 text-lg font-medium">
          No items found
        </td>
      </tr>
    `;
    document.getElementById("pageNumbers").innerHTML = "";
    return;
  }

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filteredItems.slice(start, end);

  display(pageItems);
  renderPageNumbers();
};

function renderPageNumbers() {
  const pageContainer = document.getElementById("pageNumbers");
  pageContainer.innerHTML = "";

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;

    btn.className = `
      px-3 py-1 rounded-xl
      ${i === currentPage ? "bg-blue-800/20 text-blue-500" : "bg-gray-200"}
    `;

    btn.onclick = () => {
      currentPage = i;
      renderPage();
    };

    pageContainer.appendChild(btn);
  }

document.getElementById("prevBtn").disabled = currentPage === 1;
document.getElementById("nextBtn").disabled = currentPage === totalPages;
}
document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
});
