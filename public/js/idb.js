let db;

const request= indexedDB.open('name', 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_budget', {autoIncrement: true});
}

//sucessful
request.onsuccess = function(event) {
    db = db.target.result;
    if (navigator.onLine){
        //function to upload budget
    }
}

request.onerror = function(event) {
    console.log(event.taget.errorCode);
}

// function saveTransact