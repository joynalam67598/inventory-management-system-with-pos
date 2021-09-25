<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdvancedSalary extends Model
{
    use HasFactory;
    protected $fillable =[
        "employee_id",
        "month",
        "year",
        "advance_salary",
    ];
}
