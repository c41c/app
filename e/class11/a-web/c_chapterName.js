const lockSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" class="chapName_lock_icon" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
  </svg>
`;
 const ayuHex = {
  toHex(str) {
    return Array.from(str)
      .map(ch => ch.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  }
};

function stringToHex(str) {
  let hex = "";
  for (let i = 0; i < str.length; i++) {
    hex += str.charCodeAt(i).toString(16).padStart(2, "0");
  }
  return hex;
}

 const confirmContainer = document.getElementById("confirmContainer");
 const sendBtn = document.getElementById("sendBtn");
 let selectedCode = null;
 let selectedIndex = null;
 // Loop through chapters
document.querySelectorAll(".chapName_chapter_box").forEach(box => {
 const chapName_code = box.getAttribute("chap_code");
 const chap_index = box.getAttribute("chap_index");
 
 let chap_data = {
    "chapter_index": `chapter${chap_index}`,
    "ex_time": time_ex
 }
 let incript_chap_data_json = JSON.stringify(chap_data);
 const incript_chap_data = stringToHex(incript_chap_data_json);
 const incript_index = ayuHex.toHex(`chapter${chap_index}`);
 const chap_subject = box.closest(".chapName_container").getAttribute("data_subject"); // 👈

const chap_key = findKeyForCode(chapName_code);
let web_url = `https://c41c.github.io/app/e/class11/${chap_subject}/?inc=${incript_chap_data}`;
// Define the list of codes that should skip lock/time logic
const specialCodes = ["note11p1", "note11b1", "formula11p1", "formula11c1"];
if (specialCodes.includes(chapName_code)) {
  // Example: https://c41c.github.io/app/e/class11/p11n/?inc=63686170746
  box.addEventListener("click", () => {
    window.location.href = web_url;
  });
  return;
}


// Helper: find which key contains this code
function findKeyForCode(chapName_code) {
  const unlocked = student_Data?.unlocked || {};
  for (const [key, codes] of Object.entries(unlocked)) {
    if (codes.includes(chapName_code)) {
      return key;
    }
  }
  return null;
}


 // Helper: format time difference
 function formatRelativeTime(unixSeconds) {
  const now = Math.floor(Date.now() / 1000);
  const target = parseInt(unixSeconds, 10);
  const diff = target - now;                 // +future, -past
  const abs = Math.abs(diff);

  let value, unit;
  if (abs < 3600) {
    // Minutes
    value = Math.max(1, Math.floor(abs / 60));
    unit = "min";
  } 
  else if (abs < 86400) {
    // Hours
    value = Math.floor(abs / 3600);
    unit = "H";
  } 
  else {
    // Days
    value = Math.floor(abs / 86400);
    unit = "D";
  }
  return diff >= 0 ? `${value}${unit}` : `${value}${unit} ago`;
}



   if (!chap_key) {
     // No key → locked
     box.classList.add("chapName_locked");
     box.insertAdjacentHTML("beforeend", lockSVG);
     
     box.addEventListener("click", () => {
       selectedCode = chapName_code;
       selectedIndex = chap_index;
       sendBtn.textContent = `Unlock All/Half Chapters with Chapter ${chap_index} in Bot`;
       confirmContainer.style.display = "flex";
     });
   } else {
     const now = Math.floor(Date.now() / 1000);
     const keyTime = parseInt(chap_key, 10);
     
     if (keyTime < now) {
       // ⛔ Time passed → lock chapter
       box.classList.add("chapName_locked");
       box.insertAdjacentHTML("beforeend", lockSVG);
       
       const relativeTime = formatRelativeTime(chap_key);
       box.insertAdjacentHTML("beforeend", `<div class="chapName_chapter_time">${relativeTime}</div>`);
       
       box.addEventListener("click", () => {
         selectedCode = chapName_code;
         selectedIndex = chap_index;
         sendBtn.textContent = `Unlock All/Half Chapters with Chapter ${chap_index} in Bot`;
         confirmContainer.style.display = "flex";
       });
     } else {
       // ✅ Time not passed → unlocked
       const relativeTime = formatRelativeTime(chap_key);
       box.insertAdjacentHTML("beforeend", `<div class="chapName_chapter_time">${relativeTime}</div>`);
       
       box.addEventListener("click", () => {
         /*
         window.location.href = `https://xxxxxvxxvxxx.github.io/letscode/${subject}.html?chapter=chapter${index}`;
         https://c41c.github.io/app/e/class11/p11n/?inc=6368617074657232
         */
         window.location.href = web_url;
       });
     }
   }
 });
 // Send button handler
 sendBtn.addEventListener("click", handleSend);
 
