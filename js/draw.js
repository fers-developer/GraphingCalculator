class Draw
{
  constructor(canvasEl, factor, fontSize)
  {
    // initializing class properties
    this.canvas = canvasEl;
    this.factor = factor;
    this.fontSize = fontSize;
    this.ctx = this.canvas.getContext("2d");
    
    // add this context
    this.render = this.render.bind(this);
    this.handleClick_home = this.handleClick_home.bind(this);
    this.handleClick_zoomIn = this.handleClick_zoomIn.bind(this);
    this.handleClick_zoomOut = this.handleClick_zoomOut.bind(this);

    // add a SessionStorage items
    setItem("letter", "A");
    setItem("points", {});

    // call to render function
    this.render();
  }

  render()
  {
    // resize canvas when screen size changes
    this.resizeCanvas();

    // get the center point of the canvas
    this.getOrigin();

    // draw the lines in axis X
    for (let i = this.factor; i < this.canvas.width; i += this.factor)
      this.drawLine(i, this.canvas.height, i, 0, .3);

    // draw the lines in axis Y
    for (let i = this.canvas.height; i > 0; i -= this.factor)
      this.drawLine(0, i, this.canvas.width, i, .3);

    // draw the centerline of the Y-axis
    this.drawLine(0, this.canvas.height-(this.originY*this.factor), this.canvas.width, this.canvas.height-(this.originY*this.factor), 1.5);
    // draw the centerline of the X-axis
    this.drawLine(this.originX*this.factor, this.canvas.height, this.originX*this.factor, 0, 1.5);

    // draw the numbers of the axes
    this.drawNumbers();
    
    // get the last points
    this.getPoints();
  }

  /*=======================*/
  /*       DRAWING         */
  /*=======================*/

  // Method to draw a line in Canvas
  drawLine(x1, y1, x2, y2, width) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#000";
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineWidth = width;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  // Method to draw a text in Canvas
  drawLabel(x, y, label, size1=0, size2=0, color="#000", style="")
  {
    let pointX = Math.round(x);
    let pointY = Math.round(y);
    let textX = (pointX + size1);
    let textY = Math.round(pointY + size2 + 5);

    this.ctx.beginPath();
    this.ctx.font = `${style} ${this.fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = "center";
    this.ctx.fillText(label, textX, textY);
    this.ctx.closePath();
  }

  // Method to draw the numbers of the axes
  drawNumbers()
  {
    let count = 0;

    /* Axis X (Positive) */
    count = 1;
    for (let i = (this.originX*this.factor)+this.factor; i < this.canvas.width; i += this.factor)
      this.drawLabel(i, this.canvas.height-(this.originY*this.factor), count++, null, 8);
    
    /* Axis Y (Positive) */
    count = 1;
    for (let i = this.canvas.height-((this.originY*this.factor)+this.factor); i > 0; i -= this.factor)
      this.drawLabel((this.originX)*this.factor, i, count++, -10);

    /* Axis X (Negative) */
    count = 0;
    for (let i = (this.originX*this.factor)-this.factor; i > 0; i -= this.factor)
      this.drawLabel(i, this.canvas.height-(this.originY*this.factor), --count, null, 8);

    /* Axis Y (Negative) */
    count = 0;
    for (let i = this.canvas.height-((this.originY*this.factor)-this.factor); i < this.canvas.height; i += this.factor)
      this.drawLabel((this.originX*this.factor), i, --count, -10);
  }

  /*=======================*/
  /*       HANDLERS        */
  /*=======================*/
  
  // Handler to reset the canvas and then render
  handleClick_home()
  {
    if (this.factor !== 50) 
    {
      this.factor = 50;
      this.toggleSize();
      this.toggleVisibility();
      this.render();
    }
  }

  // Handler to zoom in the canvas and then render
  handleClick_zoomIn()
  {
    if (this.factor < 85) 
    {
      this.factor += 5;
      this.toggleSize();
      this.toggleVisibility();
      this.render();
    }
  }

  // Handler to zoom out the canvas and then render
  handleClick_zoomOut()
  {
    if (this.factor > 20) 
    {
      this.factor -= 5;
      this.toggleSize();
      this.toggleVisibility();
      this.render();
    }
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
    const relativeWidth = Math.floor(this.canvas.width/this.factor);
    const relativeHeight = Math.floor(this.canvas.height/this.factor);
    const axis1 = this.isEven(relativeWidth)? relativeWidth/2 : Math.ceil(relativeWidth/2);
    const axis2 = this.isEven(relativeHeight)? relativeHeight/2 : Math.ceil(relativeHeight/2);

    this.originX = axis1;
    this.originY = axis2;
  }

    isEven(n) { 
      return n % 2 === 0; 
    }
  
  toggleVisibility() 
  {
    if (this.factor === 50) btnHome.classList.add("hidden");
    if (this.factor == 45 || this.factor == 55) btnHome.classList.remove("hidden");
  }

  toggleSize()
  {
    if (this.factor >= 20 && this.factor < 35) this.fontSize = 9;
    else if (this.factor >= 35 && this.factor < 50) this.fontSize = 10;
    else if (this.factor >= 50 && this.factor < 60) this.fontSize = 11;
    else if (this.factor >= 60 && this.factor < 75) this.fontSize = 12;
    else this.fontSize = 13;
  }
}

export default Draw;