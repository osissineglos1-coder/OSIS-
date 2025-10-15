// ====== WELCOME ANIMATION ======
window.onload = () => {
  let jam = new Date().getHours();
  let sapa =
    jam < 11 ? "Selamat pagi ☀️" :
    jam < 15 ? "Selamat siang 🌤️" :
    jam < 18 ? "Selamat sore 🌇" :
    "Selamat malam 🌙";
  document.getElementById("greeting").innerText = sapa;
};

// ====== LOGIN ======
function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const msg = document.getElementById("message");

  if (user === "admin" && pass === "osis123") {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("admin-panel").style.display = "block";
    document.getElementById("adminWelcome").innerText = `Halo Admin Nayla A.R 👋`;
    userRole = "admin";
    loadData();
  } else if (user === "siswa" && pass === "12345") {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("home").style.display = "block";
    userRole = "siswa";
    tampilDataUntukSiswa();
  } else if (user === "pembina" && pass === "guru123") {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("pembina-panel").style.display = "block";
    document.getElementById("pembinaWelcome").innerText = `Halo, Pembina OSIS 👩‍🏫`;
    userRole = "pembina";
    tampilDataPembina();
  } else {
    msg.innerText = "❌ Username atau password salah!";
    msg.style.color = "red";
  }
}

let userRole = "";

// ====== LOGOUT ======
function logout() {
  location.reload();
}

// ====== DATA LOCAL STORAGE ======
let kegiatan = JSON.parse(localStorage.getItem("kegiatan")) || [];
let pengumuman = JSON.parse(localStorage.getItem("pengumuman")) || [];
let galeri = JSON.parse(localStorage.getItem("galeri")) || [];

// ====== PANEL ADMIN ======
function showAdminMenu(menu) {
  const area = document.getElementById("adminContent");
  if (menu === "kegiatan") {
    area.innerHTML = `
      <h3>📅 Daftar Kegiatan</h3>
      <input id="namaKegiatan" placeholder="Nama kegiatan" />
      <button onclick="tambahKegiatan()">Tambah</button>
      <ul id="listKegiatan"></ul>
    `;
    loadKegiatan();
  } else if (menu === "pengumuman") {
    area.innerHTML = `
      <h3>📢 Pengumuman</h3>
      <textarea id="teksPengumuman" placeholder="Tulis pengumuman baru..."></textarea>
      <button onclick="tambahPengumuman()">Tambah</button>
      <ul id="listPengumuman"></ul>
    `;
    loadPengumuman();
  } else if (menu === "galeri") {
    area.innerHTML = `
      <h3>🖼️ Galeri</h3>
      <input id="urlFoto" placeholder="URL Gambar" />
      <button onclick="tambahFoto()">Tambah</button>
      <div id="galeriContainer" class="galeri"></div>
    `;
    loadGaleri();
  } else if (menu === "anggota") {
    area.innerHTML = `
      <h3>👥 Pengurus OSIS</h3>
      <table border="1" style="margin:auto;border-collapse:collapse;">
        <tr><th>Nama</th><th>Jabatan</th></tr>
        <tr><td>Nayla A.R</td><td>Ketua</td></tr>
        <tr><td>Zaura</td><td>Wakil Ketua</td></tr>
        <tr><td>Fina</td><td>Sekretaris</td></tr>
        <tr><td>Dina</td><td>Bendahara</td></tr>
      </table>
    `;
  }
}

// ====== ADMIN CRUD ======
function tambahKegiatan() {
  let nama = document.getElementById("namaKegiatan").value;
  if (nama) {
    kegiatan.push(nama);
    localStorage.setItem("kegiatan", JSON.stringify(kegiatan));
    loadKegiatan();
  }
}
function loadKegiatan() {
  const list = document.getElementById("listKegiatan");
  if (list) list.innerHTML = kegiatan.map((k,i)=>`<li>${k} <button onclick="hapusKegiatan(${i})">❌</button></li>`).join("");
}
function hapusKegiatan(i){kegiatan.splice(i,1);localStorage.setItem("kegiatan",JSON.stringify(kegiatan));loadKegiatan();}

function tambahPengumuman(){
  let teks=document.getElementById("teksPengumuman").value;
  if(teks){pengumuman.push(teks);localStorage.setItem("pengumuman",JSON.stringify(pengumuman));loadPengumuman();}
}
function loadPengumuman(){
  const list=document.getElementById("listPengumuman");
  if(list)list.innerHTML=pengumuman.map((p,i)=>`<li>${p} <button onclick="hapusPengumuman(${i})">❌</button></li>`).join("");
}
function hapusPengumuman(i){pengumuman.splice(i,1);localStorage.setItem("pengumuman",JSON.stringify(pengumuman));loadPengumuman();}

function tambahFoto(){
  let url=document.getElementById("urlFoto").value;
  if(url){galeri.push(url);localStorage.setItem("galeri",JSON.stringify(galeri));loadGaleri();}
}
function loadGaleri(){
  const g=document.getElementById("galeriContainer");
  if(g)g.innerHTML=galeri.map((u,i)=>`<div><img src="${u}" width="100"><br><button onclick="hapusFoto(${i})">Hapus</button></div>`).join("");
}
function hapusFoto(i){galeri.splice(i,1);localStorage.setItem("galeri",JSON.stringify(galeri));loadGaleri();}

// ====== SISWA VIEW ======
function tampilDataUntukSiswa(){
  let p=document.getElementById("pengumumanList");
  let k=document.getElementById("kegiatanList");
  let g=document.getElementById("galeriView");
  p.innerHTML=pengumuman.map(p=>`<li>${p}</li>`).join("") || "<li>Belum ada pengumuman</li>";
  k.innerHTML=kegiatan.map(k=>`<li>${k}</li>`).join("") || "<li>Belum ada kegiatan</li>";
  g.innerHTML=galeri.map(u=>`<img src="${u}" width="100">`).join("") || "Belum ada foto.";
}

// ====== PEMBINA VIEW ======
function tampilDataPembina(){
  document.getElementById("pembinaKegiatan").innerHTML = kegiatan.map(k => `<li>${k}</li>`).join("") || "<li>Belum ada kegiatan</li>";
  document.getElementById("pembinaPengumuman").innerHTML = pengumuman.map(p => `<li>${p}</li>`).join("") || "<li>Belum ada pengumuman</li>";
  document.getElementById("pembinaGaleri").innerHTML = galeri.map(u => `<img src='${u}' width='100'>`).join("") || "Belum ada foto.";
}

// ====== SCROLL TOP ======
window.onscroll = () => {
  document.getElementById("topBtn").style.display =
    document.documentElement.scrollTop > 200 ? "block" : "none";
};
function scrollToTop(){window.scrollTo({top:0,behavior:"smooth"});}