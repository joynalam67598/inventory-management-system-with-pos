<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "name"=> "required|max:150",
            "email"=> "email|unique:customers",
            "phone"=> "required|max:15|unique:customers",
//            "photo"=> "required",
            "address"=> "required|max:500",
            "city"=> "required|max:100",
//            "shop_name"=> "required",
//            "bank_name"=> "required",
//            "account_holder"=> "max:20",
//            "account_number"=> "required",
//            "bank_branch"=> "required|numeric",
        ];
    }
}
