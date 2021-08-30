<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $currencies = config('enums.currencies');

        Schema::create('settings', function (Blueprint $table) use ($currencies) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->unsignedDecimal('income')->default('0.00');;
            $table->unsignedDecimal('savings')->nullable();
            $table->enum('currency', $currencies)->default($currencies[0]);
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
        Schema::dropIfExists('settings');
    }
}
