import React, { useState, useEffect } from 'react';
import './mainwindow.css'
import { dataStorage, setDataProdList } from './dataStorage.js'
import Update from './update.jsx'

function MainWindow({ style }) {

    const [dataList, setDataList] = useState(dataStorage());
    const [inputSearch, setInputSearch] = useState(''); // for searching data
    const [inputNewProd, setInputNewProd] = useState(''), // data input
          [inputInvest, setInputInvest] = useState(''),
          [inputInvestNum, setInputInvestNum] = useState(''),
          [inputWholeSale, setInputWholeSale] = useState(''),
          [inputWholeSaleNum, setInputWholeSaleNum] = useState(''),
          [inputRetail, setInputRetail] = useState(''),
          [inputRetailNum, setInputRetailNum] = useState('')

    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const handleStorageUpdate = () => setDataList(dataStorage());
        window.addEventListener('dataProdListUpdated', handleStorageUpdate);

        return () => window.removeEventListener('dataProdListUpdated', handleStorageUpdate);
    }, []);

    function clearData() {
        setInputNewProd("");
        setInputInvest("");
        setInputInvestNum("");
        setInputWholeSale("");
        setInputWholeSaleNum("");
        setInputRetail("");
        setInputRetailNum("");
    }

    return (
        <>
            <div className="container-MainWindow" style={style}>
                <div className="header-main">
                <button onClick={() => {
                    let addWindow = document.getElementById('windowForAddItem');
                    const windUpdate = document.querySelector('.viewData');

                    addWindow.style.zIndex = "2";
                    addWindow.style.opacity = "1";
                    windUpdate.style.zIndex = "-1";
                    windUpdate.style.opacity = "1";
                }}>ADD</button>
                <input 
                    type="search"
                    placeholder='Seach'
                    className='seachBar'
                    id='searchBarr'
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                    />
                </div>
                <div className='body-main'>
                    {/* Main Product List */}
                    <div className='body-table' id='dataLists'>
                        {/* data list */}
                        {(() => {
                            let searchValue = inputSearch.trim().toUpperCase();
                    
                            if (searchValue === "") {
                                return dataList
                                    .filter((data) => data.prodname.toUpperCase().includes(searchValue))
                                    .sort((a, b) => a.prodname.localeCompare(b.prodname))
                                    .map((data, index) => (
                                    <div key={index} className="prodNames" id={`prodInfo-${index}`} data-index={index}>
                                        <button onClick={(e) => {
                                            const windUpdate = document.querySelector('.viewData');
                                            let addWindow = document.getElementById('windowForAddItem');

                                            addWindow.style.zIndex = "-1";
                                            addWindow.style.opacity = "0";
                                            windUpdate.style.zIndex = "2";

                                            setSelectedProduct(data);
                                                
                                    }}>&#9780;</button>
                                        <p>P-Name: {data.prodname}</p>
                                        <p>Retail: &#8369; {data.retail}</p>    
                                    </div>
                                ));
                            } else {
                                let filteredData = dataList.filter((data) =>
                                    data.prodname.toUpperCase().includes(searchValue)
                                  );

                                return filteredData
                                    .filter((data) => data.prodname.toUpperCase().includes(searchValue))
                                    .sort((a, b) => a.prodname.localeCompare(b.prodname))
                                    .map((data, index) => (
                                    <div key={index} className="prodNames" id={`prodInfo-${index}`} data-index={index} >
                                        <button onClick={(e) => {
                                            const windUpdate = document.querySelector('.viewData')
                                            let addWindow = document.getElementById('windowForAddItem');

                                            addWindow.style.zIndex = "-1";
                                            addWindow.style.opacity = "0";
                                            windUpdate.style.zIndex = "2";
                                            setSelectedProduct(data);
                                                                
                                    }}>&#9780;</button>
                                        <p>P-Name: {data.prodname}</p>
                                        <p>Retail: &#8369; {data.retail}</p>
                                    </div>
                                    ));
                            }
                        })()}
                    </div>

                    {/* Add product */}
                    <div className='addItem' id='windowForAddItem'>
                        <div className='header-addItem'>Add Product</div>
                        <label htmlFor="">New Product</label>
                        <input 
                            type="text" 
                            name="newProduct" 
                            className='inputProduct'
                            placeholder='New Product'
                            value={inputNewProd}
                            onChange={(e) => setInputNewProd(e.target.value)}
                            />
                        <label htmlFor="">Investment</label>
                        <div className='investment-list'>
                            <input 
                                type="number" 
                                name="" 
                                className='investment' 
                                placeholder='Investment'
                                value={inputInvest}
                                onChange={(e) => setInputInvest(e.target.value)}
                                />
                            <input 
                                type="number"
                                className='investmentNum'
                                placeholder='I.Qty'
                                value={inputInvestNum}
                                onChange={(e) => setInputInvestNum(e.target.value)}
                                />
                        </div>
                        <label htmlFor="">Wholesale</label>
                        <div className='wholesale-list'>
                            <input 
                                type="number"
                                className='wholesale'
                                placeholder='WholeSale'
                                value={inputWholeSale}
                                onChange={(e) => setInputWholeSale(e.target.value)}
                             />
                            <input 
                                type="number" 
                                name="" 
                                className='wholesaleNum'
                                placeholder='WS.Qty' 
                                value={inputWholeSaleNum}
                                onChange={(e) => setInputWholeSaleNum(e.target.value)}
                            />
                        </div>
                        <label htmlFor="">Retail</label>
                        <div className='retailList'>
                            <input 
                                type="number" 
                                name="" 
                                className='retail'
                                placeholder='Retail'
                                value={inputRetail}
                                onChange={(e) => setInputRetail(e.target.value)}
                            />
                            <input 
                                type="number" 
                                className='retailNum'
                                value={inputRetailNum}
                                placeholder='R.Qty'
                                onChange={(e) => setInputRetailNum(e.target.value)}
                            />
                        </div>
                        {/* button */}
                        <div className='btnAddItem'>
                            <button onClick={() => {
                                let windowAddItem = document.getElementById('windowForAddItem');

                                clearData();
                                windowAddItem.style.zIndex = "-1";
                                windowAddItem.style.opacity = "0";
                            }}>CLOSE</button>
                            <button onClick={() => {
                                clearData();
                            }}> 
                                CLEAR
                            </button>
                            <button onClick={() => {
                                let newProdItem = inputNewProd.trim().toUpperCase(),
                                    prodInvestment = inputInvest.trim(),
                                    prodINumber = inputInvestNum.trim(),
                                    prodWSale = inputWholeSale.trim(),
                                    prodWSNumber = inputWholeSaleNum.trim(),
                                    prodRetail = inputRetail.trim(),
                                    prodRNumber = inputRetailNum.trim()
                                
                                if(!newProdItem || !prodInvestment || !prodINumber || !prodWSale || !prodWSNumber || !prodRetail || !prodRNumber){
                                    alert("All fields are required!");
                                    return;
                                }

                                let findMatchProd = dataList.find(data => data.prodname === newProdItem)

                                if(findMatchProd){
                                    alert('Already have that Product Name');
                                }else{
                                    dataList.push({
                                        prodname: newProdItem,
                                        investment: prodInvestment,
                                        inumber: prodINumber,
                                        wholesale: prodWSale,
                                        wsnumber: prodWSNumber,
                                        retail: prodRetail,
                                        rnumber: prodRNumber
                                    })
                                }

                                setDataProdList(dataList);
                                clearData();
                                console.log(dataList)
                            }}>
                                ADD
                            </button>
                        </div>
                    </div>
                    {/* window for viewData */}
                    <div className='viewData'>
                        <Update 
                            selectedProduct={selectedProduct}
                            closeUpdateWindow={() => {
                                setSelectedProduct(null)
                                const windUpdate = document.querySelector('.viewData');

                                windUpdate.style.zIndex = "-1";
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainWindow;