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
        Schema::create('games', function (Blueprint $table) {
            $table->id('gameId');
            $table->foreignId('sportEventId')->nullable()->constrained('sportevents', 'sportEventId')->onDelete('cascade');
            $table->foreignId('venueId')->nullable()->constrained('venues', 'venueId')->onDelete('cascade');
            $table->date('gameDate');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};