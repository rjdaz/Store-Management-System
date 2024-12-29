import React, { useState, useEffect } from 'react';
import './update.css'
import { dataStorage, setDataProdList } from './dataStorage.js'
import MainWindow from './mainwindow.jsx'

function Update({ selectedProduct, closeUpdateWindow }) {
    const [productName, setProductName] = useState('');
    const [investment, setInvestment] = useState('');
    const [investmentQty, setInvestmentQty] = useState('');
    const [wholesale, setWholesale] = useState('');
    const [wholesaleQty, setWholesaleQty] = useState('');
    const [retail, setRetail] = useState('');
    const [retailQty, setRetailQty] = useState('');

    const [dataList, setDataList] = useState(dataStorage());

    useEffect(() => {
            const handleStorageUpdate = () => setDataList(dataStorage());
            window.addEventListener('dataProdListUpdated', handleStorageUpdate);
    
            return () => window.removeEventListener('dataProdListUpdated', handleStorageUpdate);
        }, []);

    useEffect(() => {
        if (selectedProduct) {
            setProductName(selectedProduct.prodname || '');
            setInvestment(selectedProduct.investment || '');
            setInvestmentQty(selectedProduct.inumber || '');
            setWholesale(selectedProduct.wholesale || '');
            setWholesaleQty(selectedProduct.wsnumber || '');
            setRetail(selectedProduct.retail || '');
            setRetailQty(selectedProduct.rnumber || '');
        }
    }, [selectedProduct]);

    const handleUpdate = () => {

        const productIndex = dataList.findIndex((data) => data.prodname === selectedProduct.prodname);

        if (productIndex !== -1) {
            dataList.splice(productIndex, 1);
    
            // Create the new updated product
            dataList.push ({
                prodname: productName.toUpperCase(),
                investment: investment,
                inumber: investmentQty,
                wholesale: wholesale,
                wsnumber: wholesaleQty,
                retail: retail,
                rnumber: retailQty,
            });
        }
    
        setDataProdList(dataList);

        console.log('Updated product:', dataList);
        alert('Product updated successfully!');
        closeUpdateWindow();
    };

    const deleteSelect = () => {
        const windowConfirm = document.getElementById('confirm');

        windowConfirm.style.zIndex = "3";
        windowConfirm.style.opacity = "1";
    }

    const deleteItem = () => {
        const productIndex = dataList.findIndex((data) => data.prodname === selectedProduct.prodname);
        
            if (productIndex !== -1) {
                dataList.splice(productIndex, 1);
            };

        setDataProdList(dataList);
        closeUpdateWindow();
    }

    return (
        <>
            <div className='update-window'>
                <h2>Update Data</h2>
                <div className='update-body'>
                    <label htmlFor="">New Product</label>
                    <input 
                        type="text" 
                        name="newProduct" 
                        className='inputProductupdate'
                        placeholder='New Product'
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        />
                    <label htmlFor="">Investment</label>
                    <div className='investment-listupdate'>
                        <input 
                            type="number" 
                            name="" 
                            className='investmentupdate' 
                            placeholder='Investment'
                            value={investment}
                            onChange={(e) => setInvestment(e.target.value)}
                            />
                        <input 
                            type="number"
                            className='investmentNumupdate'
                            placeholder='I.Qty'
                            value={investmentQty}
                            onChange={(e) => setInvestmentQty(e.target.value)}
                            />
                    </div>
                    <label htmlFor="">Wholesale</label>
                    <div className='wholesale-listupdate'>
                        <input 
                            type="number"
                            className='wholesaleupdate'
                            placeholder='WholeSale'
                            value={wholesale}
                            onChange={(e) => setWholesale(e.target.value)}
                            />
                        <input 
                            type="number" 
                            name="" 
                            className='wholesaleNumupdate'
                            placeholder='WS.Qty' 
                            value={wholesaleQty}
                            onChange={(e) => setWholesaleQty(e.target.value)}
                        />
                    </div>
                    <label htmlFor="">Retail</label>
                    <div className='retailListupdate'>
                        <input 
                            type="number" 
                            name="" 
                            className='retailupdate'
                            placeholder='Retail'
                            value={retail}
                            onChange={(e) => setRetail(e.target.value)}
                        />
                        <input 
                            type="number" 
                            className='retailNumupdate'
                            placeholder='R.Qty'
                            value={retailQty}
                            onChange={(e) => setRetailQty(e.target.value)}
                        />
                    </div>
                    <div className='updatebtn'>
                        <button onClick={closeUpdateWindow}>CLOSE</button>
                        <button onClick={deleteSelect}>DELETE</button>
                        <button onClick={handleUpdate}>UPDATE</button>
                    </div>
                    <div className='confirm' id='confirm'>
                        <p>Do you want to delete this product? <span>{productName}</span>?</p>
                        <div>
                            <button onClick={deleteItem}>Yes</button>
                            <button onClick={() => {
                                const confirmClosed = document.getElementById('confirm');

                                confirmClosed. style.zIndex = "-1";
                                confirmClosed. style.opacity = "0";
                            }}>No</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Update;