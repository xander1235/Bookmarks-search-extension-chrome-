import { getAllDataKeys } from "./process_data.js";
import {result, dataModel} from "./utils.js"

export function searchData(bookmarkName) {
    
    if(bookmarkName.value != '') {
        var dataList = getAllDataKeys().filter(n => n.toLowerCase().includes(bookmarkName.value.toLowerCase())).map(n => dataModel(n) )
        dataList.forEach(n => {
            result.appendChild(n)
        })
    }

}