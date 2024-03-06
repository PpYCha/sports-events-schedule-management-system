<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SportEvent extends Model
{
    use HasFactory;
    protected $table = 'sportevents';
    protected $primaryKey = 'sportEventId';
    protected $fillable = [
        'sportEventId',
        'sportEvent',
        'description',
        'sportId',
        'venueId',
        'start_datetime',
        'end_datetime',
    ];

    public function sport()
    {
        return $this->belongsTo(Sport::class);
    }
    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }

}
