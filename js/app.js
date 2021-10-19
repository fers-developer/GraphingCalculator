// Imports
import Point from "./point.js";
import Chart from "./chart.js";

// Global Variable
let draw;

// Main Function
function main() 
{
  // instance of the Point class
  draw = new Point(canvas); 

  // add event handlers to the elements
  showHelp.addEventListener("mouseover", () => {    
    document.querySelector(".panel-help").classList.remove("hidden");
  });
  showHelp.addEventListener("mouseleave", () => {
    document.querySelector(".panel-help").classList.add("hidden");
  });
  document.querySelector(".toolbar").addEventListener("click", handleClick_toolbar);
  setEvents();
}

// Handler Toolbar
function handleClick_toolbar(e)
{
  // get the correct target
  const elem = getTarget(e.target);

  if (elem && !elem.classList.contains("selected"))
  {
    // get required values from the object
    const factor = draw.factor;
    const fontSize = draw.fontSize;
    // get the title element of the panel
    const title = document.querySelector(".panel__title");

    setEvents(true); // remove event handlers
    if (elem.children[1].children[0].textContent === "Point")
    {
      // create a new instance of Point class
      draw = new Point(canvas, factor, fontSize);
      title.childNodes[0].textContent = getItem("title");
    }
    else 
    { 
      // create a new instance of Chart class
      draw = new Chart(canvas, factor, fontSize);
      title.childNodes[0].textContent = getItem("title");
    }
    setEvents(); // add event handlers
    toggleSelected(elem);
    document.querySelector(".panel-points").innerHTML = "";
  }
}

  // Function to obtain the correct target
  function getTarget(target)
  {
    if (target.tagName === "LI") return target;
    else if (target.tagName === "I" || target.tagName === "DIV") return target.parentNode;
    else if (target.tagName === "P") return target.parentNode.parentNode;
    else return false;
  }

  function setEvents(flag)
  {
    if (flag)
    {
      // remove all event handlers
      window.removeEventListener("resize", draw.render);    
      btnDraw.removeEventListener("click", draw.handleClick_draw);
      btnClear.removeEventListener("click", draw.handleClick_clear);
      btnHome.removeEventListener("click", draw.handleClick_home);
      btnZoomIn.removeEventListener("click", draw.handleClick_zoomIn);
      btnZoomOut.removeEventListener("click", draw.handleClick_zoomOut);
    }
    else 
    {
      // add all event handlers
      window.addEventListener("resize", draw.render);
      btnDraw.addEventListener("click", draw.handleClick_draw);
      btnClear.addEventListener("click", draw.handleClick_clear);
      btnHome.addEventListener("click", draw.handleClick_home);
      btnZoomIn.addEventListener("click", draw.handleClick_zoomIn);
      btnZoomOut.addEventListener("click", draw.handleClick_zoomOut);
    }
  }

  // Function to change the selected option
  function toggleSelected(el)
  {
    const elems = document.querySelectorAll(".toolbar__item");

    for (const elem of elems) elem.classList.remove("selected");
    el.classList.add("selected");
  }

// Entry point
main();