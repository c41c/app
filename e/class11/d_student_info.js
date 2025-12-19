(function() {
  // Encoded URLs
  const imgData = {
    girl: "aHR0cHM6Ly9jNDFjLmdpdGh1Yi5pby9hcHAvZS9maWxlL3N2Zy9wcm9maWxlL2dpcmwtcGVyc29uLnN2Zw==",
    boy: "aHR0cHM6Ly9jNDFjLmdpdGh1Yi5pby9hcHAvZS9maWxlL3N2Zy9wcm9maWxlL2JveS1wZXJzb24uc3Zn",
    hidden: "aHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZHVyemlwZGJxL2ltYWdlL3VwbG9hZC92MTc2NTg5MTI1NS9ub3VnaHR5X2l5enQ5bC5qcGc="
  };

  // Helper to decode and set images
  const getUrl = (key) => atob(imgData[key]);

  // 1. Populate Profile Info 
  document.getElementById('std_profileName').textContent = student_Data.name;
  document.getElementById('std_profileClass').textContent = student_Data.classLevel;

  // 2. Set Avatar with encoded logic [cite: 7]
  const std_avatarImg = document.querySelector('.std_avatar_image');
  const isFemale = student_Data.gender.toLowerCase() === "female";
  std_avatarImg.src = getUrl(isFemale ? 'girl' : 'boy');

  // 3. Security: Disable Right-Click on student section 
  const container = document.getElementById('std_student');
  container.addEventListener('contextmenu', e => e.preventDefault());

  // 4. Toggle Contact Logic [cite: 8, 9, 10]
  window.std_toggleContact = function() {
    const socialContainer = document.getElementById('std_socialContainer');
    const arrow = document.getElementById('std_arrowIcon');
    const msgBox = document.getElementById('std_messageBox');
    
    socialContainer.classList.toggle('std_collapsed');
    arrow.classList.toggle('std_rotated');
    
    if (msgBox && msgBox.style.display === 'block') {
      msgBox.style.display = 'none';
    }
  };

  // 5. Gmail Icon Toggle [cite: 11]
  const gmailIcon = document.querySelector('#std_gmail');
  if (gmailIcon) {
    gmailIcon.closest('.std_icon_link').addEventListener('click', function(e) {
      e.preventDefault();
      const box = document.getElementById('std_messageBox');
      box.style.display = (box.style.display === 'block') ? 'none' : 'block';
    });
  }

  // 6. Send Message Handler 
  const sendBtn = document.getElementById('std_sendMessageBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', function() {
      const msg = document.getElementById('std_messageInput').value.trim();
      const status = document.getElementById('std_statusMsg');
      
      if (!msg) {
        status.textContent = "Please enter a message.";
        return;
      }
      
      status.textContent = "Sending...";
      
      fetch(student_Data.webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          type:'suggestion', 
          text_msg: msg, 
          info: { name: student_Data.name, id: student_Data.id, class: student_Data.classLevel } 
        })
      })
      .then(() => {
        status.textContent = "Message sent successfully ✅";
        document.getElementById('std_messageInput').value = "";
      })
      .catch(() => { status.textContent = "Error sending message ❌"; });
    });
  }

  // 7. Menu Button (ID Toggle) [cite: 13]
  document.querySelector('.std_menu_btn').addEventListener('click', function() {
    const idBox = document.getElementById('std_idBox');
    if (idBox.style.display === 'block') {
      idBox.style.display = 'none';
    } else {
      idBox.textContent = "ID: " + student_Data.id;
      idBox.style.display = 'block';
    }
  });

  // 8. Click Away to Hide [cite: 14]
  document.addEventListener("click", (event) => {
    const messbox_section = document.getElementById("std_student");
    const messbox_box = document.getElementById('std_messageBox');
    if (messbox_box && messbox_box.style.display === 'block' &&
      !messbox_section.contains(event.target)) {
      messbox_box.style.display = 'none';
    }
  });
})();
