import { useRef } from "react";

export function useOnDraw(onDraw){ // returns a function that will be called when the canvas is drawn
   const canvasRef = useRef(null); // canvasRef is a reference to the canvas element

   const isDrawingRef = useRef(false); // isDrawingRef is a reference to a boolean that indicates whether the user is drawing

   function setCanvasRef(ref){ // ref is the canvas element
    if (!ref) return; // if the canvas is not defined, return
        canvasRef.current = ref; // set the canvasRef to the canvas element
        initMouseMoveListener(); // initialize the mouse move listener
        initMMouseDownListener(); // initialize the mouse down listener
        initMMouseUpListener(); // initialize the mouse up listener
   }

   function initMouseMoveListener(){ // mouseMoveListener is a function that will be called when the mouse moves
    const mouseMoveListener = (e) => { // e is the mouse event
        if (isDrawingRef.current) // if the user is drawing 
        {
        const point = computePointInCanvas(e.clientX, e.clientY); // compute the point in the canvas
        const ctx = canvasRef.current.getContext('2d'); // get the context of the canvas
        if (onDraw) { // if the onDraw function is defined
            onDraw(ctx, point); // call the onDraw function with the context and the point    
        }
        console.log(point); // log the point in the console
        }    
    }
    window.addEventListener('mousemove', mouseMoveListener); // add the mouse move listener to the window
   }

   function initMMouseDownListener(){ // mouseDownListener is a function that will be called when the mouse is pressed
    if (!canvasRef.current) return; // if the canvas is not defined, return
    const mouseDownListener = (e) => { // e is the mouse event
        isDrawingRef.current = true; // set isDrawingRef to true
    }
    canvasRef.current.addEventListener('mousedown', mouseDownListener); // add the mouse down listener to the canvas
   }

    function initMMouseUpListener(){ // mouseUpListener is a function that will be called when the mouse is released
    if (!canvasRef.current) return; // if the canvas is not defined, return
    const mouseUpListener = (e) => { // e is the mouse event
        isDrawingRef.current = false; // set isDrawingRef to false
    }
    window.addEventListener('mouseup', mouseUpListener); // add the mouse up listener to the window
    }

   function computePointInCanvas(clientX, clientY){ // clientX, clientY are the mouse coordinates
    if (canvasRef.current) { // if the canvas is defined
        const boundingRect = canvasRef.current.getBoundingClientRect();
    return { // return the point in the canvas
        x : clientX - boundingRect.left, // x is the distance from the left of the canvas
        y : clientY - boundingRect.top // y is the distance from the top of the canvas
    }
    }
    else { // if the canvas is not defined
        return null; // return null
    }
    

   }

   return setCanvasRef; // return the function that will be called when the canvas is drawn
};