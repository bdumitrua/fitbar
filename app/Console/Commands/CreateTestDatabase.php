<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class CreateTestDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:create-test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create database for tests from .env.testing';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Load .env.testing configuration
        $dotenv = \Dotenv\Dotenv::createImmutable(base_path(), '.env.testing');
        $dotenv->load();

        $databaseName = env('DB_DATABASE');
        $charset = config('database.connections.mysql.charset', 'utf8mb4');
        $collation = config('database.connections.mysql.collation', 'utf8mb4_unicode_ci');

        config([
            'database.connections.mysql.database' => null,
        ]);

        DB::statement("DROP DATABASE IF EXISTS $databaseName");
        DB::statement("CREATE DATABASE $databaseName CHARACTER SET $charset COLLATE $collation");

        config([
            'database.connections.mysql.database' => $databaseName,
        ]);

        $this->info("Database {$databaseName} created successfully");
    }
}
