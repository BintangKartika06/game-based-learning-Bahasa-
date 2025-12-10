
const sections = {
  home: document.getElementById("home-section"),
  game: document.getElementById("game-section"),
  admin: document.getElementById("admin-section"),
};

const navButtons = document.querySelectorAll(".nav-btn");

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    navButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    if (btn.id === "btn-home") showSection("home");
    else if (btn.id === "btn-game") showSection("game");
    else if (btn.id === "btn-admin") showSection("admin");
  });
});

function showSection(name) {
  for (const sec in sections) {
    if (sec === name) sections[sec].classList.add("active-section");
    else sections[sec].classList.remove("active-section");
  }
  
  if (name !== "admin") {
    document.getElementById("admin-message").textContent = "";
  }
  if (name === "game") {
    showStage1();
  }
}



document.getElementById("start-game-btn").addEventListener("click", () => {
  // Activate the game button in navigation
  document.getElementById("btn-game").click();
  
  // Show Stage 1 of the game
  showStage1();
});




const stage1 = {
  questions: [
    {
      question: "Apa arti kata 'rumah' dalam Bahasa Indonesia?",
      options: ["Tempat tinggal", "Kendaraan", "Makanan", "Hewan"],
      correct: 0,
    },
    {
      question: "Susun kata dari huruf: a t k a",
      options: ["Kata", "Atak", "Taka", "Akta"],
      correct: 0,
    },
    {
      question: "Apa fungsi Bahasa Indonesia sebagai bahasa nasional?",
      options: [
        "Hanya untuk sekolah",
        "Alat komunikasi antar suku",
        "Bahasa asing",
        "Hanya untuk bisnis",
      ],
      correct: 1,
    },
    {
      question: "Susun kata dari huruf: e m a k n a",
      options: ["makna", "maknae", "makena", "makane"],
      correct: 0,
    },
    {
      question: "Apa contoh kata kerja dalam Bahasa Indonesia?",
      options: ["Cepat", "Makan", "Biru", "Meja"],
      correct: 1,
    },
    {
      question: "Susun kata dari huruf: i n d o n e s i a",
      options: ["Indonesia", "Indoneisa", "Inodesia", "Indosia"],
      correct: 0,
    },
    {
      question: "Mengapa Bahasa Indonesia penting untuk pendidikan?",
      options: [
        "Hanya untuk anak kecil",
        "Alat utama belajar di sekolah",
        "Bahasa rahasia",
        "Tidak penting",
      ],
      correct: 1,
    },
    {
      question: "Susun kata dari huruf: p e n d i d i k a n",
      options: ["Pendidikan", "Pendidikan", "Pendikidan", "Pendidikan"],
      correct: 0,
    },
    {
      question: "Apa peran Bahasa Indonesia dalam identitas nasional?",
      options: [
        "Memisahkan suku",
        "Menyatukan bangsa",
        "Hanya untuk turis",
        "Bahasa kuno",
      ],
      correct: 1,
    },
    {
      question: "Susun kata dari huruf: k o m u n i k a s i",
      options: ["Komunikasi", "Komunikasi", "Komuniksi", "Komunikasi"],
      correct: 0,
    },
  ],
  currentLevel: 0,
  attempts: 3,
};

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const messageEl = document.getElementById("message");
const attemptsEl = document.getElementById("attempts");
const btnAnswer = document.getElementById("btn-answer");
const btnStage2 = document.getElementById("btn-stage2");
const stage1Div = document.getElementById("stage1");
const stage2Div = document.getElementById("stage2");

btnAnswer.addEventListener("click", () => {
  checkAnswer();
});

btnStage2.addEventListener("click", () => {
  showStage2();
});

document.getElementById("btn-back-home1").addEventListener("click", () => {
  showSection("home");
  resetStage1();
});

function loadStage1Question() {
  const q = stage1.questions[stage1.currentLevel];
  questionEl.textContent = q.question;
  attemptsEl.textContent = stage1.attempts;
  messageEl.textContent = "";
  let htmlOptions = "";
  q.options.forEach((opt, idx) => {
    htmlOptions += `<div class="option">
      <input type="radio" id="opt${idx}" name="answer" value="${idx}" />
      <label for="opt${idx}">${opt}</label>
    </div>`;
  });
  optionsEl.innerHTML = htmlOptions;
}

