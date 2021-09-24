<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->string("name");
            $table->string("email")->unique()->nullable();;
            $table->string("phone")->unique();
            $table->string("address");
            $table->string("city");
            $table->string("shop_name")->nullable();
            $table->string("photo")->nullable();
            $table->string("bank_name")->nullable();
            $table->string("account_holder")->nullable();
            $table->string("account_number")->nullable();
            $table->string("bank_branch")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customers');
    }
}
