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
        Schema::create('tests', function (Blueprint $table) {
            $table->id('id');
            $table->text('Deskripsi');
            $table->time('Waktu');
            $table->dateTime('Tanggal_Ujian');
            $table->string('Filename')->nullable();
            $table->enum('Tipe_ujian', ['Acak', 'Tidak Acak']);
            $table->timestamps();
            $table->unsignedBigInteger('ID_Matpel');

            $table->foreign('ID_Matpel')->references('id')->on('subjects')->onDelete('cascade');

            $table->index('id','id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('komentar_ujian');
    }
};
