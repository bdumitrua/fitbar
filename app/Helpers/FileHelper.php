<?php

namespace App\Helpers;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Storage;

class FileHelper
{
    public static function saveImage($file, $folder)
    {
        // Генерируем уникальное имя для файла
        $ext = '.' . $file->getClientOriginalExtension(); // Получаем расширение файла
        $fileName = md5(uniqid()) . $ext;

        // Сохраняем файл в публичной директории 'images'
        $file->storeAs('public/images/' . $folder, $fileName);

        // Возвращаем путь до сохраненного файла
        return '/images/' . $folder . '/' . $fileName;
    }
}
