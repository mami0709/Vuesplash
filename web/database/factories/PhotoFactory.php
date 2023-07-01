<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Photo;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PhotoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Photo::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'id' => Str::random(12),
            'user_id' => User::factory(),  // ユーザーファクトリを利用
            'filename' => Str::random(12) . '.jpg',
            'created_at' => $this->faker->dateTime(),
            'updated_at' => $this->faker->dateTime(),
        ];
    }
    public function configure()
    {
        return $this->afterCreating(function (Photo $photo) {
            $photo->comments()->saveMany(Comment::factory()->count(3)->make());
        });
    }
}
