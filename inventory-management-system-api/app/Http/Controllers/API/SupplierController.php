<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaveSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    protected function uploadSupplierImage($request){
        $supplierImage = $request->file('photo');
        $imageType = $supplierImage->getClientOriginalExtension();
        $imageName = rand(100,100000).$request->name.'.'.$imageType;
        $directory = 'inventory/supplier-images/';
        $imageUrl = $directory.$imageName;
        Image::make($supplierImage)->save($imageUrl);
        return $imageUrl;

    }

    public function saveSupplier(SaveSupplierRequest $request){
        $supplier = new Supplier();
        $supplier-> name = $request-> name;
        $supplier-> email = $request-> email;
        $supplier-> phone = $request-> phone;
        $supplier-> address = $request-> address;
        $supplier-> city = $request-> city;
        $supplier-> type = $request-> type;
        $supplier-> shop_name = $request-> shop_name;
        $supplier-> bank_name = $request-> bank_name;
        $supplier-> branch_name = $request-> branch_name;
        $supplier-> account_holder = $request-> account_holder;
        $supplier-> account_number = $request-> account_number;
        $supplier-> photo = $request-> photo;
        $supplier->save();
        return response()->json([
            "message"=>"Supplier added successfully!",
            200,
        ]);

    }
    public function getSupplier(){
        $suppliers = Supplier::all();
        return response()->json([
            "suppliers" =>$suppliers,200,
        ]);
    }
    public function showSupplier($id){
        $supplier = Supplier::findOrFail($id);
        return response()->json([
            "supplier" =>$supplier,200,
        ]);
    }
    public function editSupplier($id){
        $supplier = Supplier::findOrFail($id);
        return response()->json([
            "supplier" =>$supplier,200,
        ]);
    }
    public function updateSupplier(UpdateSupplierRequest $request){
        $supplier = Supplier::findOrFail($request->cust_id);
        $supplier-> name = $request-> name;
        $supplier-> email = $request-> email;
        $supplier-> phone = $request-> phone;
        $supplier-> address = $request-> address;
        $supplier-> city = $request-> city;
        $supplier-> type = $request-> type;
        $supplier-> shop_name = $request-> shop_name;
        $supplier-> bank_name = $request-> bank_name;
        $supplier-> branch_name = $request-> branch_name;
        $supplier-> account_holder = $request-> account_holder;
        $supplier-> account_number = $request-> account_number;
        $supplier-> photo = $request-> photo;
        $supplier->save();
        return response()->json([
            "message"=>"Supplier data updated successfully!",
            200,
        ]);
    }


    public function deleteCustomer($id){
        $supplier = Supplier::findOrFail($id);
        return response()->json([
            "message"=>"Supplier removed successfully!",
            200,
        ]);

    }
}