function checkAnswer() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    messageEl.style.color = "#d32f2f";
    messageEl.textContent = "Pilih salah satu opsi!";
    return;
  }
  const ans = parseInt(selected.value);
  const currentQ = stage1.questions[stage1.currentLevel];
  if (ans === currentQ.correct) {
    messageEl.style.color = "#2e7d32";
    messageEl.textContent =
      "Benar! Bahasa Indonesia penting untuk komunikasi dan identitas nasional. Lanjut ke level berikutnya!";
    stage1.currentLevel++;
    stage1.attempts = 3;

    if (stage1.currentLevel >= stage1.questions.length) {
      alert("Selamat! Anda menyelesaikan semua level Stage 1!");
      btnStage2.style.display = "inline-block";
      questionEl.textContent = "Game selesai. Silakan lanjut ke Stage 2.";
      optionsEl.innerHTML = "";
      messageEl.textContent = "";
      attemptsEl.textContent = "";
      btnAnswer.style.display = "none";
    } else {
      btnStage2.style.display = "none";
      btnAnswer.disabled = true;
      setTimeout(() => {
        btnAnswer.disabled = false;
        loadStage1Question();
      }, 1600);
    }
  } else {
    stage1.attempts--;
    if (stage1.attempts > 0) {
      messageEl.style.color = "#d32f2f";
      messageEl.textContent = `Salah! Coba lagi. Kesempatan tersisa: ${stage1.attempts}`;
      attemptsEl.textContent = stage1.attempts;
    } else {
      messageEl.style.color = "#d32f2f";
      messageEl.textContent = `Game Over level ini. Jawaban benar: ${currentQ.options[currentQ.correct]}. Mulai ulang level.`;
      stage1.attempts = 3;
      attemptsEl.textContent = stage1.attempts;
      btnAnswer.disabled = true;
      setTimeout(() => {
        btnAnswer.disabled = false;
        loadStage1Question();
      }, 2500);
    }
  }
}

function showStage1() {
  stage1Div.style.display = "block";
  stage2Div.style.display = "none";
  btnStage2.style.display = "none";
  btnAnswer.style.display = "inline-block";
  loadStage1Question();
}

function resetStage1() {
  stage1.currentLevel = 0;
  stage1.attempts = 3;
  btnStage2.style.display = "none";
  btnAnswer.style.display = "inline-block";
  messageEl.textContent = "";
  attemptsEl.textContent = stage1.attempts;
  loadStage1Question();
}

//<<<<<<<<<<<<INI STAGE 2>>>>>>>>>>>>>>>>>>>
let stage2Words = [
  { text: "berdiri", category: "kata-kerja" },
  { text: "malas", category: "kata-sifat" },
  { text: "pensil", category: "kata-benda" },
  { text: "bermain", category: "kata-kerja" },
  { text: "duduk", category: "kata-kerja" },
  { text: "pendek", category: "kata-sifat" },
  { text: "piano", category: "kata-benda" },
  { text: "minum", category: "kata-kerja" },
  { text: "rajin", category: "kata-sifat" },
  { text: "gajah", category: "kata-benda" },
  { text: "buku", category: "kata-benda" },
  { text: "makan", category: "kata-kerja" },
  { text: "kursi", category: "kata-benda" },
  { text: "baru", category: "kata-sifat" },
  { text: "gendang", category: "kata-benda" },
  { text: "cantik", category: "kata-sifat" },
  { text: "bersih", category: "kata-sifat" },
  { text: "berlari", category: "kata-kerja" },
  { text: "tinggi", category: "kata-sifat" },
  { text: "kotor", category: "kata-sifat" },
  { text: "semut", category: "kata-benda" },
  { text: "bernyanyi", category: "kata-kerja" },
  { text: "menari", category: "kata-kerja" },
];

const wordBankEl = document.getElementById("word-bank");
const resultMessageEl = document.getElementById("result-message");

function initWordBank() {
  wordBankEl.innerHTML = "";
  stage2Words.forEach((word, i) => {
    const span = document.createElement("div");
    span.className = "word";
    span.textContent = word.text;
    span.setAttribute("draggable", "true");
    span.id = "word-" + i;
    span.dataset.category = word.category;
    span.addEventListener("dragstart", drag);
    wordBankEl.appendChild(span);
  });
  resultMessageEl.textContent = "";
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const dragged = document.getElementById(data);
  if (ev.target.classList.contains("dropzone")) {
    ev.target.appendChild(dragged);
  } else if (ev.target.classList.contains("word")) {
    ev.target.parentElement.appendChild(dragged);
  }
}

function checkStage2Answers() {
  let correctCount = 0;
  const total = stage2Words.length;

  for (let i = 0; i < total; i++) {
    const wEl = document.getElementById("word-" + i);
    const parent = wEl.parentElement;
    if (
      parent &&
      parent.id === stage2Words[i].category.replace("kata-", "drop-")
    ) {
      correctCount++;
    }
  }

  if (correctCount === total) {
    resultMessageEl.style.color = "#2e7d32";
    resultMessageEl.textContent =
      "Selamat! Semua kata sudah pada kategori yang benar.";
  } else {
    resultMessageEl.style.color = "#d32f2f";
    resultMessageEl.textContent = `Masih ada ${
      total - correctCount
    } kata yang salah tempat. Coba lagi ya!`;
  }
}

document.getElementById("btn-check-stage2").addEventListener("click", () => {
  checkStage2Answers();
});
document.getElementById("btn-back-stage1").addEventListener("click", () => {
  showStage1();
});
document.getElementById("btn-back-home2").addEventListener("click", () => {
  showSection("home");
  resetStage1();
});

