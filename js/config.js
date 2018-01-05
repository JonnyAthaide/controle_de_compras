function setConfig(){
    var texts = {
        "title":"Shopping Control"
    };

    // Titulo da página
    document.title = texts.title;
    document.getElementById("navTitle").innerHTML = texts.title;
}

setConfig();