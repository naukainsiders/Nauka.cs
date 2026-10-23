/* ===================================================
   NAUKA - Coming Soon  |  Email Signup Script
   =================================================== */

(function () {
  "use strict";

  /* -- Configuration -------------------------------- */

  /**
   * SIGNUP_ENDPOINT
   * ----------------
   * Set this to your server URL that accepts POST requests with
   * a JSON body: { "email": "user@example.com" }
   *
   * The server should return:
   *   - 200/201 on success (optionally with JSON body)
   *   - 4xx/5xx on failure  (optionally with { "message": "..." })
   *
   * While this is null the form will show a friendly notice
   * that signup is not yet available.
   */
  var SIGNUP_ENDPOINT = null;

  /* -- DOM references ------------------------------- */
  var form   = document.getElementById("signup-form");
  var input  = document.getElementById("email-input");
  var btn    = document.getElementById("signup-btn");
  var status = document.getElementById("signup-status");

  /* -- Footer year ---------------------------------- */
  var yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* -- Helpers -------------------------------------- */

  /** Basic email format check */
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  /** Update the status region below the form */
  function setStatus(message, type) {
    status.textContent = message;
    status.className   = "signup__status";
    if (type) status.classList.add("is-" + type);
  }

  function clearStatus() {
    status.textContent = "";
    status.className   = "signup__status";
  }

  function setLoading(loading) {
    btn.disabled = loading;
    btn.classList.toggle("is-loading", loading);
    input.disabled = loading;
  }

  /* -- Form submission ------------------------------ */
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    var email = input.value.trim();

    /* Client-side validation */
    if (!email) {
      input.classList.add("is-invalid");
      input.focus();
      setStatus("Please enter your email address.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      input.classList.add("is-invalid");
      input.focus();
      setStatus("Please enter a valid email address.", "error");
      return;
    }

    input.classList.remove("is-invalid");

    /* No endpoint configured */
    if (!SIGNUP_ENDPOINT) {
      setStatus(
        "Signup is not yet available \u2014 we\u2019re still setting things up. Please check back soon!",
        "info"
      );
      return;
    }

    /* Submit to server */
    setLoading(true);
    clearStatus();

    try {
      var response = await fetch(SIGNUP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        setStatus("You\u2019re on the list! We\u2019ll let you know when NAUKA launches.", "success");
        input.value = "";
      } else {
        /* Try to extract a server error message */
        var msg = "Something went wrong. Please try again.";
        try {
          var body = await response.json();
          if (body && body.message) msg = body.message;
        } catch (_) { /* ignore parse errors */ }

        setStatus(msg, "error");
      }
    } catch (networkError) {
      setStatus(
        "Unable to reach the server. Please check your connection and try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  });

  /* Clear invalid state on typing */
  input.addEventListener("input", function () {
    input.classList.remove("is-invalid");
    if (status.classList.contains("is-error")) {
      clearStatus();
    }
  });
})();
