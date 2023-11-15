import { useOnDraw } from "./Hooks";

const Canvas = ({ 
    width,
    height
}) => {

    const {
        onMouseDown,
        setCanvasRef
    } = useOnDraw(onDraw); // setCanvasRef is a function that will be called when the canvas is drawn

    function onDraw(ctx, point){ // ctx is the context of the canvas, point is the point in the canvas
        ctx.fillStyle = 'black'; // set the fill style to black
        ctx.beginPath(); // begin the path
        ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI); // draw a circle at the point
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