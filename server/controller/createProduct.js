import Product from "../model/product.js";


export const createProduct = async (req, res) => {
  try {
    const { title, price, description, category, image, sold, dateOfSale } = req.body;

    if(! (title || price || description || category || image || sold || dateOfSale)){
        return res.status(400).json({ message: "Please fill in all fields" });
    }

    const product = new Product({
      title,
      price,
      description,
      category,
      image,
      sold,
      dateOfSale,
    });

    const savedProduct = await product.save();

    let data = {
        success: true,
        message: 'Product created successfully',
        data: savedProduct
    }

    res.status(201).json(data);
  } catch (error) {
    console.log(error)
    res.status(400).json({
        success: false,
        message: 'Product not created',
        error:  error.message

    });
  }
};
