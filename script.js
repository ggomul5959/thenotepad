// 파일 저장 함수
function saveTextAsFile() {
    var textToSave = document.getElementById("textArea").innerText;
    var fileName = prompt("파일 이름을 입력하세요:", "notepad.txt");

    if (fileName != null) {
        var blob = new Blob([textToSave], { type: "text/plain;charset=utf-8" });
        var downloadLink = document.createElement("a");
        downloadLink.download = fileName;
        
        if (window.webkitURL != null) {
            downloadLink.href = window.webkitURL.createObjectURL(blob);
        } else {
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }
    
        downloadLink.click();
    }
}

// 다른 이름으로 저장 함수
function saveTextAsFileWithCustomName() {
    var textToSave = document.getElementById("textArea").innerText;
    var fileName = prompt("파일 이름을 입력하세요:", "notepad.txt");

    if (fileName != null) {
        var blob = new Blob([textToSave], { type: "text/plain;charset=utf-8" });
        var downloadLink = document.createElement("a");
        downloadLink.download = fileName;
        
        if (window.webkitURL != null) {
            downloadLink.href = window.webkitURL.createObjectURL(blob);
        } else {
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }
    
        downloadLink.click();
    }
}

// 파일 불러오기 함수
function loadFileAsText() {
    var fileInput = document.getElementById("fileInput");
    var file = fileInput.files[0];

    var reader = new FileReader();
    reader.onload = function(event) {
        var text = event.target.result;
        document.getElementById("textArea").innerText = text;
        document.getElementById("fileName").textContent = file.name;
    };

    reader.readAsText(file);
}
// 폰트 크기를 변경하는 함수
function changeFontSize() {
    var fontSizeInput = document.getElementById("fontSizeInput");
    var fontSize = fontSizeInput.value + "px";
    var textArea = document.getElementById("textArea");
    textArea.style.fontSize = fontSize;
}

// 현재 텍스트의 굵기를 추적하는 변수
var isBold = false;

// 폰트 크기를 변경하는 함수
function changeFontSize() {
    var fontSizeInput = document.getElementById("fontSizeInput");
    var fontSize = fontSizeInput.value + "px";
    var textArea = document.getElementById("textArea");
    textArea.style.fontSize = fontSize;
}

// 굵기를 토글하는 함수
function toggleFontWeight() {
    var textArea = document.getElementById("textArea");
    if (!isBold) {
        textArea.style.fontWeight = "bold";
    } else {
        textArea.style.fontWeight = "normal";
    }
    // 굵기 상태를 토글
    isBold = !isBold;
}

// 버튼에 이벤트 리스너 추가
document.getElementById("fontSizeInput").addEventListener("input", changeFontSize);
document.getElementById("toggleFontWeightButton").addEventListener("click", toggleFontWeight);
document.getElementById("fontSizeInput").addEventListener("input", changeFontSize);
document.getElementById("saveButton").addEventListener("click", saveTextAsFile);
document.getElementById("loadButton").addEventListener("click", loadFileAsText);
document.getElementById("saveAsButton").addEventListener("click", saveTextAsFileWithCustomName);
