<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    use HasFactory;
    protected $table = 'units';
    protected $primaryKey = 'unitId';
    protected $fillable = [
        'unitId',
        'unitName',
        'unitMembers',
    ];

    public function teams()
    {
        return $this->hasMany(Team::class);
    }
}
