var c1;
var rValue;
var gValue;
var bValue;
var paintBrush;
var button;
var colorButton;
var colorWheel;
var toolKit;
var toolButton;
var ctx;
var visibility;
var tools;
var type;
var currentColor;
var pixelCreator;
var pixels;

window.onload = function()
{
    $(function(){
        $("#sliderR").slider({
            range: "max",
            min: 0,
            max: 255,
            value: 1,
            slide: function(event, ui){
                $("#r").val(ui.value);
            }
        });
        $("#r").val($("sliderR").slider("value"));
    });

    $(function(){
        $("#sliderG").slider({
            range: "max",
            min: 0,
            max: 255,
            value: 1,
            slide: function(event, ui){
                $("#g").val(ui.value);
            }
        });
        $("#g").val($("sliderG").slider("value"));
    });

    $(function(){
        $("#sliderB").slider({
            range: "max",
            min: 0,
            max: 255,
            value: 1,
            slide: function(event, ui){
                $("#b").val(ui.value);
            }
        });
        $("#b").val($("sliderB").slider("value"));
    });

    visibility = [false,false];
    type = [document.getElementById("type"),0];
    tools = [document.getElementById("pencil"),document.getElementById("eraser")];

    toolKit = document.getElementById("toolKit");
    toolButton = document.getElementById("tools");
    colorWheel = document.getElementById("colorPicker");
    colorButton = document.getElementById("colors");
    currentColor = document.getElementById("currentColor");
    button = document.getElementById("clear");
    c1 = document.getElementById("drawCanvas");
    c1.style.visibility = "hidden";
    ctx = c1.getContext("2d");
    paintBrush = new drawControl(c1,event);
    pixelCreator = new pixelBoard(c1,20);
    pixels = pixelCreator.getPixels();
for(var i = 0; i < pixels.length; i++)
{
    document.body.appendChild(pixels[i]);
}

    type[0].addEventListener("click",function()
    {
        var tRect = type[0].getBoundingClientRect();
        if(type[1] == 0)
        {
            var freeDraw = document.createElement("Div");
            freeDraw.innerHTML = "Free";
            freeDraw.className = "dropDown";
            freeDraw.style.top = tRect.bottom-tRect.borderBottom + "px";
            freeDraw.style.left = tRect.left-tRect.top+ "px";
            freeDraw.addEventListener("click",showF);
            function showF(evt){

                c1.style.visibility = "visible";
                freeDraw.removeEventListener("click",showF);
                freeDraw.addEventListener("click",hideF);
            };
            function hideF(evt){

                c1.style.visibility = "hidden";
                freeDraw.removeEventListener("click",hideF);
                freeDraw.addEventListener("click",showF);

            };


            document.getElementById("files").appendChild(freeDraw);
            var fRect = freeDraw.getBoundingClientRect();

            var pixelDraw = document.createElement("Div");
            pixelDraw.innerHTML = "Pixel";
            pixelDraw.className = "dropDown";
            pixelDraw.style.top = fRect.bottom-fRect.height/2 + "px";
            pixelDraw.style.left = fRect.left-fRect.width/7 + "px";
            document.getElementById("files").appendChild(pixelDraw);

            type[1] = 1;
            type[0].style.backgroundColor = "lightgrey";
        }
       else if(type[1] == 1)
        {
             var menu = document.getElementsByClassName("dropDown");

             while(menu.length > 0)
             {
                 menu[0].parentNode.removeChild(menu[0]);
             }
             type[0].style.backgroundColor = "white";

            type[1] = 0;
        }
    });

    tools[0].addEventListener("click",function()
        {
            c1.style.cursor = "url('images/pencil1.png'),auto";
            paintBrush.setToolType(0);
        });
    tools[1].addEventListener("click",function()
    {
        c1.style.cursor = "url('images/eraserTool.png'),auto";
        paintBrush.setToolType(1);
    });

    c1.addEventListener("mousedown",function()
    {
        paintBrush.setDrawing(true);

            if(paintBrush.getToolType() == 0)
            {

                rValue = document.getElementById("r").value;
                gValue = document.getElementById("g").value;
                bValue = document.getElementById("b").value;

                paintBrush.setX(event.clientX);
                paintBrush.setY(event.clientY);
                paintBrush.setColor("rgb(" + rValue + "," + gValue + "," + bValue + ")");

                paintBrush.draw(ctx);
            }
            else if(paintBrush.getToolType() == 1)
            {
                paintBrush.setX(event.clientX);
                paintBrush.setY(event.clientY);

                paintBrush.erase(ctx);
            }
    });
    c1.addEventListener("mouseup",function()
    {
       paintBrush.setDrawing(false);
    });
    button.addEventListener("click",clear);
    colorButton.addEventListener("click",function()
    {
       if(visibility[0])
       {
           colorWheel.style.visibility = "hidden";
           colorButton.style.backgroundColor = "white";
           visibility[0] = false;
       }
       else
       {
           colorWheel.style.visibility = "visible";
           colorButton.style.backgroundColor = "lightgrey";
           visibility[0] = true;
       }
    });
    toolButton.addEventListener("click",function()
    {
        if(visibility[1])
        {
            toolKit.style.visibility = "hidden";
            toolButton.style.backgroundColor = "white";
            visibility[1] = false;
        }
        else
        {
            toolKit.style.visibility = "visible";
            toolButton.style.backgroundColor = "lightgrey";
            visibility[1] = true;
        }
    });

    timer = setInterval(function(){

        rValue = document.getElementById("r").value;
        gValue = document.getElementById("g").value;
        bValue = document.getElementById("b").value;

        currentColor.style.backgroundColor = "RGB(" + rValue + "," + gValue + "," + bValue + ")";

    },100);



};

var clear = function()
{
    ctx.clearRect(0,0,c1.width,c1.height);
};

