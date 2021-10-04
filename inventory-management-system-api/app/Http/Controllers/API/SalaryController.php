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
                "status"=>400,
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
            "status"=>200,
        ]);
    }

    public function getAdvancedSalaries(){
        $advanceSalaries = DB::table("advanced_salaries")
            ->join("employees","employees.id",'=','advanced_salaries.employee_id')
            ->select("advanced_salaries.*","employees.name","employees.salary","employees.photo")
            ->orderBy("id","DESC")
            ->get();
        return response()->json([
            "advanceSalaries"=>$advanceSalaries,
            "status"=>200,
        ]);
    }

    public function getPayableSalary(){

        $prevMonth = date("F",strtotime("-1 month"));
        $currMonth = date("F",strtotime("0 month"));
//        $year = date("Y",strtotime("0 year"));
        $payableSalaries = DB::table("employees")
            ->leftJoin("advanced_salaries",'advanced_salaries.employee_id','=',"employees.id" ,'and',
                'advanced_salaries.month','=',$prevMonth,'or','advanced_salaries.month','=',$currMonth)
            ->select("advanced_salaries.advance_salary","employees.name","employees.salary","employees.photo")
            //->where('month','=',$prevMonth,'or','month','=',$currMonth)
//            ->orderBy("id","DESC")
            ->get();
        return response()->json([
            "payableSalaries"=>$payableSalaries,
            "status"=>200,
        ]);
    }
}
