window.addEventListener('load', function() {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    var minDate = yyyy + '-' + mm + '-' + dd;

    document.getElementById("date").setAttribute("min", minDate);
    document.getElementById("date").setAttribute("value", minDate);
  });