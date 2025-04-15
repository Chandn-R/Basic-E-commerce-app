import { sql } from "../config/db.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await sql`
        SELECT * FROM products
        `;
        // console.log("Headers already sent?", res.headersSent);
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error fetching products", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await sql`
        SELECT * FROM products WHERE id=${id}
        `;
        res.status(200).json({ success: true, data: product[0] });

    } catch (error) {
        console.log("Error fetching product", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        
    }
};

export const createProducts = async (req, res) => {
    const { name, image, price } = req.body;

    if (!name || !image || !price) {
        return res.status(400).json({ success: false, message: "All fields are required" })
    }

    try {
        const newProduct = await sql`
                INSERT INTO products (name, image, price)
                VALUES (${name}, ${image}, ${price})
                RETURNING *
                `;

        res.status(201).json({ success: true, data: newProduct[0] });
    } catch (error) {
        console.log("Error creating product", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const updateProducts = async (req, res) => {
    const { id } = req.params;
    const { name, image, price } = req.body;

    try {
        const updatedProduct = await sql`
            UPDATE products
            SET name = ${name}, image = ${image}, price = ${price}
            WHERE id = ${id}
            RETURNING *
        `;

        res.status(200).json({ success: true, data: updatedProduct[0] });
    } catch (error) {
        console.log("Error updating product", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export const deleteProducts = async (req, res) => {
    const { id } = req.params;

    try {
        await sql`
            DELETE FROM products
            WHERE id = ${id}
        `;
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.log("Error deleting product", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};