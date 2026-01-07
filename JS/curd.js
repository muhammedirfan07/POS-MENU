import { addItem, getItem, removeItem, updateItem } from "../Server/allApi.js";
let currentEditId = null;

//  ADD items------------
document.getElementById("saveBtn").addEventListener("click", saveItem);
async function saveItem() {
  const itemName = document.getElementById("itemName").value.trim();
  const itemCode = document.getElementById("itemCode").value.trim();
  const groupName = document.getElementById("groupName").value.trim();
  const rate = Number(document.getElementById("rate").value);
  const specialRate = Number(document.getElementById("specialRate").value);
  const tax = Number(document.getElementById("tax").value);
  const foodContent = document.querySelector(
    'input[name="foodContent"]:checked'
  ).value;

  console.log("Item Name:", itemName);
  console.log("Item Code:", itemCode);
  console.log("Group Name:", groupName);
  console.log("Normal Rate:", rate);
  console.log("Special Rate:", specialRate);
  console.log("Tax:", tax);
  console.log("foodContent:", foodContent);

  if (rate < 0 || specialRate < 0 || tax < 0) {
    return showToast("please eneter vaild data ..","warning")
  }

  if (itemName != "" && itemCode != "" && groupName != "") {
    const itemData = {
      itemName,
      itemCode,
      groupName,
      rate,
      specialRate,
      tax,
      foodContent,
    };
    console.log("Item Data Object:", itemData);
    try {
      let result;

      if (currentEditId) {
        // UPDATE
        result = await updateItem(currentEditId, itemData);
       showToast("Item update successfully", "success");
      } else {
        //  ADD
        result = await addItem(itemData);

        if (result.status === 200) {
         showToast("Item added successfully", "success");
        } else {
          showToast("all ready exist!", "info");

        }
      }

      modalClear();
      closeModal();
      loadItems();
      currentEditId = null;
    } catch (error) {
      showToast("This is a warning!", "warning");

    }
  } else {
    showToast("fill the form completilyy.....", "warning");

  }
}

// get all items
window.addEventListener("DOMContentLoaded", loadItems);
async function loadItems() {
  try {
    const result = await getItem("");
    console.log("result==", result);

    if (result.status === 200) {
      allItems = result.data;
      filteredItems = [...allItems];
      currentPage = 1;
      renderPage();
    }
    //total menu
    document.getElementById("totalMenu").innerHTML = allItems.length;

    //veg
    const vegCount = allItems.filter(
      (item) => item.foodContent === "veg"
    ).length;
    console.log("vercound=", vegCount);

    //non veg
    const nonVegCount = allItems.filter(
      (item) => item.foodContent === "nonVeg"
    ).length;
    console.log("nonVeg Conut = ", nonVegCount);

    //egg item
    const eggCount = allItems.filter(
      (item) => item.foodContent === "egg"
    ).length;
    console.log("eggMenu =", eggCount);

    document.getElementById("veg-menu").innerHTML = vegCount;
    document.getElementById("Nonveg-menu").innerHTML = nonVegCount;
    document.getElementById("egg-menu").innerHTML = eggCount;
  } catch (err) {
    console.log("Error fetching items", err);
  }
}

window.display = function (items) {
  const body = document.getElementById("itemTableBody");
  body.innerHTML = "";
  items.forEach((item) => {
    body.innerHTML += `
     <tr class="hover:bg-gray-50 border-b border-gray-300 ">
                                    <td class="px-6 py-3 text-sm">${item?.groupName}</td>
                                    <td class="px-6 py-3 text-sm">${item?.itemCode}</td>
                                    <td class="px-6 py-3 text-sm font-medium">${item?.itemName}</td>
                                    <td class="px-6 py-3 text-sm">-</td>
                                    <td class="px-6 py-3 text-sm tabular-nums">${item?.rate}</td>
                                    <td class="px-6 py-3 text-sm tabular-nums">${item?.specialRate}</td>
                                    <td class="px-6 py-3 text-sm tabular-nums">${item?.tax}</td>
                                    <td class="px-6 py-3 text-sm ">
                                        <div class="flex justify-center items-center gap-4"> <button
                                                  onclick="editItems('${item._id}', '${item.itemName}', '${item.itemCode}', '${item.groupName}', ${item.rate}, ${item.specialRate}, ${item.tax})"
                                                class=" w-9 h-9 rounded-lg border-none text-blue-500 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 flex items-center justify-center group">
                                                <i class="fa-solid fa-pen group-hover:text-amber-300"></i> </button>
                                            <button
                                                 onclick="deleteItem('${item._id}')"
                                                class="w-9 h-9 rounded-lg border-none text-red-500 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200 flex items-center justify-center group ">
                                                <i class="fa-solid fa-trash group-hover:text-red-600"></i> </button>
                                        </div>
                                    </td>
                                </tr>
    `;
  });
};

//serach items ---
window.searchItems = async function () {
  const searchValue = document.getElementById("searchItem").value.trim();

  try {
    const result = await getItem(searchValue);
    if (result.status === 200) {
      allItems = result.data;
      filteredItems = [...allItems];
      currentPage = 1;
      renderPage();
    }
  } catch (error) {
    console.log(error);
  }
};

//delete item ----
window.deleteItem = async function (id) {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true,
    customClass: {
      confirmButton: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded",
      cancelButton: "bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded",
    },
  });

  if (result.isConfirmed) {
    try {
      const response = await removeItem(id);

      if (response.status === 200) {
        showToast("Item deleted successfully", "success");
        loadItems();
      }
    } catch (error) {
      showToast("Failed to delete item", "error");
    }
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    showToast("Deletion cancelled", "warning");
  }
};


// update item
window.editItems = function (
  id,
  itemName,
  itemCode,
  groupName,
  rate,
  specialRate,
  tax
) {
  currentEditId = id;
  document.getElementById("itemName").value = itemName;
  document.getElementById("itemCode").value = itemCode;
  document.getElementById("groupName").value = groupName;
  document.getElementById("rate").value = rate;
  document.getElementById("specialRate").value = specialRate;
  document.getElementById("tax").value = tax;

  openModal();
};
