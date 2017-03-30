var mousePosition = Class.create({

   initialize: function(canvas)
   {
       this.canvas = canvas;
        this.x = event.pageX;
        this.y = event.pageY;
   },
    getX: function()
    {
      return this.x;
    },
    getY: function()
    {
        return this.y;
    },
    setX: function(x)
    {
        this.x = x;
    },
    setY: function(y)
    {
      this.y = y;
    },
    toString: function()
    {
        return "(" + this.x + "," + this.y + ")";
    }
});

var drawControl = Class.create(mousePosition,{

    initialize: function($super,canvas)
    {
        $super(canvas);
        this.currentColor = "rgb(40,80,0)";
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.previousColor = this.currentColor;
        this.drawing = false;
        this.toolType = 0;
    },
    setColor: function(color)
    {
      this.previousColor = this.currentColor;
      this.currentColor = color;
    },
    setR: function(r)
    {
        this.r = r;
    },
    setG: function(g)
    {
      this.g = g;
    },
    setB: function(b)
    {
      this.b = b;
    },
    getR: function()
    {
        return this.r;
    },
    getG: function()
    {
        return this.g;
    },
    getB: function()
    {
        return this.b;
    },
    getDrawing: function()
    {
      return this.drawing;
    },
    setDrawing: function(t)
    {
      this.drawing = t;
    },
    getToolType: function()
    {
      return this.toolType;
    },
    setToolType: function(t)
    {
      this.toolType = t;
    },
    erase: function(graphics)
    {
        graphics.save();

        graphics.clearRect(this.getX()-10,this.getY()-10,50,50);

        graphics.restore();
    },
    draw: function(graphics)
    {
            graphics.save();

            graphics.fillStyle = this.currentColor;
            graphics.fillRect(this.getX()-17,this.getY()-3,10,10);

            graphics.restore();
    },
    colorChooser: function(graphics)
    {
        var pixel = graphics.getImageData(this.getX()-17,this.getY()-3,1,1);
        var data = pixel.data;

        return [data[0],data[1],data[2]];
    },
    calligraphyTool: function(graphics)
    {
        graphics.save();

        graphics.fillStyle = this.currentColor;
        graphics.beginPath();
        graphics.arc(this.getX()-17,this.getY()-3,10,1,Math.PI*2,true);
        graphics.closePath();
        graphics.fill();

        graphics.restore();
    },
    paintTool: function(graphics)
    {
        graphics.save();

        graphics.fillStyle = this.currentColor;
        graphics.beginPath();
        graphics.arc(this.getX()-17,this.getY()-3,10,0,Math.PI*2,true);
        graphics.closePath();
        graphics.fill();

        graphics.restore();
    },
    doFill: function(img)
    {

    }
});
var colorHolder = Class.create({

    initialize: function(color,x,y)
    {
        this.color = color;
        this.x = x;
        this.y = y;
    },
    setColor: function(color)
    {
        this.color = color;
    },
    getColor: function()
    {
        return this.color;
    },
    draw: function(g)
    {
        g.save();

        g.fillStyle = this.color;

        g.fillRect(this.x,this.y,15,15);

        g.restore();
    }
});

var pixelBoard = Class.create({

    initialize: function(canvas,pixelSize)
    {
      this.canvas = canvas;
      this.pixelSize = pixelSize;
      this.amountW = canvas.width/pixelSize;
      this.amountH = canvas.height/pixelSize;
      this.totalAmount = this.amountW * this.amountH;
      this.pixels = [];
      this.createPixels();
    },
    getPixels: function()
    {
        return this.pixels;
    },
    createPixels: function()
    {
        var x = 0;
        var y = 0;


        for(var i = 0; i < this.totalAmount-(this.amountW*2); i++)
        {
          var temp = document.createElement("Div");
          temp.style.width = this.pixelSize + "px";
          temp.style.height = this.pixelSize + "px";
          temp.style.display = "inline";
          temp.style.position = "absolute";
          temp.style.top = y+38 + "px";
          temp.style.left = x+13 + "px";
          temp.style.border = "1px solid black";
          x += this.pixelSize;
          if(x == this.amountW*this.pixelSize)
          {
              y += this.pixelSize;
              x = 0;
          }

          temp.addEventListener("click",function()
          {
              var r = document.getElementById("r").value;
              var g = document.getElementById("g").value;
              var b = document.getElementById("b").value;

              console.log(r);

             this.style.backgroundColor = "RGB(" + r + "," + g + "," + b + ")";


          });

          this.pixels.push(temp);

        }
    }


});

