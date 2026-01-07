/* 🔹 GLOBAL SORT STATE (MUST BE HERE) */
window.sortState = {groupName: "asc",itemCode: "asc",itemName: "asc",};

window.activeSortKey = null;

window.sortTableData = function (key) {
  sortState[key] = sortState[key] === "asc" ? "desc" : "asc";
  const order = sortState[key];
  activeSortKey = key;

  filteredItems.sort((a, b) => {
    let itemA = a[key]?.toString().toLowerCase() || "";
    let itemB = b[key]?.toString().toLowerCase() || "";

    if (itemA < itemB) return order === "asc" ? -1 : 1;
    if (itemA > itemB) return order === "asc" ? 1 : -1;
    return 0;
  });

  updateSortIcons();
  currentPage = 1;
  renderPage();
};

function updateSortIcons() {
  const keys = ["groupName", "itemCode", "itemName"];

  keys.forEach(k => {
    const icon = document.getElementById(`icon-${k}`);
    if (!icon) return;

    icon.textContent =
      k === activeSortKey
        ? sortState[k] === "asc" ? "↑" : "↓": "↑↓";
  });
}
