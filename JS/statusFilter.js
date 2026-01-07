const arrows = document.getElementById('statusFilter')
const icon =document.getElementById('selectIcon')

arrows.addEventListener('focus',()=>{
    icon.classList.remove("fa-angle-down")
    icon.classList.add("fa-angle-up")
})
arrows.addEventListener("change", () => {
  icon.classList.remove("fa-angle-up");
  icon.classList.add("fa-angle-down");
});
arrows.addEventListener('blur',()=>{
    icon.classList.remove("fa-angle-up")
    icon.classList.add("fa-angle-down")
})

