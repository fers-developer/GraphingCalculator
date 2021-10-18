import Point from "./point.js";
import Chart from "./chart.js";

// Draw Variable
let draw;

// HTML Elements
const toolbar = document.querySelector(".toolbar");

// Main Function
function main() 
{
  draw = new Point(canvas);
  toolbar.addEventListener("click", handleClick_toolbar);
  btnDraw.addEventListener("click", draw.handleClick_draw);
  btnClear.addEventListener("click", draw.handleClick_clear);
  showHelp.addEventListener("mouseover", () => {    
    document.querySelector(".panel-help").classList.add("visible");
  });
  showHelp.addEventListener("mouseleave", () => {
    document.querySelector(".panel-help").classList.remove("visible");
  });
  window.addEventListener("resize", draw.render);
}

// Handler Toolbar
function handleClick_toolbar(e)
{
  const elem = getTarget(e.target);

  if (elem && !elem.classList.contains("selected"))
  {
    const title = document.querySelector(".panel__title");

    window.removeEventListener("resize", draw.render);    
    btnDraw.removeEventListener("click", draw.handleClick_draw);
    btnClear.removeEventListener("click", draw.handleClick_clear);
    if (elem.children[1].children[0].textContent === "Point")
    {
      draw = new Point(canvas);
      title.childNodes[0].textContent = getItem("title");
    }
    else 
    { 
      draw = new Chart(canvas);
      title.childNodes[0].textContent = getItem("title");
    }
    toggleSelected(elem);
    window.addEventListener("resize", draw.render);
    document.querySelector(".panel-points").innerHTML = "";
    btnDraw.addEventListener("click", draw.handleClick_draw);
    btnClear.addEventListener("click", draw.handleClick_clear);
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