class Draw
{
  constructor(canvasEl)
  {
    setItem("letter", "A");
    setItem("points", {});
    this.canvas = canvasEl;
    this.ctx = this.canvas.getContext("2d");
    this.render();
  }

  render()
  {
    this.resizeCanvas();
    // draw the lines in axis X
    for (let i = 50; i < this.canvas.width; i += 50)
      this.drawLine(i, this.canvas.height, i, 0, .3);

    // draw the lines in axis Y
    for (let i = this.canvas.height; i > 0; i -= 50)
      this.drawLine(0, i, this.canvas.width, i, .3);

    this.getOrigin();

    this.drawLine(this.originX*50, this.canvas.height, this.originX*50, 0, 1.5);
    this.drawLine(0, this.canvas.height-(this.originY*50), this.canvas.width, this.canvas.height-(this.originY*50), 1.5);

    this.drawNumbers(this.originX, this.originY);
    
    this.getPoints();
  }

  /*=======================*/
  /*       DRAWING         */
  /*=======================*/

  drawLine(x1, y1, x2, y2, width) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#000";
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineWidth = width;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawNumbers(cx, cy)
  {
    let count = 0;

    /* Axis X (Positive) */
    count = 1;
    for (let i = (cx*50)+50; i < this.canvas.width; i += 50)
      this.drawLabel(i, this.canvas.height-(cy*50), count++, null, 8);
    
    /* Axis Y (Positive) */
    count = 1;
    for (let i = this.canvas.height-((cy*50)+50); i > 0; i -= 50)
      this.drawLabel((cx)*50, i, count++, -10);

    /* Axis X (Negative) */
    count = 0;
    for (let i = (cx*50)-50; i > 0; i -= 50)
      this.drawLabel(i, this.canvas.height-(cy*50), --count, null, 8);

    /* Axis Y (Negative) */
    count = 0;
    for (let i = this.canvas.height-((cy*50)-50); i < this.canvas.height; i += 50)
      this.drawLabel((cx*50), i, --count, -10);
  }

  drawLabel(x, y, label, size1=0, size2=0, color="#000")
  {
    let pointX = Math.round(x);
    let pointY = Math.round(y);
    let textX = (pointX + size1);
    let textY = Math.round(pointY + size2 + 5);
    this.ctx.font = "12px sans-serif";
    this.ctx.fillStyle = color;
    this.ctx.textAlign = "center";
    this.ctx.fillText(label, textX, textY);
  }

  /*=======================*/
  /*      AUXILIARY        */
  /*=======================*/

  clearCanvas() 
  { 
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
  }

  resizeCanvas()
  {
    const container = document.querySelector(".canvas-container");

    this.canvas.width = container.clientWidth;
    this.canvas.height = container.clientHeight;
  }

  getOrigin()
  {
    const relativeWidth = Math.floor(this.canvas.width/50);
    const relativeHeight = Math.floor(this.canvas.height/50);
    const axis1 = this.isEven(relativeWidth)? relativeWidth/2 : Math.ceil(relativeWidth/2);
    const axis2 = this.isEven(relativeHeight)? relativeHeight/2 : Math.ceil(relativeHeight/2);

    this.originX = axis1;
    this.originY = axis2;
  }

    isEven(n) { 
      return n % 2 === 0; 
    }
}

export default Draw;