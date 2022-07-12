export var newTab = document.getElementById("newTab");
export var newWindow = document.getElementById("newWindow");
export var popup = document.getElementById("myPopup");
export var result = document.getElementById("result");
var closeButton = document.getElementsByClassName("close")[0];  // Get the <span> element that closes the popup
var dataType = document.getElementById("childType1")
var bookmarksType = document.getElementById("childType2")
export var dataPopup = document.getElementById("addDataPopup")
export var addData = document.getElementById("addData")

var searchType = "Data"

dataType.addEventListener('click', toggleSearchType);
bookmarksType.addEventListener('click', toggleSearchType);

function toggleSearchType(e) {
    if (e.srcElement.innerHTML == 'Bookmarks') {
        searchType = 'Bookmarks'
        dataType.style.color = 'white'
        dataType.style.backgroundColor = '#1B2430'
        bookmarksType.style.color = 'black'
        bookmarksType.style.backgroundColor = 'white'
        addData.style.visibility = "hidden"
    } else {
        searchType = 'Data'
        bookmarksType.style.color = 'white'
        bookmarksType.style.backgroundColor = '#1B2430'
        dataType.style.color = 'black'
        dataType.style.backgroundColor = 'white'
        addData.style.visibility = "visible"
    }
    result.innerHTML = ""
}

export function getSearchType() {
    return searchType
}

newTab.addEventListener('click', newTabFunc);
// When the user clicks on <span> (x), close the modal
function newTabFunc( e) {
    popup.style.display = "none";

    chrome.tabs.create({
        // Just use the full URL if you need to open an external page
        url: e.srcElement.value
    })
}

// When the user clicks on <span> (x), close the modal
newWindow.onclick = function (e) {
    popup.style.display = "none";
    chrome.windows.create({
        // Just use the full URL if you need to open an external page
        url: e.srcElement.value
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

export function createAnchor(title, url) {
    var a = document.createElement('a')
    var text = document.createTextNode(title)
    a.appendChild(text)
    a.title = title
    a.style.color = 'white'
    a.style.textDecoration = 'none'
    a.href = url
    return a
}

export function dataModel(key) {
    var div = document.createElement('div')
    div.style.paddingBottom = '10px'

    var keyTag = document.createElement('p')
    keyTag.innerHTML = key + ':'
    keyTag.style.fontWeight = 'bold'
    keyTag.style.fontSize = '15px'
    keyTag.style.color = 'white'
    keyTag.style.marginBottom = '-6px'

    var value = document.createElement('p')
    value.innerHTML = 'Nothing'
    value.style.display = 'none'
    value.style.marginLeft = '15px'
    value.style.color = "white"
    value.addEventListener('click', function() {
        navigator.clipboard.writeText(value.innerHTML)
    })

    keyTag.addEventListener('click', function() {
        chrome.storage.local.get(key, function(res) {
            if(chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError.message);
            } else {
                if(res[key] == undefined) {
                    return;
                }
                value.innerHTML = res[key]
            }
        })
        value.style.display = 'block'
    })

    div.appendChild(keyTag)
    div.appendChild(value)

    return div
}