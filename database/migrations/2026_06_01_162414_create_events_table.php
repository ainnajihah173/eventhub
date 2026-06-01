<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description');
            $table->string('location');
            $table->dateTime('start_date_time');
            $table->dateTime('end_date_time');
            $table->decimal('price', 10, 2);
            $table->integer('available_slots');
            $table->string('thumbnail')->nullable();
            $table->enum('status', ['pending', 'published', 'rejected'])->default('pending'); // pending, published, rejected
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
