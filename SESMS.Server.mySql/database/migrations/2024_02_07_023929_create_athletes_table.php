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
        Schema::create('athletes', function (Blueprint $table) {
            $table->id('athleteId');
            $table->foreignId('teamId')->unsigned()->nullable()->constrained('teams', 'teamId')->onDelete('cascade');
            $table->foreignId('sportId')->unsigned()->nullable()->constrained('sports', 'sportId')->onDelete('cascade');
            $table->string('idPictureUrl')->nullable();
            $table->string('surName')->nullable();
            $table->string('firstName')->nullable();
            $table->string('middleName')->nullable();
            $table->string('membershipCategory')->nullable();
            $table->date('dateOfBirth')->nullable();
            $table->string('placeOfBirth')->nullable();
            // address
            $table->string('houseNo')->nullable();
            $table->string('street')->nullable();
            $table->string('brgy')->nullable();
            $table->string('municipality')->nullable();
            $table->string('province')->nullable();
            //
            $table->string('sex')->nullable();
            $table->string('civilStatus')->nullable();
            $table->string('citizenship')->nullable();
            $table->string('contactNumber')->nullable();
            $table->string('height')->nullable();
            $table->string('weight')->nullable();
            $table->string('bloodType')->nullable();
            $table->string('motherName')->nullable();
            $table->string('motherOccupation')->nullable();
            $table->string('fatherName')->nullable();
            $table->string('fatherOccupation')->nullable();
            $table->string('elmentarySchool')->nullable();
            $table->string('elmentarySchoolYearGraduated')->nullable();
            $table->string('highSchool')->nullable();
            $table->string('HighSchoolYearGraduated')->nullable();
            $table->string('name1')->nullable();
            $table->string('address1')->nullable();
            $table->string('contactNumber1')->nullable();
            $table->string('name2')->nullable();
            $table->string('address2')->nullable();
            $table->string('contactNumber2')->nullable();
            $table->string('name3')->nullable();
            $table->string('address3')->nullable();
            $table->string('contactNumber3')->nullable();
            $table->boolean('isQualified')->nullable();
            //
            $table->string('year')->nullable();
            $table->string('course')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('athletes');
    }
};