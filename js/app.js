import Point from "./point.js";
import Chart from "./chart.js";

// Draw Variable
let draw;

// DOM
const toolbar = document.querySelector(".toolbar");

// Main Function
function main() 
{
  draw = new Point(canvas);
  toolbar.addEventListener("click", handleClick_toolbar);
  btnDraw.addEventListener("click", draw.handleClick_draw);
  btnClear.addEventListener("click", draw.handleClick_clear);
  btnHome.addEventListener("click", draw.handleClick_home);
  btnZoomIn.addEventListener("click", draw.handleClick_zoomIn);
  btnZoomOut.addEventListener("click", draw.handleClick_zoomOut);
  showHelp.addEventListener("mouseover", () => {    
    document.querySelector(".panel-help").classList.remove("hidden");
  });
  showHelp.addEventListener("mouseleave", () => {
    document.querySelector(".panel-help").classList.add("hidden");
  });
  window.addEventListener("resize", draw.render);
}

// Handler Toolbar
function handleClick_toolbar(e)
{
  const elem = getTarget(e.target);

  if (elem && !elem.classList.contains("selected"))
  {
    const factor = draw.factor;
    const title = document.querySelector(".panel__title");

    window.removeEventListener("resize", draw.render);    
    btnDraw.removeEventListener("click", draw.handleClick_draw);
    btnClear.removeEventListener("click", draw.handleClick_clear);
    btnHome.removeEventListener("click", draw.handleClick_home);
    btnZoomIn.removeEventListener("click", draw.handleClick_zoomIn);
    btnZoomOut.removeEventListener("click", draw.handleClick_zoomOut);
    if (elem.children[1].children[0].textContent === "Point")
    {
      draw = new Point(canvas, factor);
      title.childNodes[0].textContent = getItem("title");
    }
    else 
    { 
      draw = new Chart(canvas, factor);
      title.childNodes[0].textContent = getItem("title");
    }
    toggleSelected(elem);
    document.querySelector(".panel-points").innerHTML = "";
    window.addEventListener("resize", draw.render);
    btnDraw.addEventListener("click", draw.handleClick_draw);
    btnClear.addEventListener("click", draw.handleClick_clear);
    btnHome.addEventListener("click", draw.handleClick_home);
    btnZoomIn.addEventListener("click", draw.handleClick_zoomIn);
    btnZoomOut.addEventListener("click", draw.handleClick_zoomOut);
  }
}

  function getTarget(target)
  {
    if (target.tagName === "LI") return target;
    else if (target.tagName === "I" || target.tagName === "DIV") return target.parentNode;
    else if (target.tagName === "P") return target.parentNode.parentNode;
    else return false;
  }

  function toggleSelected(el)
  {
    const elems = document.querySelectorAll(".toolbar__item");

    for (const elem of elems) elem.classList.remove("selected");
    el.classList.add("selected");
  }

main();