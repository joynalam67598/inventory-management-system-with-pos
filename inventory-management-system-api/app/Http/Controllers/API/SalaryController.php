<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaveAdvancedSalaryRequest;
use App\Models\AdvancedSalary;
use App\Models\Salary;
use Illuminate\Http\Request;
use DB;

class SalaryController extends Controller
{
    public function saveAdvancedSalary(SaveAdvancedSalaryRequest $request){
        $month = $request->month;
        $year = $request->year;
        $employeeId = $request->employee_id;
        $alreadyAdvanced = DB::table("advanced_salaries")
            ->where('month','=',$month)
            ->where('year','=',$year)
            ->where('employee_id','=',$employeeId)
            ->first();
        if($alreadyAdvanced)
        {
            return response()->json([
                "message"=>"Oops! Already advanced paid for this month!",
                400,
            ]);
        }

        $salary = new AdvancedSalary();
        $salary-> employee_id = $request-> employee_id;
        $salary-> month = $request-> month;
        $salary-> year = $request-> year;
        $salary-> advance_salary = $request-> advance_salary;
        $salary->save();
        return response()->json([
            "message"=>"Advance Salary given successfully!",
            200,
        ]);
    }

    public function getAdvancedSalaries(){
        $salaries = DB::table("advanced_salaries")
            ->join("employees","employees.id",'=','advanced_salaries.employee_id')
            ->select("advanced_salaries.*","employees.name","employees.salary","employees.photo")
            ->orderBy("id","DESC")
            ->get();
        return response()->json([
            "salaries"=>$salaries,
            200,
        ]);
    }

    public function getPayableSalary(){

        $month = date("F",strtotime("-1 month"));
        $payableSalaries = DB::table("advanced_salaries")
            ->leftJoin("employees","employees.id",'=','advanced_salaries.employee_id')
            ->select("advanced_salaries.*","employees.name","employees.salary","employees.photo")
            ->where('month','=',$month)
//            ->orderBy("id","DESC")
            ->get();
    }
}
