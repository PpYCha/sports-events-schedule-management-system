<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Athlete extends Model
{
    use HasFactory;
    protected $table = 'athletes';
    protected $primaryKey = 'athleteId';
    protected $fillable = [
        'athleteId',
        'teamId',
        'idPictureUrl',
        'surName',
        'firstName',
        'middleName',
        'membershipCategory',
        'dateOfBirth',
        'placeOfBirth',
        // address
        'houseNo',
        'street',
        'brgy',
        'municipality',
        'province',
        //
        'sex',
        'civilStatus',
        'citizenship',
        'contactNumber',
        'height',
        'weight',
        'bloodType',
        'motherName',
        'motherOccupation',
        'fatherName',
        'fatherOccupation',
        'elmentarySchool',
        'elmentarySchoolYearGraduated',
        'highSchool',
        'HighSchoolYearGraduated',
        'name1',
        'address1',
        'contactNumber1',
        'name2',
        'address2',
        'contactNumber2',
        'name3',
        'address3',
        'contactNumber3',
        'isQualified',
        //
        'year',
        'course',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
    public function sport()
    {
        return $this->belongsTo(Sport::class);
    }

    public function requirement()
    {
        return $this->hasMany(Requirement::class);
    }
}