<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;
    protected $fillable=[
        "name",
        "email",
        "phone",
        "photo",
        "shop_name",
        "address",
        "type",
        "city",
        "bank_name",
        "account_holder",
        "bank_branch",
        "account_number",
    ];
}
