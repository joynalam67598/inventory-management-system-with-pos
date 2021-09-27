<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaveAttendanceRequest;
use App\Models\Attendance;
use Illuminate\Http\Request;
use DB;

class AttendanceController extends Controller
{

    public function saveAttendance(SaveAttendanceRequest $request){

        $edit_date = date('d/m/Y');
        $edit_date =str_replace('/','-',$edit_date);
        $attendance = new Attendance();
        $attendance->employee_id = $request->employee_id;
        $attendance->attendance = $request->attendance;
        $attendance->att_date = date('d/m/Y');
        $attendance->edit_date = $edit_date;
        $attendance->att_month = date('F');
        $attendance->att_year = date("Y");
        $attendance->save();

        return response()->json([
            "message"=>"Attendance taken successfully!",200
        ]);
    }
    public function getAttendances(){
        $attendances = DB::table('attendances')
            ->select('edit_date')->groupBy('edit_date')->get();
        return response()->json([
            'attendances'=>$attendances,200
        ]);
    }

    public function getAttendance($date){
        $attendance = DB::table('attendances')
            ->join('employees','employees.id','=','attendances.employee_id')
            ->select('attendances.*','employees.name','employees.photo')
            ->where('attendances.edit_date','=',$date)
            ->get();
        return response()->json([
            'attendance'=>$attendance,200
        ]);
    }

    public function updateAttendance(){
        //
    }
}
