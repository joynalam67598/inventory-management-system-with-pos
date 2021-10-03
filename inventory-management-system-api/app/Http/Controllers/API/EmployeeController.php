<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaveEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Employee;
use Illuminate\Http\Request;
use Image;

class EmployeeController extends Controller
{
    protected function uploadEmployeeImage($request){
        $employeeImage = $request->file('photo');
        $imageType = $employeeImage->getClientOriginalExtension();
        $imageName = rand(100,100000).$request->name.'.'.$imageType;
        $directory = 'inventory/employee-images/';
        $imageUrl = $directory.$imageName;
        Image::make($employeeImage)->save($imageUrl);
        return $imageUrl;

    }

    public function saveEmployee(SaveEmployeeRequest $request){

        $imageUrl = $this->uploadEmployeeImage($request);
        $employee = new Employee();
        $employee->name = $request->name;
        $employee->email = $request->email;
        $employee->nid_no = $request->nid_no;
        $employee->phone = $request->phone;
        $employee->address = $request->address;
        $employee->city = $request->city;
        $employee->vacation = $request->vacation;
        $employee->salary = $request->salary;
        $employee->experience = $request->experience;
        $employee->photo = $imageUrl;
        $employee->save();
        return response()->json([
            "message"=>"Employee added successfully!",
            "status"=>200,
        ]);
    }
    public function getEmployees(){
        $employees = Employee::all();
        return response()->json([
            "employees"=>$employees,
            "status"=>200,
        ]);
    }

    public function getEmployee($id){
        $employee = Employee::findOrFail($id);
        return response()->json([
            "employee"=>$employee,
            "status"=>200,
        ]);
    }

    public function deleteEmployee($id){
        $employee = Employee::findOrFail($id);
        unlink($employee->photo);
        $employee->delete();
        return response()->json([
            "message"=>"Employee deleted successfully",
            "status"=>200,
        ]);
    }
    public function updateEmployee(UpdateEmployeeRequest $request){
        
        $employee = Employee::findOrFail($request->id);
        if($request->hasFile('photo'))
        {
            unlink($employee->photo);
            $imageUrl = uploadEmployeeImage($request);
            $request->photo = $imageUrl;
        }
        $employee->name = $request->name;
        $employee->email = $request->email;
        $employee->nid_no = $request->nid_no;
        $employee->phone = $request->phone;
        $employee->address = $request->address;
        $employee->city = $request->city;
        $employee->vacation = $request->vacation;
        $employee->salary = $request->salary;
        $employee->experience = $request->experience;
        $employee->update();
        return response()->json([
            "message"=>"Employee updated successfully!",
            "status"=>200,
        ]);
    }
}
