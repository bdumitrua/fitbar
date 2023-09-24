<?php

namespace App\Helpers;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Storage;

class FileHelper
{
    public static function saveImageFromUrl($url, $folder)
    {
        $client = new Client();
        $response = $client->get($url);
        $contentType = $response->getHeader('Content-Type');
        $ext = '.jpg';
        $fileName = md5($url) . $ext;

        // сохранение изображения в публичной директории 'images'
        Storage::disk('public')->put('images/' . $folder . '/' . $fileName, $response->getBody());

        // возвращает путь до сохраненного файла
        return '/images/' . $fileName;
    }

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
