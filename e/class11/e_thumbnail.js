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

(function() {
  // Base64 encoded real asset URLs
  const vault = {
    p11: "aHR0cHM6Ly9heXVzaDM0OHJ0Zy5naXRodWIuaW8vZG9jL3RlbGUvc291cmNlL2NvdmVyL3BoeXNpY3NzLU4tY292ci0xMS5wbmc=",
    c11: "aHR0cHM6Ly9heXVzaDM0OHJ0Zy5naXRodWIuaW8vZG9jL3RlbGUvc291cmNlL2Jpb2xvZ3ktTi1jb3ZyLTExLnBuZw==",
    b11: "aHR0cHM6Ly9heXVzaDM0OHJ0Zy5naXRodWIuaW8vZG9jL3RlbGUvc291cmNlL2NoZW1pc3RyeS1OLWNvdm9yLTExLnBuZw=="
  };

  const decode = (key) => atob(vault[key]);

  // Apply real images as backgrounds (hidden from simple src inspection)
  const applyProtectedImage = (id, key) => {
    const card = document.getElementById(id);
    const imgElement = card.querySelector('.thumb_image');
    if (imgElement) {
      // The real image is set as a background, NOT the src
      imgElement.style.backgroundImage = `url('${decode(key)}')`;
      imgElement.style.backgroundSize = 'contain';
      imgElement.style.backgroundRepeat = 'no-repeat';
      imgElement.style.backgroundPosition = 'center';
      // Make the actual <img> (the honeypot) transparent so the background shows through
      imgElement.style.opacity = "1";
      imgElement.style.filter = "alpha(opacity=0)"; // Legacy support
    }
  };

  // Initialize protection on load
  window.addEventListener('DOMContentLoaded', () => {
    applyProtectedImage('card_physics', 'p11');
    applyProtectedImage('card_chem', 'c11');
    applyProtectedImage('card_bio', 'b11');

    // Disable Right-Click on the entire container
    const container = document.getElementById('protected_container');
    container.addEventListener('contextmenu', e => e.preventDefault());
    
    // Disable keyboard shortcuts for saving (Ctrl+S, Ctrl+U)
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey && (e.key === 's' || e.key === 'u')) || (e.keyCode === 123)) {
        e.preventDefault();
      }
    });
  });
})();
