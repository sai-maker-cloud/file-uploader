const form = document.getElementById("uploadform");
const fileinput = document.getElementById("fileinput");
const msg = document.getElementById("msg");
const filename = document.getElementById("filename");
const fileList = document.getElementById("fileList");

fileinput.addEventListener("change", () => {
    filename.innerText = fileinput.files[0]?.name || "No file selected";
});

async function loadFiles() {
    const res = await fetch("/all-files");
    const files = await res.json();

    fileList.innerHTML = "";
    files.forEach(file => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="/files/${file}" target="_blank">${file}</a>`;
        fileList.appendChild(li);
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", fileinput.files[0]);

    const res = await fetch("/upload", {
        method: "POST",
        body: data
    });

    const result = await res.json();
    msg.innerText = result.message;

    form.reset();
    filename.innerText = "No file selected";
    loadFiles();
});

loadFiles();
