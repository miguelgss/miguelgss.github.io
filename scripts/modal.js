var modal = document.getElementById("projects");
var btn = document.getElementById("showProjects");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.classList.add("active");
};

span.onclick = function () {
  modal.classList.remove("active");
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.remove("active");
  }
};
