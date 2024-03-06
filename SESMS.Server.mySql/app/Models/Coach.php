<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coach extends Model
{
    use HasFactory;
    protected $table = 'coaches';
    protected $primaryKey = 'coachId';
    protected $fillable = [
        'coachId',
        'coachName',
    ];

    public function teams()
    {
        return $this->hasMany(Team::class);
    }
}
