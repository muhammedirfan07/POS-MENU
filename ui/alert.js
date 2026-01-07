// Toast helper
const showToast = (message, type = "success") => {
  Swal.fire({
    toast: true,            
    position: "bottom-end", 
    icon: type,            
    title: message,
    showConfirmButton: false,
    timer: 2000,            
    timerProgressBar: true,
    background: "#fff",
    color: "#000",
    customClass: {
      popup: "shadow-lg rounded-lg px-4 py-2", 
    },
  });
};

