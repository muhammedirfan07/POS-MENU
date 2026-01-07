function openModal() {
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('modal').classList.add('flex');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  document.getElementById('modal').classList.remove('flex');

}

document.getElementById('modal').addEventListener('click', function (e) {
  if (e.target === this) {
    closeModal();
  }
});
function modalClear(){
  document.getElementById("itemName").value=""
  document.getElementById("itemCode").value=""
  document.getElementById("groupName").value=""
  document.getElementById("rate").value=0
  document.getElementById("specialRate").value=0
  document.getElementById("tax").value=0

}
