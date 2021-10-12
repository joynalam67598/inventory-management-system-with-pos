<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->integer("cat_id");
            $table->integer("sup_id");
            $table->string("product_name");
            $table->string("product_code")->unique();
            $table->string("product_garage");
            $table->string("product_route");
            $table->string("product_image");
            $table->string("buy_date");
            $table->string("expire_date");
            $table->string("buying_price");
            $table->string("selling_price");

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
        Schema::dropIfExists('products');
    }
}
