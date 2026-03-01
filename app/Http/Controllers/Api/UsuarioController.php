<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Iluminate\Support\Facades\Hash;
use App\Models\Usuarios;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Usuarios::with(['rol', 'departamento'])->orderByDesc('id')
        ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $data = $request->validate([
            'id_usuario' => 'required|unique:usuario,id_usuario',
            'nombre' => 'required|string',
            'correo' => 'required|email|unique:correo',
            'contrasena' => 'required|string|min:3',
            'id_rol' => 'required|exists:roles,id_rol',
            'id_departamento' => 'required|exists:departamento,id_departamento',
        ]);
        $data['contrasena'] = Hash::make($data['contrasena']);
        Usuarios::create($data);

        $user = Usuarios::create($data);
        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Usuarios $usuario)
    {
        //
        return $usuario->load(['rol', 'departamento']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Usuarios $usuario)
    {
        //
        $data = $request->validate([
            'id_usuario' => 'sometimes|required|exists:usuario,id_usuario',
            'nombre' => 'sometimes|required|string',
            'correo' => 'sometimes|required|email|unique:correo,' . $usuario->id,
            'contrasena' => 'nullable|string|min:3',
            'id_rol' => 'required|exists:roles,id_rol',
        ]);

        if (isset($data['contrasena']) && $data['contrasena'] !== null) {
            $data['contrasena'] = Hash::make($data['contrasena']);
        } else {
            unset($data['contrasena']);
        }

        $usuario->update($data);
        return $usuario->fresh()->load(['rol', 'departamento']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $usuario->delete();
        return response()->noContent();
    }
}
