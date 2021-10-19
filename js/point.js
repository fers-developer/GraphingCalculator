import Draw from "./draw.js";
import { colorHEX, } from "./colors.js";

class Point extends Draw
{
  constructor(canvasEl, factor=50, fontSize=11)
  {
    super(canvasEl, factor, fontSize);
    this.handleClick_draw = this.handleClick_draw.bind(this);
    this.handleClick_clear = this.handleClick_clear.bind(this);
    setItem("title", "Draw a point");
  }
  
  /*=======================*/
  /*       DRAWING         */
  /*=======================*/

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

    if (label) this.drawLabel(pointX, pointY, label, 10, -10, color, "Bold");
  }

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
      const valueX = parseFloat(inputX.value);
      const valueY = parseFloat(inputY.value);
      const points = getItem("points");
      const letter = getItem("letter");
      const nextLetter = String.fromCharCode(letter.charCodeAt()+1);
      const color = colorHEX();
    
      inputX.value = "";
      inputY.value = "";
      this.addPoint(valueX, valueY, letter, color);
      this.drawPoint(valueX*this.factor, valueY*this.factor, letter, color);
      setItem("letter", nextLetter);
      setItem("points", {
        ...points,
        [letter]: {x: valueX, y: valueY, color: color}
      });
    }
  }

  handleClick_clear()
  {
    setItem("letter", "A")
    setItem("points", {});
    this.clearCanvas();
    this.render();
    document.querySelector(".panel-points").innerHTML = "";
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

export default Point;