import express from 'express';
import Stock from '../models/Stock.js'; 

export const stockAdd = async (req, res) => {
    try {
        const { medicine, price, quantity } = req.body;

        if (!medicine || !price || !quantity) {
            return res.status(422).json({ error: 'empty fields!' });
        }

        const stockEntry = new Stock({
            medicine,
            price,
            quantity,
        });

        await stockEntry.save();

        return res.status(201).json({ message: 'Stock information added successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

export const viewAllStocks = async(req,res)=>{
    try {
        const stocks = await Stock.find();

        if (!stocks) {
            return res.status(404).json({ message: 'No items found' });
        }

        return res.status(200).json({ stocks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}

export const deleteStockItem = async(req,res)=>{
    try {
        const stockId = req.params.stockId;

        const stockItem = await Stock.findById(stockId);

        if (!stockItem) {
            return res.status(404).json({ error: 'Stock item not found' });
        }

        await Stock.findByIdAndDelete(stockId);

        return res.status(200).json({ message: 'Stock item deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}

export const editStockCount = async (req, res) => {
    try {
        const stockId = req.params.stockId;
        const { newCount } = req.body;

        if (!newCount) {
            return res.status(422).json({ error: 'New count is required' });
        }

        const stockItem = await Stock.findById(stockId);

        if (!stockItem) {
            return res.status(404).json({ error: 'Stock item not found' });
        }

        stockItem.quantity = newCount;
        await stockItem.save();

        return res.status(200).json({ message: 'Stock count updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};







