/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    
    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        const generatedId = this.productsService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice
        );
        return { id: generatedId };

    }

    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string,) {
        return this.productsService.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ){
        this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice)
        return "Updated Successfully";
    }

    @Delete(':id')
    deleteProduct(@Param('id') prodId: string ){
        this.productsService.deleteProduct(prodId);
        return "Product deleted Successfully"
    }

}