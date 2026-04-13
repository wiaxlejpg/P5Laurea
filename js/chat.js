const chat = document.getElementById("chat");
let index = 0;

/* DIALOGUE TREE */
const messages = [
  { type: "npc", text: "ciao FrangoBoll..", remote: true },

  { type: "npc", text: "Ti stiamo osservando.", remote: true },

  {
    type: "choice",
    options: [
      {
        text: "Chi siete?",
        next: { text: "Noi siamo i pisciazza.", remote: true }
      },
      {
        text: "Cosa volete da me?",
        next: { text: "il tuo cazzo", remote: true }
      }
    ]
  },

  { type: "npc", text: "Ti dobbiamo fare una domanda. Rispondi saggiamente.", remote: true },
  
 {
    type: "choice",
    options: [
      {
        text: "Cosa?",
        next: { text: "Rispondi al seguente quesito e lo scoprirai.", remote: true }
      },
      {
        text: "No!",
        next: { text: "Allora cazzi", remote: true }
      }
    ]
  },

  { type: "npc", text: "Dicci, Frango. Se ocane ha un cane di chi è il cane?", remote: true },

   { type: "choice",
    options: [
      {
        text: "Dio Cane",
        next: { text: "REAL", remote: true }
      },
      {
        text: "Del signor Ocane",
        next: { text: "CAKE", remote: true }
      }
    ]
  },
];

/* NEXT */
function nextMessage() {
  if (index >= messages.length) return;

  const m = messages[index];

  if (m.type === "npc") {
    renderMessage(m.text, m.remote);
    index++;
    return;
  }

  if (m.type === "choice") {
    renderChoice(m.options);
    index++; // IMPORTANT: avanzalo SOLO qui
    return;
  }
}

/* MESSAGE */
function renderMessage(text, remote) {
  const msg = document.createElement("div");
  msg.classList.add("msg", remote ? "left" : "right");

  msg.innerHTML = `
    <img class="avatar" src="${
      remote ? "assets/AVATAR.png" : "assets/USER.jpg"
    }">
    <div class="bubble">${text}</div>
  `;

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

/* CHOICES */
function renderChoice(options) {
  const box = document.createElement("div");
  box.classList.add("choice-box");

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.classList.add("choice-btn");
    btn.textContent = opt.text;

    btn.onclick = () => {
      box.remove();

      renderMessage(opt.text, false);

      setTimeout(() => {
        renderMessage(opt.next.text, opt.next.remote);
      }, 300);
    };

    box.appendChild(btn);
  });

  chat.appendChild(box);
  chat.scrollTop = chat.scrollHeight;
}

/* CLOCK */
function updateClock() {
  const now = new Date();

  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");

  document.getElementById("time").textContent = `${h}:${m}:${s}`;
}

setInterval(updateClock, 1000);
updateClock();