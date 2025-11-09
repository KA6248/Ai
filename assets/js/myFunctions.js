$(function () {
    $(".table").on("click", ".toggle", function (e) {
      e.preventDefault();
      const target = $(this).data("target");
      $(target).slideToggle(180);
    });
  
    try {
      const raw = localStorage.getItem("ai_new_app");
      if (raw) {
        const data = JSON.parse(raw);
        appendAppToTable(data);
        localStorage.removeItem("ai_new_app");
      }
    } catch (err) {
      console.warn("Storage parse error:", err);
    }
  
    $("#logoutBtn").on("click", function () {
      localStorage.clear();
    });
  });
  
  function appendAppToTable(d) {
    const id = "d-" + Date.now();
    const tbody = $("#appsBody");
    const priceBadge =
      d.pricing === "free"
        ? '<span class="badge badge-free">مجاني</span>'
        : '<span class="badge badge-paid">غير مجاني</span>';
  
    const row =
      `<tr>
        <td><span lang="en">${escapeHTML(d.name)}</span></td>
        <td><span lang="en">${escapeHTML(d.company)}</span></td>
        <td>${escapeHTML(d.domain)}</td>
        <td>${priceBadge}</td>
        <td><a href="#" class="toggle" data-target="#${id}">إظهار التفاصيل</a></td>
      </tr>
      <tr class="details-row">
        <td colspan="5">
          <div id="${id}" class="app-details">
            <div class="grid cols-2">
              <div>
                <p>${escapeHTML(d.description || "لا يوجد وصف.")}</p>
                ${d.url ? `<p class="mt-2"><a href="${escapeAttr(d.url)}" target="_blank" rel="noopener" lang="en">${escapeHTML(d.url)}</a></p>` : ""}
              </div>
              <div>${renderLogoSVG(d.name)}</div>
            </div>
          </div>
        </td>
      </tr>`;
  
    tbody.append(row);
  }
  
  function renderLogoSVG(text) {
    const initial = (text || "A").substring(0, 1).toUpperCase();
    return `
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="logo">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stop-color="#00D3A7"/>
          <stop offset="1" stop-color="#7C4DFF"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="120" height="120" rx="20" fill="url(#g)"/>
      <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="54" font-weight="800" fill="#0F1220" font-family="Inter, Cairo, sans-serif">${escapeHTML(initial)}</text>
    </svg>`;
  }
  
  function escapeHTML(s) {
    return String(s || "").replace(/[&<>"']/g, (m) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[m]));
  }
  
  function escapeAttr(s) {
    return escapeHTML(s).replace(/"/g, "&quot;");
  }
  