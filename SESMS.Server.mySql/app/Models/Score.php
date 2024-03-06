<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory;
    protected $table = 'scores';
    protected $primaryKey = 'scoreId';
    protected $fillable = [
        'scoreId',
        'gameId',
        'teamId',
        'score',
    ];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }
    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
