<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Usuarios extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'usuario';
    protected $primaryKey = 'id_usuario';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'correo',
        'contrasena',
        'id_rol',
        'id_departamento',
        'id_estado_usuario'
    ];

    protected $hidden = [
        'contrasena'
    ];

    public function departamento()
    {
        return $this->belongsTo(Departamentos::class, 'id_departamento');
    }

    public function rol()
    {
        return $this->belongsTo(Roles::class, 'id_rol');
    }
}