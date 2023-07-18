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
    protected $description = 'Create test database from .env + _test';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $databaseName = config('database.connections.mysql.database') . '_test';
        $charset = config('database.connections.mysql.charset', 'utf8mb4');
        $collation = config('database.connections.mysql.collation', 'utf8mb4_unicode_ci');

        config(["database.connections.mysql.database" => null]);

        $query = "CREATE DATABASE IF NOT EXISTS $databaseName CHARACTER SET $charset COLLATE $collation;";

        DB::statement($query);

        config(["database.connections.mysql.database" => $databaseName]);

        $this->info("Database " . $databaseName . " was created successful!");
    }
}
