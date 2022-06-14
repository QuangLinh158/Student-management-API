const downloadFile = (filename, blob) => {
    const url = window.URL || window.webkitURL;
    const urlData = url.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = urlData;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    url.revokeObjectURL(urlData);
};
const Utils = {
    downloadFile,
};
export default Utils; 