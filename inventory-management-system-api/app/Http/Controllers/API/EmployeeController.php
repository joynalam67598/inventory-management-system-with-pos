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

        $employee = new Employee();
//        $request->photo = $this->uploadEmployeeImage($request);
        $employee->name = $request->name;
        $employee->email = $request->email;
        $employee->nid_no = $request->nid_no;
        $employee->phone = $request->phone;
        $employee->address = $request->address;
        $employee->city = $request->city;
        $employee->vacation = $request->vacation;
        $employee->salary = $request->salary;
        $employee->experience = $request->experience;
        $employee->photo = "add later";
        $employee->save();
        return response()->json([
            "message"=>"Employee added successfully!",
            200,
        ]);
    }
    public function getEmployees(){
        $employees = Employee::all();
        return response()->json([
            "employees"=>$employees,
            200
        ]);
    }

    public function showEmployee($id){
        $employee = Employee::findOrFail($id);
        return response()->json([
            "employee"=>$employee,
            200
        ]);
    }
    public function editEmployee($id){
        $employee = Employee::findOrFail($id);
        return response()->json([
            "employee"=>$employee,
            200
        ]);
    }
    public function deleteEmployee($id){
        $employee = Employee::findOrFail($id);
        $employee->delete();
        // unlink photo
        return response()->json([
            "message"=>"Employee deleted successfully",
            200
        ]);
    }
    public function updateEmployee(UpdateEmployeeRequest $request){
        $employee = Employee::findOrFail($request->emp_id);;
//        $request->photo = $this->uploadEmployeeImage($request);
        $employee->name = $request->name;
        $employee->email = $request->email;
        $employee->nid_no = $request->nid_no;
        $employee->phone = $request->phone;
        $employee->address = $request->address;
        $employee->city = $request->city;
        $employee->vacation = $request->vacation;
        $employee->salary = $request->salary;
        $employee->experience = $request->experience;
        $employee->photo = "add later";
        $employee->update();
        return response()->json([
            "message"=>"Employee updated successfully!",
            200,
        ]);
    }
}
