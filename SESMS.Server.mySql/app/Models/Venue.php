<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venue extends Model
{
    use HasFactory;
    protected $table = 'venues';
    protected $primaryKey = 'venueId';
    protected $fillable = [
        'venueId',
        'venueName',
        'venueImageUrl',
        'venueLocation',
        'indoorOrOutdoor',

    ];

    public function sportEvents()
    {
        return $this->hasMany(SportsEvent::class);
    }

}
