document.addEventListener('click',e=>{if(e.target.closest('.menu')) document.querySelector('.links').style.display=document.querySelector('.links').style.display==='flex'?'none':'flex';});

/* PATCH — Cookie & Privacy Consent Banner */
(function () {
  const STORAGE_KEY = "alf_cookie_privacy_consent_v1";

  function getLegalHref(fileName) {
    const path = window.location.pathname || "";
    const depth = path.split("/").filter(Boolean).length;
    // If current file is inside a subfolder like /summits/name.html or /missions/name.html,
    // go one level up. Root pages stay as-is.
    if (path.includes("/summits/") || path.includes("/missions/") || path.includes("/programs/")) {
      return "../" + fileName;
    }
    return fileName;
  }

  function injectStyles() {
    if (document.getElementById("alf-cookie-banner-styles")) return;

    const style = document.createElement("style");
    style.id = "alf-cookie-banner-styles";
    style.textContent = `
      .alf-cookie-banner {
        position: fixed;
        left: 22px;
        right: 22px;
        bottom: 22px;
        z-index: 99999;
        display: none;
        background:
          linear-gradient(135deg, rgba(255,255,255,.96), rgba(249,246,240,.98)),
          rgba(200,151,42,.08);
        border: 1px solid rgba(200,151,42,.28);
        box-shadow: 0 26px 70px rgba(11,31,58,.18);
        color: #0b1f3a;
        max-width: 980px;
        margin: 0 auto;
        padding: 18px 20px;
        font-family: "Outfit", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      .alf-cookie-banner.is-visible {
        display: block;
        animation: alfCookieFadeUp .34s ease both;
      }

      .alf-cookie-inner {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 18px;
        align-items: center;
      }

      .alf-cookie-title {
        margin: 0 0 5px;
        font-size: .78rem;
        letter-spacing: .16em;
        text-transform: uppercase;
        font-weight: 800;
        color: #c8972a;
      }

      .alf-cookie-text {
        margin: 0;
        font-size: .92rem;
        line-height: 1.55;
        color: rgba(11,31,58,.76);
      }

      .alf-cookie-text a {
        color: #0b1f3a;
        text-decoration: underline;
        text-underline-offset: 3px;
        font-weight: 700;
      }

      .alf-cookie-actions {
        display: flex;
        align-items: center;
        gap: 10px;
        white-space: nowrap;
      }

      .alf-cookie-btn {
        appearance: none;
        border: 1px solid rgba(200,151,42,.42);
        background: #0b1f3a;
        color: #fff;
        padding: 11px 17px;
        font-size: .72rem;
        letter-spacing: .14em;
        text-transform: uppercase;
        font-weight: 800;
        cursor: pointer;
        transition: transform .2s ease, background .2s ease, border-color .2s ease;
      }

      .alf-cookie-btn:hover {
        transform: translateY(-1px);
        background: #102b50;
        border-color: rgba(200,151,42,.72);
      }

      .alf-cookie-btn.secondary {
        background: transparent;
        color: #0b1f3a;
      }

      .alf-cookie-btn.secondary:hover {
        background: rgba(200,151,42,.10);
      }

      @keyframes alfCookieFadeUp {
        from { opacity: 0; transform: translateY(14px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @media (max-width: 760px) {
        .alf-cookie-banner {
          left: 14px;
          right: 14px;
          bottom: 14px;
          padding: 16px;
        }

        .alf-cookie-inner {
          grid-template-columns: 1fr;
        }

        .alf-cookie-actions {
          justify-content: stretch;
        }

        .alf-cookie-btn {
          flex: 1;
          text-align: center;
          padding: 11px 10px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function createBanner() {
    if (document.getElementById("alf-cookie-banner")) return;

    const banner = document.createElement("div");
    banner.id = "alf-cookie-banner";
    banner.className = "alf-cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Cookie and privacy notice");

    banner.innerHTML = `
      <div class="alf-cookie-inner">
        <div>
          <p class="alf-cookie-title">Privacy & cookies</p>
          <p class="alf-cookie-text">
            We use essential cookies to ensure this website works properly and may use analytics cookies to improve the experience.
            By continuing, you accept our
            <a href="${getLegalHref("politica-cookies.html")}">Cookie Policy</a> and
            <a href="${getLegalHref("politica-privacidad.html")}">Privacy Policy</a>.
          </p>
        </div>
        <div class="alf-cookie-actions">
          <button class="alf-cookie-btn secondary" type="button" data-alf-cookie-close>Reject</button>
          <button class="alf-cookie-btn" type="button" data-alf-cookie-accept>Accept</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    banner.querySelector("[data-alf-cookie-accept]").addEventListener("click", function () {
      localStorage.setItem(STORAGE_KEY, "accepted");
      banner.classList.remove("is-visible");
    });

    banner.querySelector("[data-alf-cookie-close]").addEventListener("click", function () {
      localStorage.setItem(STORAGE_KEY, "rejected");
      banner.classList.remove("is-visible");
    });

    if (!localStorage.getItem(STORAGE_KEY)) {
      window.setTimeout(function () {
        banner.classList.add("is-visible");
      }, 450);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectStyles();
    createBanner();
  });
})();
