<?php

namespace Tests\Feature;

use Tests\TestCase;

class HomeControllerTest extends TestCase
{
    public function test_home_page_can_be_accessible()
    {
        $response = $this->get(route('home'));

        $response->assertStatus(200);
    }
}
