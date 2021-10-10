<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaveExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use App\Models\Expense;
use Illuminate\Http\Request;
use DB;

class ExpenseController extends Controller
{
    public function saveExpense(SaveExpenseRequest $request){
        $expense = new Expense();
        $expense->expense_details = $request->expense_details;
        $expense->exp_amount = $request->exp_amount;
        $expense->date = date("d-m-Y");
        $expense->month = date("F");
        $expense->year = date("Y");
        $expense->save();
        return response()->json([
            "message"=>"Expense data saved successfully!",'status'=>200,
        ]);
    }

    public function getExpense($id){
        $expense = Expense::findOrFail($id);
        return response()->json([
            "expense"=>$expense,'status'=>200
        ]);
    }

    public function updateExpense(UpdateExpenseRequest $request){
        $expense = Expense::findOrFail($request->exp_id);
        $expense->expense_details = $request->expense_details;
        $expense->exp_amount = $request->exp_amount;
        $expense->update();
        return response()->json([
            "message"=>"Expense data updated successfully!",'status'=>200
        ]);

    }

    // public function getExpenses(){
    //     $expenses = Expense::all();
    //     return response()->json([
    //         "expenses"=>$expenses,'status'=>200
    //     ]);
    // }

    // public function getTodayExpense(){
    //     $date = date("d/m/yy");
    //     $todayExpense = DB::table('expenses')
    //         ->where('date','=',$date)
    //         ->get();
    //     return response()->json([
    //         "todayExpense"=>$todayExpense,'status'=>200
    //     ]);
    // }

    // public function getMonthExpense($month){
    //     $year = date("Y");
    //     $monthExpense = DB::table('expenses')
    //         ->where('month','=',$month)
    //         ->where('year','=',$year)
    //         ->get();
    //     return response()->json([
    //         "monthExpense"=>$monthExpense,'status'=>200
    //     ]);
    // }

    public function getExpenseInRange($formDate,$toDate){

        $formDate = date_format(date_create($formDate),"d-m-Y");
        $toDate = date_format(date_create($toDate),"d-m-Y");

        $expensesInRange = Expense::select(DB::raw('sum(exp_amount) as total_expense'), 'expenses.*')            ->whereBetween('date', [$formDate, $toDate])
                        ->get();
        return $expensesInRange;

        return response()->json([
            "expensesInRange"=>$expensesInRange,'status'=>200
        ]);
    }

    // public function getYearExpense(){
    //     $year = date("Y");
    //     $yearExpense = DB::table('expenses')
    //         ->where('year','=',$year)
    //         ->get();
    //     return response()->json([
    //         "yearExpense"=>$yearExpense,'status'=>200
    //     ]);
    // }

    public function delete($id){
        $expense = Expense::findOrFail($id);
        $expense->delete();
        return response()->json([
            "message"=>"Expense data deleted successfully!",'status'=>200
        ]);
    }
}
