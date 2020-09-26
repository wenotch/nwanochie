var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 1000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

document.getElementById("main").addEventListener("click", closeNav);

function openNav() {
  document.getElementById("mySidenav").style.width = "60%";
  document.getElementById("mhh").style.display = "flex";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mhh").style.display = "none";
  // document.getElementById("main").style.marginLeft = "0";
}
