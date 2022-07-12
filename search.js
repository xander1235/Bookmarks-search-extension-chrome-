import {searchBookmarks} from "./bookmarks.js"
import {getSearchType, result, dataModel} from "./utils.js"
import {searchData} from "./data.js"

var bookmarkName = document.getElementById('bName')
var searchByType = document.getElementById("searchByType");

bookmarkName.addEventListener('input', startSearching);

function startSearching() {
    result.innerHTML = ''
    
    if(getSearchType() == 'Data') {
        searchData(bookmarkName)
    } else {
        searchBookmarks(searchByType, bookmarkName)
    }
}




// chrome.storage.local.set(objectToStore, function(data)
// {
//    if(chrome.runtime.lastError)
//    {
//        /* error */
//        console.log(chrome.runtime.lastError.message);
//        return;
//    }
//   //all good. do your thing..
// }
