<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEmployeeRequest extends FormRequest
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
                Rule::unique('employees')->ignore($this->id)],
            "phone"=> ['required','max:15',
                Rule::unique('employees')->ignore($this->id)],
            "nid_no"=> ["required","numeric",
                Rule::unique('employees')->ignore($this->id)],
            "address"=> "required|max:500",
            "salary"=> "required|numeric",
            "city"=> "required|max:20",
            "experience"=> "required",
            "vacation"=> "required|numeric",
        ];
    }
}
