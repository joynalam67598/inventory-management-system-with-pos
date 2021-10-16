<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\SaveBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Models\Brand;
use DB;

class BrandController extends Controller
{
    public function saveBrand(SaveBrandRequest $request)
    {
        $brand = new Brand();

        $brand->name = $request->name;
        $brand->cat_id = $request->cat_id;
        $brand->sup_id = $request->sup_id;
        $brand->save();

        return response()->json([
            "message"=>"Brand added successfully!",
            "status"=>200
        ]);
    }

    public function getBrands()
    {
        $brands  = DB::table('brands')
            ->join('categories','categories.id','=','brands.cat_id')
            ->join('suppliers','suppliers.id','=','brands.sup_id')
            ->select('brands.*','suppliers.name as sup_name','suppliers.id as sup_id','suppliers.phone','categories.category_name','categories.id as cat_id')
            ->get();

        return response()->json([
            "brands"=>$brands,
            "status"=>200
        ]);

    }

    public function UpdateBrand(UpdateBrandRequest $request)
    {
        $brand = Brand::findOrFail($request->id);
        $brand->name = $request->name;
        $brand->cat_id = $request->cat_id;
        $brand->sup_id = $request->sup_id;
        $brand->update();

        return response()->json([
            "message"=>"Brand data updated successfully!",
            "status"=>200
        ]);
    }
    

    // if client want add delete related products
    public function deleteBrand($id)
    {
        $brand = Brand::findOrFail($id);
        $brand->delete();

        return response()->json([
            "message"=>"Brand deleted successfully!",
            "status"=>200
        ]);

    }
}
