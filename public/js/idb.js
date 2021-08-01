let db;

const request= indexedDB.open('budget', 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_budget', {autoIncrement: true});
}

//sucessful
request.onsuccess = function(event) {
    db = event.target.result;
    if (navigator.onLine){
        //function to upload budget
        uploadBudget();
    }
}
request.onerror = function(event) {
    console.log(event.taget.errorCode);
}

// function saveTransact
function saveRecord(record) {
    const transaction = db.transaction(['new_budget'],'readwrite');
    const budgetObjectStore = transaction.objectStore('new_budget');
    budgetObjectStore.add(record);
};

function uploadBudget(){
    const transaction = db.transaction(['new_budget'], 'readwrite');
    const budgetObjectStore = transaction.objectStore('new_budget');
    const getAll = budgetObjectStore.getAll();


    getAll.onsuccess = function(){
        if (getAll.result.length > 0) {
            fetch('/api/transaction',{
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(serverResponse => {
            if (serverResponse.message) {
                throw new Error(serverResponse);
            }
            // open one more transaction
            const transaction = db.transaction(['new_budget'], 'readwrite');
            // access the bduget object store
            const budgetObjectStore = transaction.objectStore('new_budget');
            // clear all items in your store
            budgetObjectStore.clear();

            alert('transaction has been submitted!');
            })
            .catch(err => {
            console.log(err);
            });
        }
    };
}
window.addEventListener('online', uploadBudget);