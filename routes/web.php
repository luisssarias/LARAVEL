<?php

use Illuminate\Support\Facades\Route;

Route::get('/login-form', function () {
    return view('testLogin');
});
