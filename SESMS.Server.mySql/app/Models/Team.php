<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;
    protected $table = 'teams';
    protected $primaryKey = 'teamId';
    protected $fillable = [
        'teamId',
        'teamName',
        'unitId',
        'coachId',
    ];

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function coach()
    {
        return $this->belongsTo(Coach::class);
    }
    public function sport()
    {
        return $this->belongsTo(Sport::class);
    }

    public function score()
    {
        return $this->hasMany(Score::class);
    }

    public function athlete()
    {
        return $this->hasMany(Athlete::class);
    }

}