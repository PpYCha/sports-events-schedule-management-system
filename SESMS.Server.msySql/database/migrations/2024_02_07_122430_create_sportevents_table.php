<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sportevents', function (Blueprint $table) {
            $table->id('sportEventId');
            $table->string('sportEvent')->nullable();
            $table->string('description')->nullable();
            $table->string('sport')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sportevents');
    }
};
