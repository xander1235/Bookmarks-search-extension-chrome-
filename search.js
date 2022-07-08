var bookmarkName = document.getElementById('bName')
var popupDialog = document.getElementById('popupDialog');
var popup = document.getElementById("myPopup");
var closeButton = document.getElementsByClassName("close")[0];  // Get the <span> element that closes the popup
var newTab = document.getElementById("newTab");
var newWindow = document.getElementById("newWindow");
var e = document.getElementById("searchByType");

bookmarkName.addEventListener('input', startSearching);

const nodes = []

chrome.bookmarks.getTree(function (itemTree) {
    itemTree.forEach(function (item) {
        processNode(item);
    });
})

var currUrl;

function createAnchor(title, url) {
    var a = document.createElement('a')
    var text = document.createTextNode(title)
    a.appendChild(text)
    a.title = title
    a.style.color = 'white'
    a.style.textDecoration = 'none'
    a.href = url
    return a
}

function processNode(node) {
    if (node.children) {
        node.children.forEach(function (child) { processNode(child); });
    }

    if (node.url) { nodes.push(node) }
}

function startSearching() {
    document.getElementById("result").innerHTML = ''
    var bookmarkType = e.options[e.selectedIndex].text;
    if (bookmarkName.value != '') {

        var results = [];
        if (bookmarkType.toString() == "Title") {
            results = nodes.filter(n => n.title.toString().toLowerCase().includes(bookmarkName.value.toLowerCase())).map(n => createAnchor(n.title.toString(), n.url.toString()) )
        } else {
            results = nodes.filter(n => n.url.toString().toLowerCase().includes(bookmarkName.value.toLowerCase())).map(n => createAnchor(n.url.toString(), n.url.toString()) )
        }

        //document.getElementById("result").innerHTML = results.join("<br></br>")
        var result = document.getElementById("result")

        console.log(results)
        results.forEach(n => {
            result.appendChild(n)
            result.appendChild(document.createElement('br'))
            result.appendChild(document.createElement('br'))
        })

        Array.from(document.getElementsByTagName("a")).forEach(anr => anr.addEventListener('click', function (e) {
            currUrl = this.attributes.href.nodeValue
            e.preventDefault()
            e.stopPropagation()
            popup.style.display = "block"
        }))


    } else {
        document.getElementById("result").innerHTML = ''
    }

}


// When the user clicks on <span> (x), close the modal
newTab.onclick = function () {
    popup.style.display = "none";
    //window.open(currUrl, "_blank")

    chrome.tabs.create({
        // Just use the full URL if you need to open an external page
        url: currUrl
    })
}

// When the user clicks on <span> (x), close the modal
newWindow.onclick = function () {
    popup.style.display = "none";
    chrome.windows.create({
        // Just use the full URL if you need to open an external page
        url: currUrl
    })
}

// When the user clicks on <span> (x), close the modal
closeButton.onclick = function () {
    popup.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}
