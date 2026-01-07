let filteredItems = [];


document.getElementById("statusFilter").addEventListener("change", (e) => {
  const value = e.target.value;

  if (value === "Veg Menu") filterByFood("veg");
  else if (value === "Non-Veg Menu") filterByFood("nonVeg");
  else if (value === "Egg Menu") filterByFood("egg");
  else filterByFood("all");
});

window.filterByFood = function (type) {
  if (type === "all") {
    filteredItems = [...allItems];
  } else {
    filteredItems = allItems.filter(
      item => item.foodContent === type
    );
  }

  currentPage = 1;
  renderPage();
};

