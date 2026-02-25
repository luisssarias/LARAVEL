<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Roles extends Model
{
    protected $fillable = ['nombre_rol'];

    public function usuarios()
    {
        return $this->hasMany(Usuarios::class);
    }
}
