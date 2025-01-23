import Product from '../models/product.js'

const addProduct = async (req,res,next)=>{
    try {
        const {productName,quantity,price,category,brand,shortDescription,longDescription,features} = req.body
        const productImage = req.file ? req.file.path : null;


        const product = new Product({
            productName,
            quantity,
            productImage,
            price,
            category,
            brand,
            shortDescription,
            longDescription,
            features
        })

        console.log(product)

        if(!product) return res.status(400).json({message:"Error while adding product"})

        await product.save()

        res.status(201).json({message:"Product added successfully"})
    } catch (error) {
        console.log(`Error while adding prod : ${error}`)
        next(error)
    }
}

const allProducts = async (req,res,next)=>{
    try {
        const allProd = await Product.find()

        if(!allProd) return res.status(404).json({message:"No product found"})
            
        res.status(201).json(allProd)

    } catch (error) {
        console.log(`Error while fetching products: ${error}`)
        next(error)
    }
}

const getOneProd = async (req,res,next)=>{
    try{
        const {id} = req.params;

        const oneProd = await Product.findById(id);
        if (!oneProd) return res.status(404).json({message:"Product not found"});

        res.status(201).json(oneProd);
    }
    catch(err){
        console.log(`Error while fetching the product: ${err}`)
        next(err)
    }
}

const deleteProduct = async (req,res,next) =>{
    try {
        const {id} = req.params;

        const delProd = await Product.findByIdAndDelete(id)

        if(!delProd) return res.status(404).json({message:"product not found"})
        
        const currentProds = await Product.find();
        res.status(201).json({message:"Product deleted successfully", currentProds})

    } catch (error) {
        console.log(`Error while deleting Product ${error}`)
        next(error)
    }
}

const updateProduct = async (req,res,next)=>{
    try {
        const {id} = req.params;

        const updatedData = req.body;

        const updatedProd = await Product.findByIdAndUpdate(id,updatedData,{new:true})

        if(!updatedProd) return res.status(404).json({message:"Product not found"})
                
        const currentProds = await Product.find();

        res.status(201).json({message:"Product updated successfully", currentProds})
        
    } catch (error) {
        console.log(`Error while updating : ${error}`);
        next(error)
    }
}


export { addProduct, allProducts , deleteProduct , updateProduct, getOneProd}