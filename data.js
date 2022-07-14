import { getAllDataKeys } from "./process_data.js";
import {result, dataModel, addData, dataPopup, saveData, dataKey, dataValue} from "./utils.js"

export function searchData(bookmarkName) {
    
    if(bookmarkName.value != '') {
        var dataList = getAllDataKeys().filter(n => n.toLowerCase().includes(bookmarkName.value.toLowerCase())).map(n => dataModel(n) )
        dataList.forEach(n => {
            result.appendChild(n)
        })
    }

}

addData.addEventListener('click', function () {
    dataPopup.style.display = "block"
    dataKey.value
})

saveData.addEventListener('click', function() {
    var keyValuePair = {}
    keyValuePair[dataKey.value] = dataValue.value
    chrome.storage.local.set(keyValuePair, function() {
        if(chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
        } 
    })
})