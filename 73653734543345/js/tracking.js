(function () {
  var STORE_KEY = "utm_params_all";
  var CLICK_IDS = ["fbclid", "gclid", "wbraid", "gbraid", "ttclid", "msclkid"];
  var EXTRA_KEYS = ["src", "sck", "xcod"];

  function isTrackKey(key) {
    return key.indexOf("utm_") === 0 || CLICK_IDS.indexOf(key) >= 0 || EXTRA_KEYS.indexOf(key) >= 0;
  }

  var params = new URLSearchParams(window.location.search);
  var fromStorage = {};
  try {
    fromStorage = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
  } catch (e) {}

  var fromUrl = {};
  params.forEach(function (value, key) {
    if (isTrackKey(key) && value) fromUrl[key] = value;
  });

  var merged = Object.assign({}, fromStorage, fromUrl);
  if (Object.keys(merged).length > 0) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(merged));
    } catch (e) {}
  }

  window.gvdesenrolaMergeTracking = function () {
    var out = {};
    try {
      var s = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
      Object.keys(s).forEach(function (k) {
        if (s[k]) out[k] = s[k];
      });
    } catch (e) {}
    params.forEach(function (v, k) {
      if (isTrackKey(k) && v) out[k] = v;
    });
    return out;
  };

  window.notificarUtmify = function (status, txId, amountCents, custData, prodName, prodId) {
    try {
      if (!txId) return;
      var notifyKey = "utmify_sent_" + txId + "_" + status;
      if (sessionStorage.getItem(notifyKey) === "1") return;
      sessionStorage.setItem(notifyKey, "1");

      var tracking = typeof window.gvdesenrolaMergeTracking === "function" ? window.gvdesenrolaMergeTracking() : {};
      fetch("/api/utmify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          orderId: txId,
          status: status,
          amountInCents: amountCents,
          customer: custData || {},
          tracking: tracking,
          productId: prodId || (amountCents === 1390 ? "prod_taxa" : "prod_recarga"),
          productName: prodName || (amountCents === 1390 ? "Taxa de Ativação" : "Recarga TIM")
        })
      }).catch(function (e) {
        console.warn("Utmify:", e);
      });
    } catch (_) {}
  };
})();