function showStage2() {
  stage1Div.style.display = "none";
  stage2Div.style.display = "block";
  initWordBank();
  resultMessageEl.textContent = "";
}

//<<<<<<<<Admin Panel>>>>>>>>>>>>
const adminStage1Div = document.getElementById("admin-stage1");
const adminStage2Div = document.getElementById("admin-stage2");
const saveStage1Btn = document.getElementById("save-stage1");
const saveStage2Btn = document.getElementById("save-stage2");
const adminMessage = document.getElementById("admin-message");

function loadAdminStage1() {
  adminStage1Div.innerHTML = "";
  stage1.questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "admin-level";
    div.innerHTML = `
      <label>Level ${i + 1} - Soal:</label>
      <input type="text" id="adm-q-${i}" value="${q.question}" />
      <label>Opsi 1:</label>
      <input type="text" id="adm-o0-${i}" value="${q.options[0]}" />
      <label>Opsi 2:</label>
      <input type="text" id="adm-o1-${i}" value="${q.options[1]}" />
      <label>Opsi 3:</label>
      <input type="text" id="adm-o2-${i}" value="${q.options[2]}" />
      <label>Opsi 4:</label>
      <input type="text" id="adm-o3-${i}" value="${q.options[3]}" />
      <label>Jawaban Benar (0-3):</label>
      <input type="number" min="0" max="3" id="adm-correct-${i}" value="${q.correct}" />
    `;
    adminStage1Div.appendChild(div);
  });
}

function saveAdminStage1() {
  let errors = 0;
  stage1.questions.forEach((_, i) => {
    const qText = document.getElementById(`adm-q-${i}`).value.trim();
    const opt0 = document.getElementById(`adm-o0-${i}`).value.trim();
    const opt1 = document.getElementById(`adm-o1-${i}`).value.trim();
    const opt2 = document.getElementById(`adm-o2-${i}`).value.trim();
    const opt3 = document.getElementById(`adm-o3-${i}`).value.trim();
    const correct = Number(document.getElementById(`adm-correct-${i}`).value);

    
    if (
      !qText ||
      !opt0 ||
      !opt1 ||
      !opt2 ||
      !opt3 ||
      isNaN(correct) ||
      correct < 0 ||
      correct > 3
    ) {
      errors++;
      return;
    }

    stage1.questions[i] = {
      question: qText,
      options: [opt0, opt1, opt2, opt3],
      correct: correct,
    };
  });

  if (errors) {
    adminMessage.style.color = "#d32f2f";
    adminMessage.textContent = "Mohon isi semua field dengan benar.";
  } else {
    adminMessage.style.color = "#2e7d32";
    adminMessage.textContent = "Soal Stage 1 berhasil disimpan.";
    resetStage1();
  }
}

function loadAdminStage2() {
  adminStage2Div.innerHTML = "";
  stage2Words.forEach((word, i) => {
    const div = document.createElement("div");
    div.className = "admin-level";
    div.innerHTML = `
      <label>Kata ke-${i + 1}:</label>
      <input type="text" id="adm-word-${i}" value="${word.text}" />
      <label>Kategori:</label>
      <select id="adm-cat-${i}">
        <option value="kata-sifat" ${
          word.category === "kata-sifat" ? "selected" : ""
        }>Kata Sifat</option>
        <option value="kata-kerja" ${
          word.category === "kata-kerja" ? "selected" : ""
        }>Kata Kerja</option>
        <option value="kata-benda" ${
          word.category === "kata-benda" ? "selected" : ""
        }>Kata Benda</option>
      </select>
    `;
    adminStage2Div.appendChild(div);
  });
}

function saveAdminStage2() {
  let errors = 0;
  stage2Words = [];
  const len = adminStage2Div.children.length;
  for(let i=0; i < len; i++) {
    const wordText = document.getElementById(`adm-word-${i}`).value.trim();
    const category = document.getElementById(`adm-cat-${i}`).value;

    if(!wordText || !category) {
      errors++;
      continue;
    }

    stage2Words.push({ text: wordText, category: category });
  }
  if(errors) {
    adminMessage.style.color = "#d32f2f";
    adminMessage.textContent = "Mohon isi semua field Kata & Kategori dengan benar.";
  } else {
    adminMessage.style.color = "#2e7d32";
    adminMessage.textContent = "Soal Stage 2 berhasil disimpan.";
  }
}



saveStage1Btn.addEventListener("click", saveAdminStage1);
saveStage2Btn.addEventListener("click", saveAdminStage2);

document.getElementById("btn-back-home-admin").addEventListener("click", () => {
  showSection("home");
  adminMessage.textContent = "";
});


document.getElementById("btn-admin").addEventListener("click", () => {
  loadAdminStage1();
  loadAdminStage2();
});


showSection("home");
resetStage1();