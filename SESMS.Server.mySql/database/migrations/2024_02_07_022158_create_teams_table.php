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
        Schema::create('teams', function (Blueprint $table) {
            $table->id('teamId');
            $table->string('teamName');
            $table->foreignId('unitId')->nullable()->constrained('units', 'unitId')->onDelete('cascade');
            $table->foreignId('coachId')->nullable()->constrained('coaches', 'coachId')->onDelete('cascade');
            $table->foreignId('sportId')->nullable()->constrained('sports', 'sportId')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};