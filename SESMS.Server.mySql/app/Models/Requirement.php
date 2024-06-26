<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requirement extends Model
{
    use HasFactory;
    protected $table = 'requirements';
    protected $primaryKey = 'requirementId';
    protected $fillable = [
        'requirementId',
        'athleteId',
        'psa',
        'medicalRecords',
    ];

    public function athlete()
    {
        return $this->belongsTo(Athlete::class);
    }

}