import main from './mainwindow.jsx'


const STORAGE_KEY = 'prodStorage';

export function dataStorage(){
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
    }
}

export function setDataProdList (newDataProdList) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newDataProdList));
        window.dispatchEvent(new Event('dataProdListUpdated'));
        console.log('Updated taskStorage:', newDataProdList);
    } catch (e) {
        
    }
}

window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
        window.dispatchEvent(new Event('dataTaskListUpdated'));
        }
});

export function clearALLdata(){
    localStorage.removeItem(STORAGE_KEY);
}

//clearALLdata();

// data display

let listdateProd = document.getElementById('dataLists');

export function dataDisplay() {
    let datalist = dataStorage();

    listdateProd.innerHTML = "";

    datalist.forEach((data, index) => {
        const prodDiv = document.createElement("div");
        prodDiv.className = "prodNames";
        prodDiv.id = `prodInfo-${index}`;
        prodDiv.setAttribute("data-index", index);

        const prodText = document.createElement("p");
        prodText.textContent = `Prod-Name: ${data.prodname}`;
        prodDiv.appendChild(prodText);

        const retailText = document.createElement("p");
        retailText.textContent = `Retail: ${data.retail}`;
        prodDiv.appendChild(retailText);

        listdateProd.appendChild(prodDiv);
    });

    console.log(datalist);
}