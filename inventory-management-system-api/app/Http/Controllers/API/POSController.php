<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class POSController extends Controller
{
    public function getProductByCategory($cat_id)
    {
        $products = Product::where('cat_id','=',$cat_id)->get();
         return response()->json([
            "products"=>$products,
            "status"=>200,
        ]);
    }

    public function getProductByCategoryAndBrand($cat_id, $brand_id)
    {
        $products = Product::where('cat_id','=',$cat_id)->where('brand_id','=',$brand_id)->get();
         return response()->json([
            "products"=>$products,
            "status"=>200,
        ]);
    }
}
