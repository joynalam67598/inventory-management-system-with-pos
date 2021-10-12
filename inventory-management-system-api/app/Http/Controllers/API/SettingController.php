<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;

class SettingController extends Controller
{
    public function getSetting()
    {
        $setting = Setting::all();
        return response->json([
            "setting"=>$Setting,"status"=>200,
        ]);
    }

    protected function uploadCompanyImage($request){
        $companyImage = $request->file('company_logo');
        $imageType = $companyImage->getClientOriginalExtension();
        $imageName = rand(100,100000).$request->company_name.'.'.$imageType;
        $directory = 'inventory/company-images/';
        $imageUrl = $directory.$imageName;
        Image::make($companyImage)->save($imageUrl);
        return $imageUrl;

    }

    public function updateSetting(Request $request)
    {
         $setting = Setting::where('id','=',$request->id)->first();
         $imageUrl = '';
         if($request->hasFile('company_logo')) {
            $imageUrl = uploadCompanyImage($request);
        }

        $setting->company_name = $request->company_name;
        $setting->company_email = $request->company_email;
        $setting->company_phone = $request->company_phone;
        $setting->company_logo = $request->company_logo;
        $setting->company_city = $request->company_city;
        $setting->company_country = $request->company_country;
        $setting->company_address = $request->company_address;
        $setting->company_postal_code = $request->company_postal_code;
        $setting->update();
        return response->json([
            "message"=>"Company details updated sucessfully","status"=>200,
        ]);

    }
}
