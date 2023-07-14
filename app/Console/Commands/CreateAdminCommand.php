<?php

namespace App\Console\Commands;

use App\Models\RoleUser;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateAdminCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new admin user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $masterPassword = $this->secret('Enter master password');

        if ($masterPassword != '12341234') {
            $this->error('Master password is incorrect.');
            return;
        }

        $user = User::create([
            'name' => $this->ask('Name'),
            'email' => $this->ask('Email'),
            'password' => Hash::make($this->secret('Password'))
        ]);

        for ($role_id = 1; $role_id <= 5; $role_id++) {
            RoleUser::create([
                'user_id' => $user->id,
                'role_id' => $role_id
            ]);
        }

        $this->info('Admin user created successfully.');
    }
}
