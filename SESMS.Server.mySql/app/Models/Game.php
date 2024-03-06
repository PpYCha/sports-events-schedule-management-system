<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;
    protected $table = 'matches';
    protected $primaryKey = 'matchId';
    protected $fillable = [
        'matchId',
        'sportEventId',
        'venueId',
        'sportEventId',
        'matchDate',
    ];

    public function score()
    {
        return $this->hasMany(Score::class);
    }
}
