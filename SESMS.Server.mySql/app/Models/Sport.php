<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sport extends Model
{
    use HasFactory;
    protected $table = 'sports';
    protected $primaryKey = 'sportId';
    protected $fillable = [
        'sportId',
        'sportsName',
        'sportsImageUrl',
        'individualOrTeam',
        'menOrFemale',
    ];

    public function sportEvents()
    {
        return $this->hasMany(SportsEvent::class);
    }
    public function athlete()
    {
        return $this->hasMany(Athlete::class);
    }
    public function team()
    {
        return $this->hasMany(Team::class);
    }

}