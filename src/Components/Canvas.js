import { useOnDraw } from "./Hooks";

const Canvas = ({ 
    width,
    height
}) => {

    const {
        onMouseDown,
        setCanvasRef
    } = useOnDraw(onDraw); // setCanvasRef is a function that will be called when the canvas is drawn

    function onDraw(ctx, point, prevPointRef){ // ctx is the context of the canvas, point is the point in the canvas
        drawLine(prevPointRef.current, point, ctx, 'black', 5); // draw a line from the previous point to the current point
    }

    function drawLine(start, end, ctx, color, width)
    {
        start = start ?? end; // if start is not defined, set it to end
        ctx.beginPath(); // begin the path
        ctx.lineWidth = width; // set the line width
        ctx.strokeStyle = color; // set the stroke style
        ctx.moveTo(start.x, start.y); // move to the start point
        ctx.lineTo(end.x, end.y); // draw a line to the end point
        ctx.stroke(); // stroke the line

        ctx.fillStyle = color; // set the fill style
        ctx.beginPath(); // begin the path
        ctx.arc(start.x, start.y, width / 2, 0, 2 * Math.PI); // draw a circle at the start of the line
        ctx.fill(); // fill the circle
    }

    return( // return the canvas
        <canvas
            width={width}
            height={height}
            onMouseDown={onMouseDown}
            style={canvasStyle}
            ref={setCanvasRef} // set the canvasRef to the canvas element
        />
    );

}

export default Canvas; 

const canvasStyle = { // style the canvas
    border: '1px solid black' // add a black border
}