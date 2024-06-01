document.addEventListener('DOMContentLoaded', (event) => {
    const colorPicker = document.getElementById('colorPicker');
    const colorDisplay = document.getElementById('colorDisplay');
    const drawingCanvas = document.getElementById('drawingCanvas');
    const resizeHandle = document.getElementById('resizeHandle');
    const penButton = document.getElementById('penButton');
    const eraserButton = document.getElementById('eraserButton');
    const saveButton = document.getElementById('saveButton');
    const penSizeInput = document.getElementById('penSize');
    const eraserSizeInput = document.getElementById('eraserSize');
    const ctx = drawingCanvas.getContext('2d');
    let drawing = false;
    let selectedColor = '#000000';
    let eraserMode = false;
    let isResizing = false;
    let penSize = 5;
    let eraserSize = 5;

    const cursorCanvas = document.createElement('canvas');
    cursorCanvas.width = drawingCanvas.width;
    cursorCanvas.height = drawingCanvas.height;
    cursorCanvas.style.position = 'absolute';
    cursorCanvas.style.top = '0';
    cursorCanvas.style.left = '0';
    cursorCanvas.style.pointerEvents = 'none';
    document.querySelector('.canvas-container').appendChild(cursorCanvas);
    const cursorCtx = cursorCanvas.getContext('2d');

    const drawCursor = (x, y) => {
        cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
        cursorCtx.beginPath();
        cursorCtx.arc(x, y, eraserMode ? eraserSize / 2 : penSize / 2, 0, Math.PI * 2);
        cursorCtx.fillStyle = eraserMode ? 'rgba(255, 255, 255, 0.5)' : selectedColor;
        cursorCtx.fill();
        cursorCtx.strokeStyle = eraserMode ? '#000' : '#fff';
        cursorCtx.stroke();
    };

    colorPicker.addEventListener('input', (event) => {
        selectedColor = event.target.value;
        colorDisplay.textContent = `Selected Color: ${selectedColor}`;
        colorDisplay.style.backgroundColor = selectedColor;
    });

    penButton.addEventListener('click', () => {
        eraserMode = false;
        penButton.classList.add('active');
        eraserButton.classList.remove('active');
    });

    eraserButton.addEventListener('click', () => {
        eraserMode = true;
        penButton.classList.remove('active');
        eraserButton.classList.add('active');
    });

    saveButton.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'drawing.png';
        link.href = drawingCanvas.toDataURL();
        link.click();
    });

    penSizeInput.addEventListener('input', (event) => {
        penSize = event.target.value;
    });

    eraserSizeInput.addEventListener('input', (event) => {
        eraserSize = event.target.value;
    });

    const startDrawing = (event) => {
        drawing = true;
        draw(event);  // 처음 클릭 시에도 바로 그리기
    };

    const endDrawing = () => {
        drawing = false;
        ctx.beginPath();
    };

    const draw = (event) => {
        const rect = drawingCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (drawing) {
            ctx.lineWidth = eraserMode ? eraserSize : penSize;
            ctx.lineCap = 'round';
            ctx.strokeStyle = eraserMode ? '#FFFFFF' : selectedColor;

            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        }

        drawCursor(x, y);  // 마우스 이동 시마다 커서도 그리기
    };

    const startResizing = (event) => {
        isResizing = true;
    };

    const stopResizing = (event) => {
        isResizing = false;
    };

    const resize = (event) => {
        if (!isResizing) return;
        const containerRect = drawingCanvas.parentElement.getBoundingClientRect();
        const newWidth = event.clientX - containerRect.left;
        const newHeight = event.clientY - containerRect.top;
        drawingCanvas.width = newWidth;
        drawingCanvas.height = newHeight;
        cursorCanvas.width = newWidth;
        cursorCanvas.height = newHeight;
        ctx.beginPath();
    };

    drawingCanvas.addEventListener('mousedown', startDrawing);
    drawingCanvas.addEventListener('mouseup', endDrawing);
    drawingCanvas.addEventListener('mousemove', draw);
    resizeHandle.addEventListener('mousedown', startResizing);
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);

    drawingCanvas.addEventListener('mouseleave', () => {
        cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
    });

    // Initialize pen button as active
    penButton.classList.add('active');
});
