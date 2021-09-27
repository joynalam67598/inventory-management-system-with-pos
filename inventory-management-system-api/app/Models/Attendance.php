<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;
    protected $fillable = [
        "employee_id",
        "att_date",
        "att_month",
        "att_year",
        "attendance",
    ];
}
