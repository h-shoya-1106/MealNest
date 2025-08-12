$(function() {
  const $overlay = $("#modalOverlay");
  const $modal = $("#modalBox");
  const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
  let $focusableElements;
  let firstTabStop;
  let lastTabStop;

  function trapFocus(element) {
    $focusableElements = element.find(focusableElementsString);
    firstTabStop = $focusableElements[0];
    lastTabStop = $focusableElements[$focusableElements.length - 1];

    element.on('keydown', function(e) {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstTabStop) {
            e.preventDefault();
            lastTabStop.focus();
          }
        } else {
          if (document.activeElement === lastTabStop) {
            e.preventDefault();
            firstTabStop.focus();
          }
        }
      }
      if (e.key === "Escape") {
        closeModal();
      }
    });
  }

  function openModal() {
    $overlay.show();
    $modal.focus();
    trapFocus($modal);
  }

  function closeModal() {
    $overlay.hide();
  }

  $("#openModal").click(openModal);
  $("#closeModal").click(closeModal);
  $overlay.click(function(e) {
    if (e.target === this) {
      closeModal();
    }
  });
});
