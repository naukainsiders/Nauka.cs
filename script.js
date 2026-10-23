/* ===================================================
   NAUKA - Coming Soon  |  Supabase Waitlist Signup
   =================================================== */

(function () {
  "use strict";

  /* -- Supabase configuration ----------------------- */
  /*
   * Use the Project URL and Publishable key from:
   * Supabase Dashboard > Settings > API Keys.
   *
   * Never put a secret/service_role key in this file.
   */
  var SUPABASE_URL = "https://eafwjbzjgdizdxvqituu.supabase.co";
  var SUPABASE_PUBLISHABLE_KEY = "sb_publishable_k8sUYAGPwlwulnAxjt4_0Q_pLWXbc-o";
  var WAITLIST_TABLE = "waitlist";

  var isConfigured =
    SUPABASE_URL.indexOf("REPLACE_WITH_") !== 0 &&
    SUPABASE_PUBLISHABLE_KEY.indexOf("REPLACE_WITH_") !== 0;

  var supabaseClient = null;
  if (isConfigured && window.supabase && typeof window.supabase.createClient === "function") {
    supabaseClient = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    );
  }

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

    /* Supabase has not been configured yet */
    if (!supabaseClient) {
      setStatus(
        "Signup is being set up. Please check back soon!",
        "info"
      );
      return;
    }

    /* Save to Supabase */
    setLoading(true);
    clearStatus();

    try {
      var result = await supabaseClient
        .from(WAITLIST_TABLE)
        .insert({
          email: email.toLowerCase(),
          consent_given: true,
        });

      if (result.error) {
        if (result.error.code === "23505") {
          setStatus("This email is already on the list.", "info");
        } else {
          throw result.error;
        }
      } else {
        setStatus("You\u2019re on the list! We\u2019ll let you know when NAUKA launches.", "success");
        input.value = "";
      }
    } catch (error) {
      console.error("Waitlist signup failed:", error);
      setStatus(
        "We couldn\u2019t save your email right now. Please try again.",
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
