<?php


class memo extends CI_Controller
{
    public function index() {
        return $this->load->view('index');
    }

    public function show($num) {

        $data = array(
            'id' => $num,
            'title' => 'My Title',
            'heading' => 'My Heading',
            'message' => 'My Message'
        );

        return $this->load->view('memo/show', $data);
    }
}