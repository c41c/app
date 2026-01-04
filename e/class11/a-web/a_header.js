/*side menu js code ⚙️⚙️*/
const sideMenu = document.getElementById("head_sideMenu");
const overlay = document.getElementById("overlay");
const options = document.querySelectorAll(".menu-option");

if (is_time > 0){
  function toggleMenu() {
  sideMenu.classList.toggle("active");
  overlay.classList.toggle("active");
}}

// Close menu when clicking outside
overlay.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  overlay.classList.remove("active");
});

// Handle active state on click
options.forEach(option => {
  option.addEventListener("click", (e) => {
    e.preventDefault(); // prevent page reload
    options.forEach(opt => opt.classList.remove("active"));
    option.classList.add("active"); // add active to clicked
  });
});
/*side menu js code⚙️⚙️✅️*/


//🙂typingText🙂
const head_messages = ["You are welcome", "Year 2025-26", "Happy journey"];
let messageIndex = 0;
let charIndex = 0;
let typing = true;
const typingElement = document.getElementById("head_typingText");

function typeAnimation() {
 const currentMessage = head_messages[messageIndex];
 
 if (typing) {
   // Typing forward
   if (charIndex < currentMessage.length) {
     typingElement.textContent += currentMessage.charAt(charIndex);
     charIndex++;
     setTimeout(typeAnimation, 120);
   } else {
     typing = false;
     setTimeout(typeAnimation, 1000); // Pause before deleting
   }
 } else {
   // Deleting backward
   if (charIndex > 0) {
     typingElement.textContent = currentMessage.substring(0, charIndex - 1);
     charIndex--;
     setTimeout(typeAnimation, 60);
   } else {
     typing = true;
     messageIndex = (messageIndex + 1) % head_messages.length; // Switch message
     setTimeout(typeAnimation, 500); // Pause before typing next
   }
 }
}
typeAnimation();
//🙂typingText ✅️


/* Content Protection Event Listeners dragstart*/
document.addEventListener("selectstart", e => e.preventDefault());
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener('dragstart', event => event.preventDefault());
document.addEventListener("keydown", e => {
  const k = e.key.toLowerCase();
  const ctrlOrMeta = e.ctrlKey || e.metaKey;
  if ((ctrlOrMeta && ["c", "x", "v", "s", "u", "a", "p"].includes(k)) || k === "f12" || (ctrlOrMeta && e.shiftKey && ["i", "j", "c", "r"].includes(k))) {
    e.preventDefault();
    if(k === 'p') alert("Something went wrong.");
  }
});

// Block Safari Reader Mode shortcut (Cmd+Shift+R)
document.addEventListener("keydown", function(e) {
  if (e.metaKey && e.shiftKey && e.key.toLowerCase() === "r") {
    e.preventDefault();
    alert("Safari wrong!");
  }
});