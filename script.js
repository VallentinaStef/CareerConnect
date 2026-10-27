/* CareerConnect — Tugas 5: JavaScript dan jQuery
 * Data simulasi; tidak terhubung dengan JobStreet atau database.
 */
"use strict";
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Nusantara Digital",
    location: "Jakarta",
    type: "Full-time",
    category: "Technology",
    salary: "Rp 5–7 juta",
    posted: "2026-10-20",
    emoji: "💻",
    description:
      "Mengembangkan antarmuka website responsif dan berkolaborasi dengan tim desain.",
    requirements: [
      "Menguasai HTML, CSS, dan JavaScript",
      "Memahami Git dasar",
      "Terbuka untuk fresh graduate",
    ],
  },
  {
    id: 2,
    title: "UI/UX Design Intern",
    company: "Studio Kreatif",
    location: "Bandung",
    type: "Internship",
    category: "Design",
    salary: "Uang saku tersedia",
    posted: "2026-10-19",
    emoji: "🎨",
    description: "Membantu merancang wireframe, prototype, dan riset pengguna.",
    requirements: [
      "Mengenal Figma",
      "Mampu bekerja sama dalam tim",
      "Memiliki portofolio sederhana",
    ],
  },
  {
    id: 3,
    title: "Junior Data Analyst",
    company: "Data Cerdas",
    location: "Remote",
    type: "Full-time",
    category: "Data",
    salary: "Rp 5–8 juta",
    posted: "2026-10-18",
    emoji: "📊",
    description:
      "Mengolah dan menyajikan data bisnis menjadi insight yang mudah dipahami.",
    requirements: [
      "Memahami spreadsheet",
      "Dasar SQL menjadi nilai tambah",
      "Teliti dan komunikatif",
    ],
  },
  {
    id: 4,
    title: "Digital Marketing Staff",
    company: "Karya Media",
    location: "Surabaya",
    type: "Contract",
    category: "Marketing",
    salary: "Rp 4–6 juta",
    posted: "2026-10-17",
    emoji: "📣",
    description:
      "Membantu pengelolaan kampanye pemasaran digital dan media sosial.",
    requirements: [
      "Memahami media sosial",
      "Mampu menulis copy singkat",
      "Bersedia belajar tools analitik",
    ],
  },
  {
    id: 5,
    title: "Backend Developer Intern",
    company: "Awan Teknologi",
    location: "Yogyakarta",
    type: "Internship",
    category: "Technology",
    salary: "Uang saku tersedia",
    posted: "2026-10-16",
    emoji: "⚙️",
    description: "Mempelajari pengembangan REST API dan pengelolaan database.",
    requirements: [
      "Dasar JavaScript atau bahasa backend lain",
      "Memahami konsep database",
      "Mau belajar dan disiplin",
    ],
  },
  {
    id: 6,
    title: "Customer Support Associate",
    company: "Solusi Pelanggan",
    location: "Jakarta",
    type: "Full-time",
    category: "Operations",
    salary: "Rp 4–5 juta",
    posted: "2026-10-15",
    emoji: "🤝",
    description: "Membantu pengguna mengatasi pertanyaan dan kendala layanan.",
    requirements: [
      "Komunikasi yang baik",
      "Menguasai komputer dasar",
      "Terbuka untuk lulusan baru",
    ],
  },
];
const STORE_KEY = "careerconnect_saved_jobs_v1";
const PROFILE_KEY = "careerconnect_profile_v1";
const page = document.body.dataset.page;
const APPLICATIONS_KEY = "careerconnect_applications_demo_v1";
const ADMIN_JOBS_KEY = "careerconnect_admin_jobs_demo_v1";
const SESSION_KEY = "careerconnect_session_demo_v1";
const byId = (id) => document.getElementById(id);
function escapeHTML(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        ch
      ],
  );
}
function safeRead(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
}
function getSavedIds() {
  const value = safeRead(STORE_KEY, []);
  return Array.isArray(value) ? value.filter(Number.isInteger) : [];
}
function allJobs() {
  const custom = safeRead(ADMIN_JOBS_KEY, []);
  return [...jobs, ...(Array.isArray(custom) ? custom : [])];
}
function findJob(id) {
  return allJobs().find((job) => job.id === Number(id));
}
function filterJobs(
  list,
  { keyword = "", location = "", type = "", sort = "newest" } = {},
) {
  const query = keyword.toLocaleLowerCase("id-ID").trim();
  return list
    .filter((job) => {
      const text =
        `${job.title} ${job.company} ${job.category}`.toLocaleLowerCase(
          "id-ID",
        );
      return (
        (!query || text.includes(query)) &&
        (!location || job.location === location) &&
        (!type || job.type === type)
      );
    })
    .sort((a, b) =>
      sort === "az"
        ? a.title.localeCompare(b.title, "id")
        : b.posted.localeCompare(a.posted),
    );
}
function jobCard(job) {
  const saved = getSavedIds().includes(job.id);
  return `<div class="col-md-6 col-xl-4"><article class="job-card d-flex flex-column"><div class="d-flex gap-3 align-items-center mb-3"><div class="company-mark" aria-hidden="true">${job.emoji}</div><div class="min-w-0"><div class="fw-semibold">${escapeHTML(job.company)}</div><small class="text-muted-custom">${escapeHTML(job.category)}</small></div></div><h3 class="h5 fw-bold mb-2">${escapeHTML(job.title)}</h3><p class="text-muted-custom mb-2">📍 ${escapeHTML(job.location)} · ${escapeHTML(job.type)}</p><p class="mb-3 fw-semibold">${escapeHTML(job.salary)}</p><span class="badge badge-soft align-self-start mb-3">Fresh Graduate Friendly</span><div class="mt-auto d-flex gap-2"><a class="btn btn-primary flex-grow-1" href="detail.html?id=${job.id}">Lihat Detail</a><button type="button" class="btn btn-outline-secondary save-job ${saved ? "active" : ""}" data-id="${job.id}" aria-pressed="${saved}" aria-label="${saved ? "Hapus simpanan" : "Simpan"} ${escapeHTML(job.title)}">${saved ? "★" : "☆"}</button></div></article></div>`;
}
function renderCards(target, list) {
  const node = byId(target);
  if (node) node.innerHTML = list.map(jobCard).join("");
}
function showToast(message) {
  const el = byId("toastNotice");
  if (!el) return;
  el.textContent = message;
  if (window.jQuery) {
    $("#toastNotice").stop(true, true).fadeIn(200).delay(1800).fadeOut(300);
  } else {
    el.style.display = "block";
    setTimeout(() => (el.style.display = "none"), 2000);
  }
}
function refreshSaveButtons() {
  document.querySelectorAll(".save-job").forEach((button) => {
    const saved = getSavedIds().includes(Number(button.dataset.id));
    button.classList.toggle("active", saved);
    button.textContent = saved ? "★" : "☆";
    button.setAttribute("aria-pressed", String(saved));
    button.setAttribute(
      "aria-label",
      `${saved ? "Hapus simpanan" : "Simpan"} pekerjaan`,
    );
  });
}
function initHome() {
  const companies = new Set(allJobs().map((job) => job.company));
  byId("statJobs").textContent = allJobs().length;
  byId("statCompanies").textContent = companies.size;
  byId("statRemote").textContent = allJobs().filter(
    (job) => job.location === "Remote",
  ).length;
  renderCards("featuredJobs", filterJobs(allJobs()).slice(0, 3));
  byId("heroSearch")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = byId("homeQuery").value.trim();
    if (query)
      window.location.href = `jobs.html?q=${encodeURIComponent(query)}`;
  });
}
function initJobs() {
  const initialQuery =
    new URLSearchParams(window.location.search).get("q") || "";
  byId("jobKeyword").value = initialQuery;
  const update = () => {
    const result = filterJobs(allJobs(), {
      keyword: byId("jobKeyword").value,
      location: byId("locationFilter").value,
      type: byId("typeFilter").value,
      sort: byId("sortJobs").value,
    });
    renderCards("jobList", result);
    byId("resultCount").textContent =
      `${result.length} dari ${allJobs().length} lowongan ditemukan`;
    byId("emptyJobs").classList.toggle("d-none", result.length !== 0);
  };
  ["jobKeyword", "locationFilter", "typeFilter", "sortJobs"].forEach((id) =>
    byId(id).addEventListener(id === "jobKeyword" ? "input" : "change", update),
  );
  byId("resetFilters").addEventListener("click", () => {
    byId("jobKeyword").value = "";
    byId("locationFilter").value = "";
    byId("typeFilter").value = "";
    byId("sortJobs").value = "newest";
    update();
  });
  update();
}
function initDetail() {
  const id = new URLSearchParams(location.search).get("id");
  const job = findJob(id) || jobs[0];
  byId("jobDetail").innerHTML =
    `<section class="col-lg-8"><div class="detail-hero"><div class="d-flex gap-3 align-items-center mb-3"><div class="company-mark" aria-hidden="true">${job.emoji}</div><div><div class="fw-semibold">${escapeHTML(job.company)}</div><small class="text-muted-custom">${escapeHTML(job.category)}</small></div></div><h1 class="h2 fw-bold">${escapeHTML(job.title)}</h1><p class="text-muted-custom">📍 ${escapeHTML(job.location)} · ${escapeHTML(job.type)} · ${escapeHTML(job.salary)}</p><hr><h2 class="h5 fw-bold">Deskripsi Pekerjaan</h2><p>${escapeHTML(job.description)}</p><h2 class="h5 fw-bold mt-4">Kualifikasi</h2><ul>${job.requirements.map((r) => `<li>${escapeHTML(r)}</li>`).join("")}</ul></div></section><aside class="col-lg-4"><div class="card-panel"><h2 class="h5 fw-bold">Tertarik dengan pekerjaan ini?</h2><p class="text-muted-custom small">CareerConnect masih dalam tahap demo. Lamaran belum dikirim ke perusahaan.</p><a class="btn btn-primary w-100 mb-2" href="applications.html?id=${job.id}">Catat Lamaran</a><button class="btn btn-outline-secondary save-job w-100" data-id="${job.id}" type="button">☆ Simpan Lowongan</button></div></aside>`;
  refreshSaveButtons();
}
function previewProfile(data) {
  const preview = byId("profilePreview");
  if (!preview) return;
  if (!data) {
    preview.innerHTML =
      '<p class="text-muted-custom mb-0">Belum ada profil tersimpan.</p>';
    return;
  }
  preview.innerHTML = `<h3 class="h6 fw-bold">${escapeHTML(data.name)}</h3><p class="small mb-1">${escapeHTML(data.email)}</p><p class="small mb-1">${escapeHTML(data.education)} · ${escapeHTML(data.city)}</p><p class="small mb-1"><strong>Skill:</strong> ${escapeHTML(data.skills)}</p><p class="small mb-0">${escapeHTML(data.summary)}</p>`;
}
function initProfile() {
  const form = byId("profileForm");
  const saved = safeRead(PROFILE_KEY, null);
  if (saved && typeof saved === "object") {
    const values = {
      fullName: saved.name,
      email: saved.email,
      education: saved.education,
      city: saved.city,
      skills: saved.skills,
      summary: saved.summary,
    };
    Object.entries(values).forEach(([id, value]) => {
      if (byId(id)) byId(id).value = value ?? "";
    });
    previewProfile(saved);
  }
  byId("clearProfile").addEventListener("click", () => {
    localStorage.removeItem(PROFILE_KEY);
    form.reset();
    previewProfile(null);
    showToast("Data demo profil telah dihapus.");
  });
}
function wireJQuery() {
  if (!window.jQuery) return;
  $(document).on("click", ".save-job", function () {
    const id = Number($(this).data("id"));
    if (!findJob(id)) return;
    let saved = getSavedIds();
    const exists = saved.includes(id);
    saved = exists ? saved.filter((x) => x !== id) : [...saved, id];
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(saved));
      refreshSaveButtons();
      showToast(
        exists
          ? "Lowongan dihapus dari simpanan."
          : "Lowongan berhasil disimpan!",
      );
      if (page === "saved") initSaved();
    } catch {
      showToast("Browser tidak mengizinkan penyimpanan data.");
    }
  });
  $("#toggleFilters").on("click", function () {
    $("#filterBox")
      .stop(true, true)
      .slideToggle(250, () => {
        $(this)
          .attr(
            "aria-expanded",
            $("#filterBox").is(":visible") ? "true" : "false",
          )
          .text($("#filterBox").is(":visible") ? "Sembunyikan" : "Tampilkan");
      });
  });
  $("#profileForm").on("submit", function (event) {
    event.preventDefault();
    const data = {
      name: $("#fullName").val().trim(),
      email: $("#email").val().trim(),
      education: $("#education").val(),
      city: $("#city").val().trim(),
      skills: $("#skills").val().trim(),
      summary: $("#summary").val().trim(),
    };
    if (
      !data.name ||
      !data.email ||
      !data.education ||
      !data.city ||
      !data.skills
    ) {
      $("#formMessage")
        .text("Mohon lengkapi semua kolom yang bertanda *.")
        .removeClass("d-none")
        .hide()
        .fadeIn(200);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      $("#formMessage")
        .text("Format alamat email tidak valid.")
        .removeClass("d-none")
        .hide()
        .fadeIn(200);
      return;
    }
    $("#formMessage").addClass("d-none");
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
      previewProfile(data);
      showToast("Profil demo berhasil disimpan!");
    } catch {
      $("#formMessage")
        .text("Penyimpanan browser tidak tersedia.")
        .removeClass("d-none");
    }
  });
}

