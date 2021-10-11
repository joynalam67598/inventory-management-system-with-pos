<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaveAttendanceRequest;
use App\Models\Attendance;
use Illuminate\Http\Request;
use DB;

class AttendanceController extends Controller
{

    public function saveAttendance(Request $request){

        $edit_date = date('d-m-Y');
        $attendanceTaken = Attendance::where('att_date','=',$edit_date)->first();

        if($attendanceTaken){
            return response()->json([
            "message"=>"Today attendance already taken!","status"=>400
          ]);
        }
        else{

           for($i=0;$i<count($request->all());$i++)
            {
                $attendance = new Attendance();
                $attendance->employee_id = $request[$i][0];
                $attendance->attendance =  $request[$i][1];
                $attendance->att_date = date('d-m-Y');
                $attendance->edit_date = $edit_date;
                $attendance->att_month = date('F');
                $attendance->att_year = date("Y");
                $attendance->save();
            }

            return response()->json([
                "message"=>"Attendance taken sucessfully!","status"=>200
            ]);
        }
    }
    public function getAttendances(){
        $attendances = DB::table('attendances')
            ->select('att_date')->groupBy('att_date')->get();
        return response()->json([
            'attendances'=>$attendances,"status"=>200
        ]);
    }

    public function getAttendance($date){
        $employees = DB::table('attendances')
            ->join('employees','employees.id','=','attendances.employee_id')
            ->select('attendances.*','employees.name','employees.photo')
            ->where('attendances.edit_date','=',$date)
            ->get();
        return response()->json([
            'employees'=>$employees,"status"=>200
        ]);
    }

    public function updateAttendance(Request $request){

        for($i=0;$i<count($request->all());$i++)
            {
                $attendance = Attendance::where('att_date','=',$request[$i][2])
                                          ->where('employee_id','=',$request[$i][0])
                                          ->first();
                $attendance->attendance =  $request[$i][1];
                $attendance->edit_date = date('d-m-Y');
                $attendance->update();
            }

            return response()->json([
                "message"=>"Attendance taken sucessfully!","status"=>200
            ]);
        
    }
}