var fillTool = Class.create(drawControl,{

    initialize: function($super,canvas,img)
    {
        $super(canvas);
        this.img = img;
        this.imgWidth = canvas.width;
        this.imgHeight = canvas.height;
        this.fCanvas = canvas.getBoundingClientRect();
        this.imgData = img.getImageData(this.fCanvas.left,this.fCanvas.top,this.imgWidth,this.imgHeight);
        this.imgPixels = this.imgData.data;
        this.startR = 0;
        this.startG = 0;
        this.startB = 0;
        this.stack = [];
    },
    doFill: function(x,y,rp,gp,bp) {

        this.startR = this.img.getImageData(x,y,1,1).data[0];
        this.startG = this.img.getImageData(x,y,1,1).data[1];
        this.startB = this.img.getImageData(x,y,1,1).data[2];

        //if(this.startR != rp && this.startG != gp && this.startB != bp) {


            this.imgData = this.img.getImageData(0, 0, this.imgWidth, this.imgHeight);
            this.imgPixels = this.imgData.data;

            this.stack.push([x - 17, y - 3]);

            while (this.stack.length) {
                var newPos, nX, nY, pixelPos, reachLeft, reachRight;

                newPos = this.stack.pop();
                nX = newPos[0];
                nY = newPos[1];

                pixelPos = ((nY * this.imgWidth + nX) * 4);
                console.log(this.imgPixels[pixelPos]);
                while (nY-- >= 0 && this.matchStartColor(pixelPos)) {
                    pixelPos -= this.imgWidth * 4;
                }
                pixelPos += this.imgWidth * 4;
                ++nY;
                reachLeft = false;
                reachRight = false;
                while (nY++ < this.imgHeight - 1 && this.matchStartColor(pixelPos)) {
                    this.colorPixel(pixelPos, rp, gp, bp);

                    if (nX > 0) {
                        if (this.matchStartColor(pixelPos - 4)) {
                            if (!reachLeft) {
                                this.stack.push([nX - 1, nY]);
                                reachLeft = true;
                            }
                        }
                        else if (reachLeft) {
                            reachLeft = false;
                        }
                    }

                    if (nX < this.imgWidth - 1) {
                        if (this.matchStartColor(pixelPos + 4)) {
                            if (!reachRight) {
                                this.stack.push([nX + 1, nY]);
                                reachRight = true;
                            }
                        }
                        else if (reachRight) {
                            reachRight = false;
                        }
                    }
                    pixelPos += this.imgWidth * 4;
                }
            }
            this.img.putImageData(this.imgData, 0, 0);
       // }
       // else
        //{
            //console.log("dont do the same color...");
        //}
    },
    matchStartColor: function(pixelPos)
    {
        var r = this.imgPixels[pixelPos];
        var g = this.imgPixels[pixelPos+1];
        var b = this.imgPixels[pixelPos+2];


        return (r == this.startR && g == this.startG && b == this.startB);
    },
    colorPixel: function(pixelPos,r,g,b)
    {
        this.imgPixels[pixelPos] = r;
        this.imgPixels[pixelPos+1] = g;
        this.imgPixels[pixelPos+2] = b;
        this.imgPixels[pixelPos+3] = 255;
    }

});