
var allDataKeys;
export var nodes = []
chrome.storage.local.get(null, function(items) {
    allDataKeys = Object.keys(items);
});


export function getAllDataKeys() {
    return allDataKeys
}

chrome.bookmarks.getTree(function (itemTree) {
    itemTree.forEach(function (item) {
        processNode(item);
    });
})

function processNode(node) {
    if (node.children) {
        node.children.forEach(function (child) { processNode(child); });
    }

    if (node.url) { nodes.push(node) }
}