function handleSend() {
  if (!selectedCode) return;
  sendBtn.innerHTML = `Request sending... <span class="chapName_spinner"></span>`;
  
  fetch(student_Data.webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: 'chapter_unlock',
      chapName_code: selectedCode,
      info: {
        name: student_Data.name,
        id: student_Data.id,
        class: student_Data.classLevel
      }
    })
  })
  .then(() => {
    sendBtn.textContent = "Open Bot and check your inbox.✅️";
    // keep the same listener, just allow repeated sends
    // optionally reset selectedCode if you want to force re‑selection
  })
  .catch(() => {
    sendBtn.textContent = "Error!";
  });
}

 

    
 /*/ Close confirmation box when clicking outside the section
const safeZones = [
  document.getElementById("out_of_name_contain"),
  document.getElementById("class11_chemistry_chap"),
  document.getElementById("class11_biology_chap"),
  document.getElementById("class11_physics_formulaSheet_chap"),
  document.getElementById("class11_chemistry_formulaSheet_chap")
];

document.addEventListener("click", (event) => {
  const confirmBox = document.getElementById("confirmContainer");

  const clickedInsideSafeZone = safeZones.some(zone => zone && zone.contains(event.target));

  if (
    confirmBox.style.display === "flex" &&
    !clickedInsideSafeZone &&
    !confirmBox.contains(event.target)
  ) {
    confirmBox.style.display = "none";
    selectedCode = null;
    selectedIndex = null;
  }
});
*/
// Close confirmation box when clicking outside ANY chapter container
document.addEventListener("click", (event) => {
  const confirmBox = document.getElementById("confirmContainer");
  if (confirmBox && confirmBox.style.display === "flex") {
    const isInsideContainer = event.target.closest(".chapName_container");
    const isInsideConfirmBox = confirmBox.contains(event.target);
    if (!isInsideContainer && !isInsideConfirmBox) {
      confirmBox.style.display = "none";
      selectedCode = null;
      selectedIndex = null;
    }
  }
});

 // Insert JSON data into box chaper pricing data
  document.getElementById("priceBox_p11n").innerHTML = `
    <div class="price_bo_title">
      Unlock All &#8377;${priceData.p11n_all}
      (Save ${priceData.p11n_saved}%)
    </div>
    <div>
      Half: &#8377;${priceData.p11n_per_chapter_Half} /chapter
      (Total &#8377;${priceData.p11n_total})
    </div>
  `;
    document.getElementById("priceBox_c11n").innerHTML = `
    <div class="price_bo_title">
      Unlock All &#8377;${priceData.c11n_all}
      (Save ${priceData.c11n_saved}%)
    </div>
    <div>
      Half: &#8377;${priceData.c11n_per_chapter_Half} /chapter
      (Total &#8377;${priceData.c11n_total})
    </div>
  `;
    document.getElementById("priceBox_b11n").innerHTML = `
    <div class="price_bo_title">
      Unlock All &#8377;${priceData.b11n_all}
      (Save ${priceData.b11n_saved}%)
    </div>
    <div>
      Half: &#8377;${priceData.b11n_per_chapter_Half} /chapter
      (Total &#8377;${priceData.b11n_total})
    </div>
  `;
    document.getElementById("priceBox_p11fs").innerHTML = `
    <div class="price_bo_title">
      Unlock All &#8377;${priceData.p11fs_all}
      (Save ${priceData.p11fs_saved}%)
    </div>
    <div>
      Half: &#8377;${priceData.p11fs_per_formula_Half} /formula
      (Total &#8377;${priceData.p11fs_total})
    </div>
  `;
  document.getElementById("priceBox_c11fs").innerHTML = `
    <div class="price_bo_title">
      Unlock All &#8377;${priceData.c11fs_all}
      (Save ${priceData.c11fs_saved}%)
    </div>
    <div>
      Half: &#8377;${priceData.c11fs_per_formula_Half} /formula
      (Total &#8377;${priceData.c11fs_total})
    </div>
  `;