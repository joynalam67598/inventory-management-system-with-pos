<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function saveCategory(Request $request){

        $this->validate($request,[
            "cat_name" => 'required'
        ]);

        $category = new Category();
        $category->cat_name =  $request->cat_name;
        $category->save();
        return response()->json([
            "message"=>"Category added successfully!",
            200
        ]);
    }

    public function getCategories(){
        $categories = Category::all();
        return response()->json([
            "categories"=>$categories,
            200
        ]);

    }

    public function editCategory($id){
        $category = Category::findOrFail($id);
        return response()->json([
            "category"=>$category,
            200
        ]);

    }

    public function updateCategory(Request $request){
        $this->validate($request,[
            "cat_id" => 'required|numeric',
            "cat_name" => 'required'
        ]);
        $category = Category::findOrFail($request->cat_id);
        $category->cat_name =  $request->cat_name;
        $category->update();
        return response()->json([
            "message"=>"Category updated successfully!",
            200
        ]);
    }

    public function deleteCategory($id){
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json([
            "message"=>"Category removed successfully!",
            200
        ]);

    }
}
