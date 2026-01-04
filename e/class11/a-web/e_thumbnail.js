function name_p_n_11() {
  document.querySelectorAll(".content_section").forEach(sec => sec.classList.remove("active"));
  document.getElementById("class11_physics_chap").classList.add("active");
  setActiveIcon("class11_physics_chap");
}
function name_c_n_11() {
  document.querySelectorAll(".content_section").forEach(sec => sec.classList.remove("active"));
  document.getElementById("class11_chemistry_chap").classList.add("active");
  setActiveIcon("class11_chemistry_chap");
}
function name_b_n_11() {
  document.querySelectorAll(".content_section").forEach(sec => sec.classList.remove("active"));
  document.getElementById("class11_biology_chap").classList.add("active");
  setActiveIcon("class11_biology_chap");
}
function name_p_fs_11() {
  document.querySelectorAll(".content_section").forEach(sec => sec.classList.remove("active"));
  document.getElementById("class11_physics_formulaSheet_chap").classList.add("active");
  setActiveIcon("class11_physics_formulaSheet_chap");
}
function name_c_fs_11() {
  document.querySelectorAll(".content_section").forEach(sec => sec.classList.remove("active"));
  document.getElementById("class11_chemistry_formulaSheet_chap").classList.add("active");
  setActiveIcon("class11_chemistry_formulaSheet_chap");
}


// Disable Image Dragging Example
document.querySelectorAll("img").forEach(img => {
  img.addEventListener("dragstart", function(e) {
    e.preventDefault();
    alert("This action is not allowed. Error 104!");
  });
});
//Try pressing Ctrl+C, Ctrl+S, Ctrl+U, or Ctrl+P — they won’t work on this page.




// Simulate loading delay
setTimeout(() => {
  document.querySelectorAll(".thumb_cover_card").forEach(card => {
    card.classList.remove("tumb_loading_card");
    card.classList.add("show_card");
  });
}, 1000);
setTimeout(() => {
  document.querySelectorAll(".thumb_formula_card").forEach(card => {
    card.classList.remove("tumb_loading_card");
    card.classList.add("show_formulacard");
  });
}, 1000);

setTimeout(() => {
  document.querySelectorAll(".bg_img_tumb_cl").forEach(card => {
    card.classList.add("bg_img_tumb_cl_show");
  });
}, 1000);