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
}
