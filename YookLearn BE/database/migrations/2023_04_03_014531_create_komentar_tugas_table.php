<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('assigment_comments', function (Blueprint $table) {
            $table->id('id');
            $table->text('komentar');
            // $table->dateTime('tanggal_upload');
            $table->timestamps();
            $table->string('id_pengirim');
            $table->string('id_kumpul');

            $table->foreign('id_pengirim')->references('id')->on('accounts')->onDelete('cascade');
            $table->foreign('id_kumpul')->references('id')->on('student_assigments')->onDelete('cascade');

            $table->index('id','id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('komentar_tugas');
    }
};
