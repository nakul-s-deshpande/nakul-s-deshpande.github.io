// Prototype only: switches between the two looks by setting <html data-look>.
// ?look=minimal or ?look=quaint in the URL wins; otherwise the last choice is remembered.
// Delete this file and its <script> tags once a look is chosen.
(function () {
  var root = document.documentElement;
  var looks = ["quaint", "minimal"];
  var saved;
  try { saved = localStorage.getItem("look"); } catch (e) {}
  var asked = new URLSearchParams(location.search).get("look");
  var look = looks.indexOf(asked) >= 0 ? asked : looks.indexOf(saved) >= 0 ? saved : "quaint";

  function set(name) {
    root.setAttribute("data-look", name);
    try { localStorage.setItem("look", name); } catch (e) {}
  }
  set(look);

  document.addEventListener("DOMContentLoaded", function () {
    var bar = document.createElement("div");
    bar.className = "proto-bar";
    looks.forEach(function (name) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = name;
      b.setAttribute("aria-pressed", String(name === look));
      b.addEventListener("click", function () {
        set(name);
        bar.querySelectorAll("button").forEach(function (x) {
          x.setAttribute("aria-pressed", String(x === b));
        });
      });
      bar.appendChild(b);
    });
    document.body.appendChild(bar);
  });
})();
