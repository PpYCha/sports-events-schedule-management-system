<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SportEvent extends Model
{
    use HasFactory;
    protected $table = 'sportevents';
    protected $fillable = [
        'sportEventId',
        'sportEvent',
        'description',
        'sport',

    ];

    protected $primaryKey = 'sportEventId';
}
