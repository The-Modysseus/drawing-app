import { useEffect, useRef } from "react";

export function useOnDraw(onDraw){ // returns a function that will be called when the canvas is drawn
   const canvasRef = useRef(null); // canvasRef is a reference to the canvas element

   const isDrawingRef = useRef(false); // isDrawingRef is a reference to a boolean that indicates whether the user is drawing

   const mouseMoveListenerRef = useRef(null); // mouseMoveListenerRef is a reference to the mouse move listener
   const mouseUpListenerRef = useRef(null); // mouseUpListenerRef is a reference to the mouse up listener

   const prevPointRef = useRef(null); // prevPointRef is a reference to the previous point in the canvas where the mouse was pressed

   useEffect(() => { // useEffect is called when the component is mounted

    function initMouseMoveListener(){ // mouseMoveListener is a function that will be called when the mouse moves
        const mouseMoveListener = (e) => { // e is the mouse event
            if (isDrawingRef.current) // if the user is drawing 
            {
            const point = computePointInCanvas(e.clientX, e.clientY); // compute the point in the canvas
            const ctx = canvasRef.current.getContext('2d'); // get the context of the canvas
            if (onDraw) { // if the onDraw function is defined
                onDraw(ctx, point, prevPointRef.current); // call the onDraw function with the context and the point    
            }
            prevPointRef.current = point; // save the point in the prevPointRef
            console.log(point); // log the point in the console
            }    
        }
        mouseMoveListenerRef.current = mouseMoveListener; // save reference to the mouse move listener
        window.addEventListener('mousemove', mouseMoveListener); // add the mouse move listener to the window
       }
    
        function initMMouseUpListener(){ // mouseUpListener is a function that will be called when the mouse is released
        if (!canvasRef.current) return; // if the canvas is not defined, return
        const mouseUpListener = () => { // e is the mouse event
            isDrawingRef.current = false; // set isDrawingRef to false
            prevPointRef.current = null; // set prevPointRef to null
        }
        mouseUpListenerRef.current = mouseUpListener; // save the mouse up listener
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
        
        function removeListeners(){ // remove the listeners when not needed anymore
            window.removeEventListener('mousemove', mouseMoveListenerRef.current); // remove the mouse move listener from the window
            window.removeEventListener('mouseup', mouseUpListenerRef.current); // remove the mouse up listener from the window
        }
        
        initMouseMoveListener(); // initialize the mouse move listener
        initMMouseUpListener(); // initialize the mouse up listener

        return () => { // return a function that will be called when the component is unmounted
            removeListeners(); // remove the listeners when not needed anymore
        }
   }, [onDraw]); // run the effect when onDraw changes

   function setCanvasRef(ref){ // ref is the canvas element
        canvasRef.current = ref; // set the canvasRef to the canvas element
   }

   function onMouseDown(){ // onMouseDown is a function that will be called when the mouse is pressed
        isDrawingRef.current = true; // set isDrawingRef to true
   }

   return{
         setCanvasRef, // return the setCanvasRef function
         onMouseDown // return the onMouseDown function
   }
};