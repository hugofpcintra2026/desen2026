(function () {
  var STORAGE_KEY = 'tim_utm_params';
  var SENT_KEY = 'tim_utmify_sent';

  function captureUtms() {
    try {
      var params = new URLSearchParams(window.location.search);
      var keys = ['utm_source', 'utm_campaign', 'utm_medium', 'utm_content', 'utm_term', 'src', 'sck'];
      var current = {};
      try {
        current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
      } catch (e) {
        current = {};
      }
      var updated = false;
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var v = params.get(k);
        if (v) {
          current[k] = v;
          updated = true;
        }
      }
      if (updated || !localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      }
    } catch (e) {}
  }

  captureUtms();

  window.getUtmTracking = function () {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
    } catch (e) {
      return {};
    }
  };

  window.notificarUtmify = function (status, orderId, amountCents, customer, productName, productId) {
    try {
      if (!orderId || !status) return;
      var dedupeKey = String(orderId) + '_' + String(status);
      var sentMap = {};
      try {
        sentMap = JSON.parse(sessionStorage.getItem(SENT_KEY) || '{}') || {};
      } catch (e) {
        sentMap = {};
      }
      if (sentMap[dedupeKey]) return;
      sentMap[dedupeKey] = true;
      sessionStorage.setItem(SENT_KEY, JSON.stringify(sentMap));

      var trackingParameters = window.getUtmTracking();

      fetch('/api/utmify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: status,
          orderId: String(orderId),
          amountCents: Number(amountCents) || 2000,
          customer: customer || {},
          trackingParameters: trackingParameters,
          productName: productName || 'Recarga TIM',
          productId: productId || 'prod_recarga'
        })
      }).catch(function () {});
    } catch (e) {}
  };
})();
