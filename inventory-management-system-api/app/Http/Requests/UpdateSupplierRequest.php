<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSupplierRequest extends FormRequest
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
            'email'=>['email','required',
                Rule::unique('suppliers')->ignore($this->id)],
            "phone"=> ['required','max:15',
                Rule::unique('suppliers')->ignore($this->id)],
//            "photo"=> "required",
            "address"=> "required|max:500",
            "city"=> "required|max:50",
            "shop_name"=> "required",
            "type"=> "required",
//            "bank_name"=> "required",
//            "account_holder"=> "max:20",
//            "account_number"=> "required",
//            "branch_name"=> "required",
        ];
    }
}
