import { newTab, createAnchor, newWindow, popup, result } from "./utils.js";
import {nodes} from "./process_data.js"

function searchBookmarks(searchByType, bookmarkName) {
    var bookmarkType = searchByType.options[searchByType.selectedIndex].text;
    if (bookmarkName.value != '') {

        var results = [];
        if (bookmarkType.toString() == "Title") {
            results = nodes.filter(n => n.title.toString().toLowerCase().includes(bookmarkName.value.toLowerCase())).map(n => createAnchor(n.title.toString(), n.url.toString()) )
        } else {
            results = nodes.filter(n => n.url.toString().toLowerCase().includes(bookmarkName.value.toLowerCase())).map(n => createAnchor(n.url.toString(), n.url.toString()) )
        }

        console.log(results)
        results.forEach(n => {
            result.appendChild(n)
            result.appendChild(document.createElement('br'))
            result.appendChild(document.createElement('br'))
        })

        Array.from(document.getElementsByTagName("a")).forEach(anr => anr.addEventListener('click', function (e) {
            newTab.value = this.attributes.href.nodeValue
            newWindow.value = this.attributes.href.nodeValue
            e.preventDefault()
            e.stopPropagation()
            popup.style.display = "block"
        }))

    } else {
        document.getElementById("result").innerHTML = ''
    }
}

export {searchBookmarks};