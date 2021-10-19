import Draw from "./draw.js";
import { colorHEX, } from "./colors.js";

class Chart extends Draw
{
  constructor(canvasEl, factor=50, fontSize=11)
  {
    super(canvasEl, factor, fontSize);
    this.handleClick_draw = this.handleClick_draw.bind(this);
    this.handleClick_clear = this.handleClick_clear.bind(this);
    setItem("title", "Draw a bar chart");
  }

  /*=======================*/
  /*       DRAWING         */
  /*=======================*/

  drawBarChart(x, y, label, color)
  {
    const barWidth = this.factor; // bar width 

    let pointX = (this.originX*this.factor)+x;
    let pointY = (this.originY*this.factor)+y;

    // to increase smoothing for numbers with decimal part
    pointX = Math.round(pointX);
    pointY = Math.round(pointY);
    pointY = this.canvas.height - pointY;

    // Filling the Reactangle based on the input values
    this.ctx.beginPath();
    this.ctx.globalAlpha = 0.5;
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = "#000";
    this.ctx.fillRect(pointX-(this.factor/2), pointY, barWidth, y);
    this.ctx.globalAlpha = 1.0;
    this.ctx.strokeRect(pointX-(this.factor/2), pointY, barWidth, y);
    this.ctx.closePath();

    if (label) this.drawLabel(pointX, (pointY+(y/2)), label, 0, 0, null, "Bold");
  }

  drawBarCharts()
  {
    const points = getItem("points");

    for (const [key, value] of Object.entries(points))
      this.drawBarChart(value.x*this.factor, value.y*this.factor, value.letter, value.color);
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
      this.drawBarChart(valueX*this.factor, valueY*this.factor, letter, color);
      setItem("letter", nextLetter);
      setItem("points", {
        ...points,
        [letter]: {x: valueX, y: valueY, letter: letter, color: color}
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

    point.classList.add("point-container__square");
    point.children[0].style.backgroundColor = color;
    point.children[0].style.opacity = 0.5;
    points.textContent = `${letter} = (${x}, ${y})`;
    panel.appendChild(template);
  }

  getPoints()
  {
    if (exists("points"))
      this.drawBarCharts();
  }
}

export default Chart;