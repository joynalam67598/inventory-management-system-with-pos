<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveEmployeeRequest extends FormRequest
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
            "email"=> "required|email|unique:employees",
            "phone"=> "required|max:15|min:11",
            "nid_no"=> "required|max:20|unique:employees",
            "photo"=> "required",
            "address"=> "required|max:500",
            "salary"=> "required|numeric",
            "city"=> "required|max:20",
            "experience"=> "required",
            "vacation"=> "required|numeric",
        ];
    }
}