function store(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    showToast("Penyimpanan browser tidak tersedia.");
    return false;
  }
}
function profileMarkup(data) {
  if (!data || !data.name)
    return '<p class="text-muted-custom">Profil belum diisi. Lengkapi di halaman form profil.</p>';
  return `<h2 class="h3">${escapeHTML(data.name)}</h2><p>${escapeHTML(data.email || "")} · ${escapeHTML(data.city || "")}</p><hr><h3 class="h5">Pendidikan</h3><p>${escapeHTML(data.education || "-")}</p><h3 class="h5">Keahlian</h3><p>${escapeHTML(data.skills || "-")}</p><h3 class="h5">Tentang Saya</h3><p>${escapeHTML(data.summary || "-")}</p>`;
}
function initSaved() {
  const ids = getSavedIds();
  const list = allJobs().filter((job) => ids.includes(job.id));
  byId("savedCount").textContent = `${list.length} lowongan tersimpan`;
  renderCards("savedList", list);
  byId("savedEmpty").classList.toggle("d-none", list.length > 0);
}
function initApplication() {
  const select = byId("applicationJob");
  select.innerHTML =
    '<option value="">Pilih lowongan</option>' +
    allJobs()
      .map(
        (job) =>
          `<option value="${job.id}">${escapeHTML(job.title)} — ${escapeHTML(job.company)}</option>`,
      )
      .join("");
  const initial = Number(new URLSearchParams(location.search).get("id"));
  if (findJob(initial)) select.value = String(initial);
  const render = () => {
    const list = safeRead(APPLICATIONS_KEY, []);
    byId("applicationRows").innerHTML = list
      .map(
        (a, i) =>
          `<tr><td>${escapeHTML(findJob(a.id)?.title || "Lowongan dihapus")}</td><td>${escapeHTML(a.status)}</td><td><button type="button" class="btn btn-sm btn-outline-danger delete-application" data-index="${i}">Hapus</button></td></tr>`,
      )
      .join("");
    byId("applicationEmpty").classList.toggle("d-none", list.length > 0);
  };
  byId("applicationForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = Number(select.value);
    if (!findJob(id)) {
      showToast("Pilih lowongan terlebih dahulu.");
      return;
    }
    const list = safeRead(APPLICATIONS_KEY, []);
    list.push({ id, status: byId("applicationStatus").value });
    if (store(APPLICATIONS_KEY, list)) {
      render();
      showToast("Catatan lamaran tersimpan.");
    }
  });
  byId("applicationRows").addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-application");
    if (!btn) return;
    const list = safeRead(APPLICATIONS_KEY, []);
    list.splice(Number(btn.dataset.index), 1);
    store(APPLICATIONS_KEY, list);
    render();
  });
  render();
}
function initCV() {
  byId("cvPreview").innerHTML = profileMarkup(safeRead(PROFILE_KEY, null));
  byId("printCV").addEventListener("click", () => window.print());
}
function initAuth() {
  if (page === "login") {
    byId("loginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const email = byId("loginEmail").value.trim();
      if (!email) return;
      if (store(SESSION_KEY, { email, role: byId("loginRole").value })) {
        location.href =
          byId("loginRole").value === "admin" ? "admin.html" : "profile.html";
      }
    });
  }
  if (page === "register") {
    byId("registerForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const email = byId("regEmail").value.trim(),
        name = byId("regName").value.trim(),
        city = byId("regCity").value.trim();
      if (!name || !email || !city) return;
      if (store(SESSION_KEY, { email, role: "seeker" })) {
        store(PROFILE_KEY, {
          name,
          email,
          city,
          education: "",
          skills: "",
          summary: "",
        });
        location.href = "form.html";
      }
    });
  }
}
function initAdmin() {
  const read = () => {
    const v = safeRead(ADMIN_JOBS_KEY, []);
    return Array.isArray(v) ? v : [];
  };
  const render = () => {
    const list = allJobs();
    byId("adminCount").textContent = list.length;
    byId("adminJobRows").innerHTML = list
      .map(
        (j) =>
          `<tr><td>${escapeHTML(j.title)}</td><td>${escapeHTML(j.company)}</td><td>${j.id > 1000 ? `<button class="btn btn-sm btn-outline-primary edit-job me-1" data-id="${j.id}">Edit</button><button class="btn btn-sm btn-outline-danger remove-job" data-id="${j.id}">Hapus</button>` : '<span class="small text-muted-custom">Data contoh</span>'}</td></tr>`,
      )
      .join("");
  };
  byId("adminJobForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = byId("adminTitle").value.trim(),
      company = byId("adminCompany").value.trim(),
      location = byId("adminLocation").value.trim(),
      type = byId("adminType").value;
    if (!title || !company || !location) return;
    let list = read();
    const oldId = Number(byId("adminJobId").value);
    const id = oldId || Math.max(1000, Date.now());
    const job = {
      id,
      title,
      company,
      location,
      type,
      category: "Other",
      salary: "Tidak disebutkan",
      posted: new Date().toISOString().slice(0, 10),
      emoji: "💼",
      description: "Informasi lowongan demo yang dikelola admin.",
      requirements: ["Terbuka untuk fresh graduate"],
    };
    list = oldId ? list.map((j) => (j.id === oldId ? job : j)) : [...list, job];
    if (store(ADMIN_JOBS_KEY, list)) {
      byId("adminJobForm").reset();
      byId("adminJobId").value = "";
      render();
      showToast("Lowongan demo tersimpan.");
    }
  });
  byId("adminJobRows").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-id]");
    if (!btn) return;
    const id = Number(btn.dataset.id),
      job = read().find((j) => j.id === id);
    if (!job) return;
    if (btn.classList.contains("remove-job")) {
      store(
        ADMIN_JOBS_KEY,
        read().filter((j) => j.id !== id),
      );
      render();
    } else {
      byId("adminJobId").value = job.id;
      byId("adminTitle").value = job.title;
      byId("adminCompany").value = job.company;
      byId("adminLocation").value = job.location;
      byId("adminType").value = job.type;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
  byId("adminReset").addEventListener("click", () => {
    byId("adminJobForm").reset();
    byId("adminJobId").value = "";
  });
  render();
}

document.addEventListener("DOMContentLoaded", () => {
  if (page === "home") initHome();
  if (page === "jobs") initJobs();
  if (page === "detail") initDetail();
  if (page === "profile") initProfile();
  if (page === "profile-view")
    byId("fullProfile").innerHTML = profileMarkup(safeRead(PROFILE_KEY, null));
  if (page === "saved") initSaved();
  if (page === "applications") initApplication();
  if (page === "cv") initCV();
  if (page === "admin") initAdmin();
  if (page === "login" || page === "register") initAuth();
  wireJQuery();
});
