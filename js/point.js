// Imports
import Draw from "./draw.js";
import { colorHEX, } from "./colors.js";

class Point extends Draw
{
  constructor(canvasEl, factor=50, fontSize=11)
  {
    // call the constructor of SuperClass
    super(canvasEl, factor, fontSize);
    
    // add this context
    this.handleClick_draw = this.handleClick_draw.bind(this);
    this.handleClick_clear = this.handleClick_clear.bind(this);

    // add a SessionStorage item
    setItem("title", "Draw a point");
  }
  
  /*=======================*/
  /*       DRAWING         */
  /*=======================*/

  // Method to draw a point in the canvas
  drawPoint(x, y, label, color, size = 5)
  {
    let pointX = (this.originX*this.factor)+x;
    let pointY = (this.originY*this.factor)+y;

    // to increase smoothing for numbers with decimal part
    pointX = Math.round(pointX);
    pointY = Math.round(pointY);
    pointY = this.canvas.height - pointY;

    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(pointX, pointY, size, 0 * Math.PI, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    // call the function to draw text
    if (label) this.drawLabel(pointX, pointY, label, 10, -10, color, "Bold");
  }

  // Method to draw the last points
  drawPoints()
  {
    const points = getItem("points");

    for (const [key, value] of Object.entries(points))
      this.drawPoint(value.x*this.factor, value.y*this.factor, key, value.color);
  }

  /*=======================*/
  /*       HANDLERS        */
  /*=======================*/
  
  handleClick_draw()
  {
    const inputX = document.querySelector("#xAxis");
    const inputY = document.querySelector("#yAxis");

    if (inputX.value === "" || inputY.value === "") alert("Enter valid values!!!");
    else
    {
      // convert to number values
      const valueX = parseFloat(inputX.value);
      const valueY = parseFloat(inputY.value);
      // get the SessionStorage items
      const points = getItem("points");
      const letter = getItem("letter");
      // get the charCode of the letter
      const nextLetter = String.fromCharCode(letter.charCodeAt()+1); 
      // get the Hex color
      const color = colorHEX();
    
      // clean the inputs
      inputX.value = "";
      inputY.value = "";

      // add point in the panel
      this.addPoint(valueX, valueY, letter, color);

      // draw the point in the canvas
      this.drawPoint(valueX*this.factor, valueY*this.factor, letter, color);

      // set the SessionStorage items
      setItem("letter", nextLetter);
      setItem("points", {
        ...points,
        [letter]: {x: valueX, y: valueY, color: color}
      });
    }
  }

  handleClick_clear()
  {
    // set the SessionStorage items
    setItem("letter", "A")
    setItem("points", {});

    // clear the canvas and the panel
    document.querySelector(".panel-points").innerHTML = "";
    this.clearCanvas();
    this.render();
  }

  /*=======================*/
  /*      AUXILIARY        */
  /*=======================*/
  
  addPoint(x, y, letter, color)
  {
    const template = templatePoint.content.cloneNode(true);
    const panel = document.querySelector(".panel-points");
    const point = template.querySelector(".point-container__round");
    const points = template.querySelector(".point-container__axes");

    point.children[0].style.backgroundColor = color;
    points.textContent = `${letter} = (${x}, ${y})`;
    panel.appendChild(template);
  }

  getPoints()
  {
    if (exists("points")) 
      this.drawPoints();
  }
}

// Export
export default Point;